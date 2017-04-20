'use strict';

const electron = require('electron');
const electronConfig = require('electron-config');
const childProcess = require('child_process');

const appConfig = require('../../configs/application.json');
const releaseMeta = require('../../../release.json');

import StatusManager from 'js/StatusManager.js';
import Root from '../components/Root.js';

{
    const remote = electron.remote;
    const shell = electron.shell;

    const statusManager = new StatusManager();
    const root = new Root(document.querySelector('[data-component="Root"]'));
    const browseWebview = root.mainArea.browsePage.element.querySelector('[data-webview="browse"]');

    let isStartup = true;

    document.title = appConfig.title;

    function setupComponent() {
        root.mainArea.changePage('browsePage');

        if (isStartup) {
            root.mainArea.showStartupPage();
        }
    }

    function setupWebView() {
        // Should webview display to load specific page
        const config = new electronConfig({name: 'application'});
        browseWebview.setAttribute('src', config.get('startPage'));
        browseWebview.setAttribute('preload', './scripts/renderers/ipc-renderer.js');
        browseWebview.setAttribute('autosize', 'on');
        browseWebview.setAttribute('allowpopups', 'false');

        browseWebview.addEventListener('did-start-loading', () => {
            console.log('did-start-loading');
            root.mainArea.browsePage.toolBar.showIndicator();
        });

        browseWebview.addEventListener('did-stop-loading', () => {
            console.log('did-stop-loading');
            root.mainArea.browsePage.toolBar.hideIndicator();
        });

        browseWebview.addEventListener('dom-ready', () => {
            console.log('dom-ready');
            browseWebview.send('dom-modify');

            if (isStartup) {
                isStartup = false;
                root.mainArea.hideStartupPage();
            }
        });

        browseWebview.addEventListener('ipc-message', (event) => {
            console.log(['ipc-message', event.channel, event.args]);
            if (event.channel === 'ocs-url') {
                _openOcsUrl(event.args[0]);
            }
            else if (event.channel === 'external-url') {
                shell.openExternal(event.args[0]);
            }
        });
    }

    function setupStatusManager() {
        statusManager.registerAction('check-update', (resolve, reject) => {
            console.log('Checking for update');
            fetch(releaseMeta.releasemeta)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Network response was not ok'));
            })
            .then((data) => {
                if (data.versioncode > releaseMeta.versioncode) {
                    console.log('Found newer version');
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });

        statusManager.registerView('check-update', (state) => {
            root.mainArea.upgradePage.update(state);
            root.mainArea.browsePage.toolBar.showUpgradeButton();
            root.mainArea.aboutPage.toolBar.showUpgradeButton();
            root.mainArea.upgradePage.toolBar.showUpgradeButton();
        });

        statusManager.registerAction('ocs-url', (resolve, reject, params) => {
            _openOcsUrl(params.ocsUrl);
        });

        statusManager.registerAction('menu', () => {
            root.toggleMenuArea();
        });

        statusManager.registerAction('start-page', (resolve, reject, params) => {
            const config = new electronConfig({name: 'application'});
            config.set('startPage', params.startPage);
            browseWebview.setAttribute('src', params.startPage);
        });

        statusManager.registerAction('browse-webview-back', () => {
            if (browseWebview.canGoBack()) {
                browseWebview.goBack();
            }
        });

        statusManager.registerAction('browse-webview-forward', () => {
            if (browseWebview.canGoForward()) {
                browseWebview.goForward();
            }
        });

        statusManager.registerAction('browse', () => {
            root.mainArea.changePage('browsePage');
        });

        statusManager.registerAction('about', () => {
            root.mainArea.changePage('aboutPage');
        });

        statusManager.registerAction('upgrade', () => {
            root.mainArea.changePage('upgradePage');
        });

        statusManager.dispatch('check-update');
    }

    function setupEvent() {
        root.element.addEventListener('click', (event) => {
            if (event.target.closest('button[data-dispatch]')) {
                event.preventDefault();
                event.stopPropagation();
                const targetElement = event.target.closest('button[data-dispatch]');
                const type = targetElement.getAttribute('data-dispatch');
                let params = {};
                if (targetElement.getAttribute('data-params')) {
                    params = JSON.parse(targetElement.getAttribute('data-params'));
                }
                statusManager.dispatch(type, params);
            }
            else if (event.target.closest('a[target]')) {
                event.preventDefault();
                event.stopPropagation();
                shell.openExternal(event.target.closest('a[target]').getAttribute('href'));
            }
        }, false);
    }

    function _openOcsUrl(ocsUrl) {
        const ocsUrlPath = `${remote.app.getAppPath()}/${appConfig.ocsUrlBin}`;
        childProcess.exec(`${ocsUrlPath} "${ocsUrl}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            }
        });
    }

    setupComponent();
    setupWebView();
    setupStatusManager();
    setupEvent();
}
