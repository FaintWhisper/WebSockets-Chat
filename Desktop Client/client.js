const WebSocket = require('ws');
const readline = require('readline');

const ws = new WebSocket('ws://192.168.1.190:8080');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ws.on('message', data => {
    const message = JSON.parse(data);

    if (!message["hidden"])
        console.log(message["content"]);

    if (message["prompt"])
        rl.question(">> ", input => {
            ws.send(input);
        });
});