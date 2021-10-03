/**
 * imports packages
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPCKey } from '../../app__manager/src/common/Constants';
import { IpcRenderer } from 'electron';

const ipcRenderer: IpcRenderer = require('electron').ipcRenderer;

window.addEventListener('load', () => {
    ReactDOM.render(
        <div>
            Hello from app#2
            <button
                onClick={() => {
                    ipcRenderer.invoke(IPCKey.showSCOWindow);
                }}
            ></button>
        </div>,
        document.getElementById('root'),
    );
});

// registerServiceWorker();
