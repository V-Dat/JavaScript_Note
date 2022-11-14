import { $ } from '../Util.js';
import { DOCS } from './MenuBarData.js';

export function handleClickMenuBar(app) {
    const docBar = $('.switch-document-group .side-bar');
    const buttonSwitchDoc = $('.switch-document-group .btn-switch');
    const isShow = toggleNode(docBar);
    toggleNode($('.features-localstorage'), 'flex'); // toggle feature localstore
    toggleNode($('.open-javascript-playgrounds')); // toggle feature playgrounds
    toggleNode($('.open-stackblitz')); // toggle feature stackbliz
    isShow ? fixedButton(buttonSwitchDoc) : absuluteNode(buttonSwitchDoc);
    embedDataMenu(app); // handle chỉ đọc lần đầu tiên thôi
}

export function toggleNode(node, dispay = 'block') {
    let isShow = false;
    if (node.style.display === 'none') {
        node.style.display = dispay;
        isShow = true;
    } else {
        node.style.display = 'none';
    }
    return isShow;
}

function fixedButton(node) {
    node.style.position = 'fixed';
}

function absuluteNode(node) {
    node.style.position = 'absolute';
}

function embedDataMenu(app) {
    const emmbed = $('.switch-document-group .side-bar .embed');
    emmbed.innerHTML = processDataMenu(app);
}

function processDataMenu(app) {
    let html = '';
    DOCS.forEach((doc, index) => {
        if (doc.key === 'Upload' && localStorage.getItem('document') !== 'Upload') return;
        html += `
    <div><label style="cursor:pointer" for=${doc.key}>
    <input style="cursor:pointer"name="document" type="radio" id=${doc.key}  value=${doc.name} ${
            app.document === doc.key ? 'checked' : ''
        }>${index + 1} - ${doc.name}</label>
    </div>
    `;
    });
    return html;
}
