'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';

import appConfig from '../../configs/application.json';

import packageJson from '../../../package.json';

export default class UpgradePage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let list = '';
        for (const releasefile of this.state.releasefiles) {
            const params = JSON.stringify({ocsUrl: `ocs://download?url=${encodeURIComponent(releasefile.url)}&type=downloads`});
            list += `
                <dt>
                <h4 class="file-name">${releasefile.name}</h4>
                <button class="download-button" data-dispatch="ocs-url" data-params='${params}'>Download</button>
                </dt>
                <dd>${releasefile.description}</dd>
            `;
        }

        return `
            <header data-component="ToolBar"></header>
            <div class="upgrade-page-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${appConfig.title}</h1>
            <h3 class="version">Version ${this.state.versionname} available</h3>
            <p class="description">Current version ${packageJson.version}</p>
            <dl class="releasefiles">${list}</dl>
            <p>Visit <a href="${this.state.releasepage}" target="_blank">${this.state.releasepage}</a> for more details.</p>
            </div>
        `;
    }

    style() {
        return `
            [data-component="ToolBar"] {
                flex: 0 0 auto;
                width: 100%;
                height: 48px;
            }

            .upgrade-page-content {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
            }

            .upgrade-page-content .banner {
                width: 128px;
                height: 128px;
                margin: 2em 0;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .upgrade-page-content .description {
                margin: 1em 0;
            }

            .upgrade-page-content .releasefiles {
                width: 480px;
                margin: 2em 0;
                border: 2px solid rgba(0,0,0,0.1);
                border-radius: 0.6em;
            }

            .upgrade-page-content .releasefiles dt {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                width: 100%;
                padding: 0.6em 0.6em 0 0.6em;
                border-top: 2px solid rgba(0,0,0,0.1);
            }
            .upgrade-page-content .releasefiles dt:first-child {
                border-top-width: 0;
            }
            .upgrade-page-content .releasefiles dd {
                padding: 0 0.6em 0.6em 0.6em;
            }

            .upgrade-page-content .releasefiles dt .file-name {
                flex: 1 1 auto;
                width: auto;
            }
            .upgrade-page-content .releasefiles dt .download-button {
                display: block;
                flex: 0 0 auto;
                padding: 0.6em;
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 0.6em;
                outline: none;
                background-color: #ec407a;
                color: #ffffff;
                font-weight: bold;
                transition: background-color 0.3s ease-out;
            }
            .upgrade-page-content .releasefiles dt .download-button:hover,
            .upgrade-page-content .releasefiles dt .download-button:active {
                background-color: #d81b60;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar(
            this.element.querySelector('[data-component="ToolBar"]'),
            {navigation: false, menu: true}
        );
    }

}
