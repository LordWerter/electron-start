/**
 * imports packages
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';

import { App } from './epics';

// #if process.env.IXR
// @ts-ignore
import { sst as theme } from '../../ui__themes/src/ixr/apps';
// #endif
// #if process.env.PEREK
// @ts-ignore
import { sst as theme } from '../../ui__themes/src/perekrestok/apps';
/// #endif

/**
 * imports Service Worker
 */
// import registerServiceWorker from './registerServiceWorker';

window.addEventListener('load', () => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>,
        document.getElementById('root'),
    );
});

// registerServiceWorker();
