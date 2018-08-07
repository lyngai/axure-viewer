const fs = require('fs');
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
  ctx.body = {
    data: db.read(),
  };
})
.post('/project', async (ctx, next) => {
  let file = ctx.request.files.file;
  if(file) {
    let ext = file.name.split('.').pop();
    if(ext !== 'zip') {
      ctx.status = 400;
      ctx.body = {code: 1, msg: '不支持的文件类型'};
      fs.unlink(file.path, ()=>{});
      return;
    }
    const movePath = path.resolve(`projects/${file.name}`);
    let hash = crypto.createHash('md5');
    let reader = fs.createReadStream(file.path);
    let writer = fs.createWriteStream(movePath);
    let result = await new Promise((resolve, reject) => {
      reader.on('data', data => {
        writer.write(data);
        hash.update(data);
      });
      reader.on('end', () => {
        /* 结束写入，删除临时文件 */
        writer.end();
        fs.unlink(file.path, ()=>{});
        /* 以md5重命名 */
        const md5 = hash.digest('hex');
        const relativeSavePath = `projects/${md5}.${ext}`;
        const savePath = path.resolve(relativeSavePath);
        const exists = fs.existsSync(savePath);
        console.log('uploaded md5: ',md5);
        if(!exists) {
          fs.renameSync(movePath, savePath);
          const oringinalName = file.name.split('.').shift(); 
          /* 解压并检测文件: zipPath, extractPath, entry, onClose */
          const realEntry = unzip.extractZip(savePath, `./projects/${md5}`, oringinalName, ()=>{});
          if(realEntry !== null) { // ret不为null
            // 添加记录
            db.append({
              id: '',
              hash: md5,
              name: oringinalName,
              url: `/projects/${md5}${(realEntry=='')?'':'/'+realEntry}`,
              path: relativeSavePath,
              uploaded_at: '',
            });
            resolve({code: 0, msg: md5});
          } else {
            fs.unlink(savePath, ()=>{});
            reject('未在压缩包内找到项目入口');
          }
        } else {
          fs.unlink(movePath, ()=>{});
          reject('文件已存在');
        }
      });
      reader.on('error', (err) => { reject(err); });
    }).catch((err) => {
      ctx.status = 400;
      ctx.body = {code: 1, msg: err};
    });
    ctx.body = ctx.body ? ctx.body : result;
  } else {
    ctx.status = 400;
  }
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
      }).then(() => new Promise((resolve, reject) => {
        // console.log(path.resolve(`.${record.url}`));
        // 无需判断成功与否
        fs.rmdir(path.resolve(`.${record.url}`), (err) => {resolve();}); 
      })).then(() => {
        ctx.body = {code: 0, msg: '删除成功'};
      }).catch((err) => {
        console.error(err);
        ctx.status = 400;
        ctx.body = {code: 1, msg: err};
      });
    } else {
      ctx.status = 400;
      ctx.body = {code: 1, msg: '删除失败'};
    }
  } else {
    ctx.status = 400;
    ctx.body = {code: 1, msg: '项目不存在'};
  }
});

module.exports = {
  router: apiRouter.routes(),
  method: apiRouter.allowedMethods(),
};