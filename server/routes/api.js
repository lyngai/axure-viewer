const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const Router = require('koa-router');
const db = require('../scripts/db');
const unzip = require('../scripts/unzip');

const apiRouter = new Router({
	prefix: '/api',
});

apiRouter
.get('/project', async (ctx, next) => {
	// ctx.header['content-type'] = 'application/json';
	ctx.body = {
		data: db.read(),
	};
	return next();
})
.post('/project', async (ctx, next) => {
	let file = ctx.request.files.file;
	if(file) {
		let ext = file.name.split('.').pop();
		if(ext !== 'zip') {
			ctx.status = 400;
			return next();
		}
		let reader = fs.createReadStream(file.path);
		let writer = fs.createWriteStream(path.resolve(`projects/${file.name}`));
		let hash = crypto.createHash('md5');
		let ret = await new Promise((resolve, reject) => {
			reader.on('data', data => {
				writer.write(data);
				hash.update(data);
			});
			reader.on('end', () => {
				writer.end();
				const md5 = hash.digest('hex');
				const exists = fs.existsSync(path.resolve(`projects/${md5}.${ext}`));
				fs.renameSync(path.resolve(`projects/${file.name}`), path.resolve(`projects/${md5}.${ext}`));
				fs.unlink(file.path, ()=>{});
				console.log('md5: ',md5);
				if(!exists) {
					// 解压并检测文件
					const name = file.name.split('.').shift();
					const ret = unzip.extractZip(
						path.resolve(`projects/${md5}.${ext}`), //zipfile
						`./projects/${md5}`, //targetPath
						name, //entry
						(onclose) => {
							resolve({code: 0, msg: md5});
						}
					);
					if(ret !== null) { // ret不为null
						// 添加记录
						db.append({
							id: '',
							hash: md5,
							name: name,
							url: `/projects/${md5}${ret == '' ? '' : '/'+ret}`,
							path: `projects/${md5}.${ext}`,
							uploaded_at: '',
						});
						resolve({code: 0, msg: md5});
					} else {
						fs.unlink(path.resolve(`projects/${md5}.${ext}`), ()=>{});
						reject('未在压缩包内找到项目入口');
					}
				} else {
					reject('文件已存在');
				}
			});
			reader.on('error', (err) => {
				reject(err);
			});
		}).catch((err) => {
			ctx.status = 400;
			ctx.body = {code: 1, msg: err};
		});
		ctx.body = ctx.body ? ctx.body : ret;
	} else {
		ctx.status = 400;
	}
	return next();
})
.del('/project/:hashid', async (ctx, next) => {
	const id = ctx.params.hashid;
	if(id) {
		const record = db.find(id);
		if(record) {
			await new Promise((resolve, reject) => {
				fs.unlink(path.resolve(record.path), (err) => {
					if(err) reject(err);
					db.remove(id);
					resolve();
				});
			}).then(() => {
				return new Promise((resolve, reject) => {
					// console.log(path.resolve(`.${record.url}`));
					// fsExtra.emptyDirSync(path.resolve(`.${record.url}`));
					fs.rmdir(path.resolve(`.${record.url}`), (err) => {
						resolve();
					}); // 无需判断成功与否
				});
			}).then(() => {
				ctx.body = {code: 0, msg: '删除成功'};
			}).catch((err) => {
				console.error(err);
			});
		} else {
			ctx.status = 400;
			ctx.body = {code: 1, msg: '删除失败'};
		}
	} else {
		ctx.status = 400;
		ctx.body = {code: 1, msg: '删除失败'};
	}
	return next();
});

module.exports = {
	router: apiRouter.routes(),
	method: apiRouter.allowedMethods(),
};