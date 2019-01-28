const config = require('./config');
const interpret = require('./services/interpreter'); 

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    socket.close();
});

socket.on('message', (msg, info) => {
    console.log(`Server got: ${msg} from ${info.address}:${info.port}`);
    const packet = JSON.parse(msg);
    
    interpret(packet);
});

socket.on('listening', () => {
    const address = socket.address();
    console.log(`Server listening ${address.address}:${address.port}`);
});

socket.bind(config.PORT, config.HOST);