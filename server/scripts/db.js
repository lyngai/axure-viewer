const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dateFormat = require('dateformat');
const dataFile = path.resolve('./data/data.json');

const readData = () => {
	return fs.readFileSync(dataFile);
};

const writeData = (str) => {
	fs.writeFileSync(dataFile, str, {encoding: 'utf8'});
};

const createTimeHash = (str) => {
	let hash = crypto.createHash('md5');
	return hash.update(`${str}:${Date.now()}`).digest('hex');
};

const read = () => {
	let data = JSON.parse(readData());
	return data.projects;
};

const find = (id) => {
	let data = JSON.parse(readData());
	for(let obj of data.projects) {
		if(obj.id === id){
			return obj;
		}
	}
	return null;
};

const append = (obj) => {
	let data = JSON.parse(readData());
	if(obj instanceof Array) {
		let arr = obj.map((acc, o) => {
			o.id = createTimeHash(o.hash);
			o.uploaded_at = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
			acc.push(o);
		}, [])
		data.projects.push(...arr);
	} else {
		obj.id = createTimeHash(obj.hash);
		obj.uploaded_at = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
		data.projects.push(obj);
	}
	writeData(JSON.stringify(data, null, 1));
};

const remove = (id) => {
	let data = JSON.parse(readData());
	const index = data.projects.map((obj) => obj.id).indexOf(id);
	if(index !== -1) {
		data.projects.splice(index, 1);
		writeData(JSON.stringify(data, null, 1));
		return 0; // OK
	}
	return 1; // ERROR
};

const edit = (id, newData = {}) => {
	let data = JSON.parse(readData());
	const index = data.projects.map((obj) => obj.id).indexOf(id);
	if(index !== -1) {
		let filteredData = {};
		for(let key in newData) {
			if(data.projects[index].hasOwnProperty(key) && key !== 'id') {
				filteredData[key] = newData[key];
			}
		}
		Object.assign(data.projects[index], filteredData);
		writeData(JSON.stringify(data, null, 1));
		return 0; // OK
	}
	return 1; // ERROR
};

module.exports = {
	read,
	find,
	edit,
	append,
	remove,
};