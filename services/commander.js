const {exec} = require('child_process');
//const {sep} = require('path');
const sep = '\\';

const cmd = `bin${sep}commander.exe`;

exports.exec = (args) => {
    exec(`${cmd} ${args}`);
};




