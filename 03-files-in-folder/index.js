const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'secret-folder');
fs.readdir(filePath, {withFileTypes: true}, function(err, items) {
  for (let i=0; i<items.length; i++) {
    console.log(items[i]);
    let statPath = path.join(filePath, items[i].name);
    if (items[i].isFile()){
      fs.stat(statPath, function(err, stats) {
        let extension = path.extname(`${statPath}`);
        let fileName = path.basename(statPath,extension);
        extension = extension.replace('.', '');
        console.log(fileName,' ', extension,' ', stats.size,'bytes');
      });
    } else {
      console.log(items[i].name, 'Not a file');
    }
  }
});
