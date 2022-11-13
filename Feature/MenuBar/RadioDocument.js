import { cleanupLocalStorage } from '../FeatureLocalStorage.js';

export function handleRadioDocument(event, app) {
    // event.preventDefault();
    if (!event.target.closest('input')) return;
    app.document = event.target.getAttribute('id');
    cleanupLocalStorage();
    localStorage.setItem('document', app.document);
    app.firstRender();
}
