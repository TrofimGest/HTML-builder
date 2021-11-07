const fs = require('fs');
const path = require('path');
let way = (path.join(__dirname, 'text.txt'));
let stream = fs.createReadStream(way, 'utf-8');

let data = '';
stream.on('data', content => data += content);
stream.on('end', () => console.log(data));