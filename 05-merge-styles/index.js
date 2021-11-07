const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'styles');
fs.readdir(filePath, {withFileTypes: true}, function(err, items) {
  for (let i=0; i<items.length; i++) {
    if (path.extname(`${items[i].name}`) == '.css'){
      fs.createReadStream(path.join(filePath, `${items[i].name}`)).pipe(fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'),{ 'flags': 'a'}));
    }
  }
});