'use strict';

/**
 * imports of packages/modules
 */
import * as HTTP from 'http';
import * as WebSocket from 'ws';

import App from './App';

const PORT = 8501;

const serverObj = new App();
const app = serverObj.app;

const server = HTTP.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        if (message === 'APP_OPEN') ws.send('ADV_RUN');
        if (message === 'ADV_CLOSED') ws.send('SCO_RUN');
        if (message === 'ADV_OPENED') setTimeout(() => {
            ws.send('CLOSE_IT');
        }, 10000);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

server.listen(PORT, () => {
	console.log("Express server listening on port " + PORT);
});
