const process = require('process');
const readline= require('readline');
const fs = require('fs');
const path = require('path');
const fileWay = path.join(__dirname, 'write.txt');
const {stdin: input, stdout: output} = require('process');
const inpOut = readline.createInterface({input, output});
const writeStream = fs.createWriteStream(fileWay);

console.log('Type sentense and it will be saved in write.txt');

process.on('exit', () => {
  console.log('Exiting. Thanks for using.');
});
inpOut.on('line',(text) => {
  if (text == 'exit'){
    process.exit(0);
  }
  writeStream.write(text + '\n');
  console.log(`your text: ${text}`);
  
});