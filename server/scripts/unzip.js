const fs = require('fs');
const path = require('path');
// const unzip = require('unzip');
const unzip = require('./adm-zip');

// const extractZip = (file, targetPath, onClose) => {
// 	fs.createReadStream(file)
// 	  .pipe(unzip.Extract({ path: targetPath }))
// 	  .on('close', onClose);
// };
// return entry
const extractZip = (file, targetPath, entry, onClose) => {
	try{
		const zip = new unzip(file);
		const entries = zip.getEntries();
		let entry_type = -1;
		for(let e of entries) {
			if(/\/index\.html$/.test(e.entryName)){
				entry = e.entryName.split('/').shift();
				entry_type = 1;
				break;
			} else if(e.entryName == 'index.html') {
				entry_type = 0;
				break;
			}
		}
		if(entry_type !== -1) {
			zip.extractAllTo(path.resolve(targetPath), true);
			return entry_type == 1 ? entry : '';
		} else {
			return null;
		}
	} catch (e) {
		console.error(e);
		return null;
	}
};

module.exports = {
	extractZip: extractZip
};