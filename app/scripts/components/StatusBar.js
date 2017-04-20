'use strict';

import Component from 'js/Component.js';

export default class StatusBar extends Component {

    html() {
        return `
            <address></address>
        `;
    }

    style() {
        this.element.style.borderTop = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';
    }

}
