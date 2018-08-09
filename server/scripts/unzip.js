const path = require('path');
const fs = require('fs');
const unzip = require('./unzip/unzip');

const extractZip = async (file, targetPath, entry) => {//, onClose
	let entry_type = -1;
	await new Promise((resolve, reject) => {
		let handleError = (err) => { reject(err); };
		// 首先检测入口
		fs.createReadStream(file)
		  .on('error', handleError)
		  .pipe(unzip.Parse())
		  .on('error', handleError)
		  .on('entry', e => {
		  	if(entry_type == -1) {
			  	var entryName = e.path;
			  	if(/\/index\.html$/.test(entryName)){
					entry = entryName.split('/').shift();
					entry_type = 1;
				} else if(entryName == 'index.html') {
					entry_type = 0;
				}
		  	}
		  	e.autodrain();
		  })
		  .on('close', () => {
		  	if(entry_type !== -1) {
		  		resolve();
		  	}
		  	reject();
		  });
	})
	.then(() => {
		// 解压文件
		fs.createReadStream(file)
		  .pipe(unzip.Extract({ path: path.resolve(targetPath) }))
		  .on('error', (err) => { Promise.reject(err); })
		  .on('close', () => {
		  	Promise.resolve();
		  });
	})
	.catch((err) => {
		console.error(err);
	});

	if(entry_type !== -1) {
		return entry_type == 1 ? entry : '';
	} else {
		return null;
	}
};
// const unzip = require('./adm-zip');

// // return entry
// const extractZip = (file, targetPath, entry, onClose) => {
// 	try{
// 		const zip = new unzip(file);
// 		const entries = zip.getEntries();
// 		let entry_type = -1;
// 		for(let e of entries) {
// 			if(/\/index\.html$/.test(e.entryName)){
// 				entry = e.entryName.split('/').shift();
// 				entry_type = 1;
// 				break;
// 			} else if(e.entryName == 'index.html') {
// 				entry_type = 0;
// 				break;
// 			}
// 		}
// 		if(entry_type !== -1) {
// 			zip.extractAllTo(path.resolve(targetPath), true);
// 			return entry_type == 1 ? entry : '';
// 		} else {
// 			return null;
// 		}
// 	} catch (e) {
// 		console.error(e);
// 		return null;
// 	}
// };


module.exports = {
	extractZip: extractZip
};