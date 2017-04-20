'use strict';

import Component from 'js/Component.js';

export default class StartupPage extends Component {

    html() {
        return `
            <div class="startup-page-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">Welcome to Opendesktop.org</h1>
            <span class="indicator icon-loading">Starting</span>
            </div>
        `;
    }

    style() {
        return `
            .startup-page-content {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column nowrap;
                width: 460px;
                height: 300px;
                padding: 2em;
                border-radius: 0.6em;
                background-color: #eeeeee;
                box-shadow: 0 0 2em 0.6em rgba(0,0,0,0.2);
            }

            .startup-page-content .banner {
                width: 128px;
                height: 128px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .startup-page-content .title {
                margin: 2em 0;
                font-size: 100%;
            }

            .startup-page-content .indicator {
                display: inline-block;
                padding-left: 24px;
                background-position: left center;
                background-repeat: no-repeat;
                background-size: 16px 16px;
            }
        `;
    }

}
