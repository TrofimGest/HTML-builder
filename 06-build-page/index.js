const path = require('path');
const fs = require('fs');
fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true }, () => {
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),{ recursive: true }, () => {
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'),{ recursive: true }, () => {
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), { recursive: true }, () => {
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets','svg'), { recursive: true }, () => {
});
const stylePath = path.join(__dirname, 'styles');
fs.readdir(stylePath, {withFileTypes: true}, function(err, items) {
  for (let i=0; i<items.length; i++) {
    if (path.extname(`${items[i].name}`) == '.css'){
      fs.createReadStream(path.join(stylePath, `${items[i].name}`)).pipe(fs.createWriteStream(path.join(__dirname, 'project-dist','style.css'),{ 'flags': 'a'}));
    }
  }
});
let dirs = ['fonts','img','svg'];
for (let z=0; z<dirs.length; z++) {
  fs.readdir((path.join(__dirname, 'assets', `${dirs[z]}`)),{withFileTypes: true}, function(err, items) {
    for (let j=0; j<items.length; j++) {
      fs.createReadStream((path.join(__dirname, 'assets', `${dirs[z]}`, `${items[j].name}`))).pipe(fs.createWriteStream((path.join(__dirname,'project-dist', 'assets', `${dirs[z]}`, `${items[j].name}`))));
    }
  });
}
let tags = [];
let rep = '';
fs.createReadStream(path.join(__dirname, 'template.html')).pipe(fs.createWriteStream(path.join(__dirname, 'project-dist','index.html')));

fs.readFile(path.join(__dirname, 'template.html'),'utf-8', function (err,template){
  if (err) {
    return console.log(err);
  }
  let reg = /{{.*}}/g;
  let temp = template;
  tags = template.match(reg);
  for (let i=0; i<tags.length; i++){
    let tag = tags[i].replace(/[^a-z]/gi, '');
    fs.readFile(path.join(__dirname, 'components',`${tag}.html`), 'utf8', function(err, text){
      if (err) {
        return console.error(err); 
      }
      rep = temp.replace(tags[i], text);
      temp = rep;
      fs.writeFile((path.join(__dirname, 'project-dist','index.html')), rep, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  }
});
