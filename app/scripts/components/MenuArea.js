'use strict';

const electronConfig = require('electron-config');

import Component from 'js/Component.js';

import appConfig from '../../configs/application.json';

export default class MenuArea extends Component {

    html() {
        return `
            <header class="menu-items-header">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${appConfig.title}</h1>
            </header>

            <ul class="menu-items">
            <li><button class="menu-item" data-dispatch="browse">Browse</button></li>
            <li>
            <select class="menu-item" name="startPage">
            <option value="https://www.opendesktop.org/">opendesktop.org</option>
            <option value="https://www.gnome-look.org/">gnome-look.org</option>
            <option value="https://store.kde.org/">store.kde.org</option>
            <option value="https://www.xfce-look.org/">xfce-look.org</option>
            <option value="https://www.box-look.org/">box-look.org</option>
            <option value="https://www.enlightenment-themes.org/">enlightenment-themes.org</option>
            <option value="https://www.linux-appimages.org/">linux-appimages.org</option>
            </select>
            </li>
            </ul>

            <ul class="menu-items-footer">
            <li><button class="menu-item" data-dispatch="about">About This App</button></li>
            </ul>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.borderRight = '1px solid #cccccc';
        this.element.style.background = '#007ac1';

        return `
            .menu-items-header {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;

                flex: 0 0 auto;
                height: 64px;
                padding: 0.4em;
                background-color: #006db3;
            }

            .menu-items {
                flex: 1 1 auto;
                height: 100%;
                padding: 0.4em;
                list-style: none;
            }

            .menu-items-footer {
                flex: 1 1 auto;
                height: auto;
                padding: 0.4em;
                list-style: none;
            }

            .menu-items-header .title {
                display: none;
                /*padding: 0.4em;
                color: rgba(255,255,255,0.9);*/
            }
            .menu-items-header .banner {
                width: 48px;
                height: 48px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .menu-items li,
            .menu-items-footer li {
                padding: 0.4em;
            }

            .menu-item {
                display: block;
                width: 80%;
                margin: 0 auto;
                padding: 0.6em;
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 0.6em;
                outline: none;
                background-color: transparent;
                color: rgba(255,255,255,0.7);
                font-weight: bold;
                transition: background-color 0.3s ease-out;
            }
            .menu-item:hover,
            .menu-item:active {
                background-color: #03a9f4;
            }

            .menu-item option {
                background-color: #ffffff;
                color: #222222;
            }
        `;
    }

    script() {
        const config = new electronConfig({name: 'application'});
        this.element.querySelector(`.menu-item[name="startPage"] option[value="${config.get('startPage')}"]`)
        .setAttribute('selected', 'selected');

        this.element.querySelector('.menu-item[name="startPage"]').addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            document.dispatchEvent(new CustomEvent('start-page', {detail: {startPage: event.target.value}}));
        }, false);
    }

}
