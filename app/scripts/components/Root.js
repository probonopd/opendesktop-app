'use strict';

import Component from 'js/Component.js';

import MainArea from './MainArea.js';
import MenuArea from './MenuArea.js';

export default class Root extends Component {

    init() {
        console.log('Component building started');
    }

    complete() {
        //console.log(this);
        console.log('Component building completed');
    }

    html() {
        return `
            <main data-component="MainArea" role="main"></main>
            <aside data-component="MenuArea"></aside>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        return `
            [data-component="MainArea"] {
                flex: 1 1 auto;
                width: auto;
                height: 100%;
            }

            [data-component="MenuArea"] {
                flex: 0 0 auto;
                width: 300px;
                height: 100%;
            }
        `;
    }

    script() {
        this.mainArea = new MainArea(this.element.querySelector('[data-component="MainArea"]'));
        this.menuArea = new MenuArea(this.element.querySelector('[data-component="MenuArea"]'));

        this.menuArea.element.style.display = 'none';
    }

    toggleMenuArea() {
        if (this.menuArea.element.style.display === 'none') {
            this.menuArea.element.style.display = 'flex';
        }
        else {
            this.menuArea.element.style.display = 'none';
        }
    }

}
