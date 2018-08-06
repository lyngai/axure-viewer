const fs = require('fs');
const path = require('path');
// const unzip = require('unzip');
const unzip = require('adm-zip');

// const extractZip = (file, targetPath, onClose) => {
// 	fs.createReadStream(file)
// 	  .pipe(unzip.Extract({ path: targetPath }))
// 	  .on('close', onClose);
// };

const extractZip = (file, targetPath, entry, onClose) => {
	const zip = new unzip(file);
	// const entries = zip.getEntries();
	// // console.dir(entries);
	// entries.forEach((entry) => {
	// 	console.log(entry.entryName);
	// });
	console.log(file, targetPath, entry);
	// zip.extractEntryTo(entry+'/', targetPath, false, false);
	zip.extractAllTo(path.resolve(targetPath), true);
};

module.exports = {
	extractZip: extractZip
};