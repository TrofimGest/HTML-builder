const path = require('path');
const fs = require('fs');
fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, () => {
  console.log('Directory created and copied successfully!');
});
fs.readdir((path.join(__dirname, 'files')),{withFileTypes: true}, function(err, items) {
  for (let i = items.length; i>0; i--) {
    console.log(items[i]);
    fs.createReadStream((path.join(__dirname, 'files', `${items[i].name}`))).pipe(fs.createWriteStream((path.join(__dirname, 'files-copy', `${items[i].name}`))));
  }
});
