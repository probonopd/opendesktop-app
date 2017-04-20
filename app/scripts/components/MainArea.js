'use strict';

import Component from 'js/Component.js';

import StartupPage from './StartupPage.js';
import BrowsePage from './BrowsePage.js';
import AboutPage from './AboutPage.js';
import UpgradePage from './UpgradePage.js';

export default class Root extends Component {

    html() {
        return `
            <article data-component="StartupPage"></article>
            <article data-component="BrowsePage"></article>
            <article data-component="AboutPage"></article>
            <article data-component="UpgradePage"></article>
        `;
    }

    style() {
        this.element.style.background = '#ffffff';

        return `
            [data-component="StartupPage"] {
                z-index: 999;
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column nowrap;
                width: 100%;
                height: 100%;
            }

            [data-component="BrowsePage"],
            [data-component="AboutPage"],
            [data-component="UpgradePage"] {
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
                height: 100%;
            }
        `;
    }

    script() {
        this.startupPage = new StartupPage(this.element.querySelector('[data-component="StartupPage"]'));
        this.browsePage = new BrowsePage(this.element.querySelector('[data-component="BrowsePage"]'));
        this.aboutPage = new AboutPage(this.element.querySelector('[data-component="AboutPage"]'));
        this.upgradePage = new UpgradePage(this.element.querySelector('[data-component="UpgradePage"]'));
        this._hideAllPages();
    }

    changePage(key) {
        if (this[key] && this[key].element) {
            this._hideAllPages();
            this[key].element.style.display = 'flex';
        }
    }

    showStartupPage() {
        this.startupPage.element.style.display = 'flex';
    }

    hideStartupPage() {
        this.startupPage.element.style.display = 'none';
    }

    _hideAllPages() {
        for (const key of Object.keys(this)) {
            if (key.endsWith('Page') && this[key].element) {
                this[key].element.style.display = 'none';
            }
        }
    }

}
