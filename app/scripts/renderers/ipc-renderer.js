'use strict';

const electron = require('electron');
const url = require('url');

{
    const ipcRenderer = electron.ipcRenderer;

    function modifyDocument() {
        // Do something, if we need.
    }

    function modifyStyle() {
        document.body.querySelector('.metamenu').style.display = 'none';
    }

    function modifyEvent() {
        document.body.addEventListener('click', (event) => {
            if (event.target.closest('[href]')) {
                const parsedUrl = url.parse(event.target.closest('[href]').getAttribute('href'));
                if (parsedUrl.protocol === 'ocs:' || parsedUrl.protocol === 'ocss:') {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('ocs-url', parsedUrl.href);
                }
                else if (parsedUrl.hostname === 'dl.opendesktop.org' && parsedUrl.pathname) {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('ocs-url', `ocs://download?url=${encodeURIComponent(parsedUrl.href)}&type=downloads`);
                }
                else if (parsedUrl.hostname && parsedUrl.hostname !== url.parse(document.URL).hostname) {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('external-url', parsedUrl.href);
                }
            }
        }, false);
    }

    ipcRenderer.on('dom-modify', () => {
        modifyDocument();
        modifyStyle();
        modifyEvent();
    });
}
