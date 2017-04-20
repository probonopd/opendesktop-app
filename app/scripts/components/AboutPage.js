'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';

import appConfig from '../../configs/application.json';

import packageJson from '../../../package.json';

export default class AboutPage extends Component {

    html() {
        return `
            <header data-component="ToolBar"></header>
            <div class="about-page-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${appConfig.title}</h1>
            <h3 class="version">Version ${packageJson.version}</h3>
            <p class="description">${packageJson.description}</p>
            <p>Author: ${packageJson.author}</p>
            <p>License: ${packageJson.license}</p>
            <p>Website: <a href="${packageJson.homepage}" target="_blank">${packageJson.homepage}</a></p>
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

            .about-page-content {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
            }

            .about-page-content .banner {
                width: 128px;
                height: 128px;
                margin: 2em 0;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .about-page-content .description {
                margin: 1em 0;
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
