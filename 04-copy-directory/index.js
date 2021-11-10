const path = require('path');
const fs = require('fs');
fs.access(path.join(__dirname, 'files-copy'), (err) =>{
  if (err){
    fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, () => {
      fs.readdir((path.join(__dirname, 'files')),{withFileTypes: true}, function(err, items) {
        for (let i = 0 ; i<items.length; i++) {
          fs.createReadStream((path.join(__dirname, 'files', items[i].name))).pipe(fs.createWriteStream((path.join(__dirname, 'files-copy', `${items[i].name}`))));
          console.log('Directory created and copied successfully!');
        }
      });
    });
  }
  else{
    fs.rmdir(path.join(__dirname, 'files-copy'),{ recursive: true }, () => {
      fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, () => {
        fs.readdir((path.join(__dirname, 'files')),{withFileTypes: true}, function(err, items) {
          for (let i = 0 ; i<items.length; i++) {
            fs.createReadStream((path.join(__dirname, 'files', items[i].name))).pipe(fs.createWriteStream((path.join(__dirname, 'files-copy', `${items[i].name}`))));
            console.log('Directory created and copied successfully!');
          }
        });
      });
    });
  }
});