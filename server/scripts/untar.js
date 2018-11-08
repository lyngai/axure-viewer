const path = require('path');
const tar = require('tar');
const fs = require('fs');

const extractTar = async (file, targetPath, entry) => {//, onClose
  let entry_type = -1;
  await new Promise((resolve, reject) => {
    let handleError = (err) => { reject(err); };
    // 首先检测入口
    tar.t({
      file: file,
      onentry: e => {
        if(entry_type == -1) {
          var entryName = e.path;
          if(/\/index\.html$/.test(entryName)){
            entry = entryName.split('/').shift();
            entry_type = 1;
          } else if(entryName == 'index.html') {
            entry_type = 0;
          }
        }
      }
    }, null, cb => {
      if(entry_type !== -1) {
        resolve();
      } else {
        reject();
      }
    });
  })
  .then(() => {
    const cwd = path.resolve(targetPath);
    fs.mkdir(cwd, { recursive: true }, function(err) {
      if(err) {
        Promise.reject(err);
        return;
      }
      // 解压文件
      tar.x({
        file: file,
        cwd: cwd
      }).then(() => Promise.resolve()
      ).catch(err => Promise.reject(err));
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

module.exports = {
  extractTar: extractTar
};