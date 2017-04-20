'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';
//import StatusBar from './StatusBar.js';

export default class BrowsePage extends Component {

    html() {
        return `
            <header data-component="ToolBar"></header>
            <webview data-webview="browse"></webview>
            <!--<footer data-component="StatusBar"></footer>-->
        `;
    }

    style() {
        return `
            [data-component="ToolBar"] {
                flex: 0 0 auto;
                width: 100%;
                height: 48px;
            }

            [data-webview="browse"] {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;
            }

            [data-component="StatusBar"] {
                flex: 0 0 auto;
                width: 100%;
                height: 24px;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar(
            this.element.querySelector('[data-component="ToolBar"]'),
            {navigation: true, menu: true}
        );
        //this.statusBar = new StatusBar(this.element.querySelector('[data-component="StatusBar"]'));
    }

}
