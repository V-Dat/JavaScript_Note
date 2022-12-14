import { $, activeButtonEditContent, activeButtonSaveEditContent } from './Util.js';

export function renderHeading(JsonData) {
    changDocumentTitle(JsonData);
    renderHeadingMethod(JsonData);
    renderHeadingContent(JsonData);
    renderReferanceContent(JsonData);
}

function changDocumentTitle(JsonData) {
    if (JsonData.documentTitle) document.title = JsonData.documentTitle;
}

function renderHeadingMethod(JsonData) {
    if (JsonData.HeadingOne) {
        $('.heading-method-group .heading-text').innerHTML = JsonData.HeadingOne;
    }
}

function renderHeadingContent(JsonData) {
    if (JsonData.headingMainTwo) $('.content-notes .heading-text').innerHTML = JsonData.headingMainTwo;
}

function renderReferanceContent(JsonData) {
    if (JsonData.referanceContent) $('.referance-content').innerHTML = JsonData.referanceContent;
}

export function onChangeHeadingMethod(JsonData) {
    const headingText = $('.heading-method-group .heading-text');
    const isEditing = headingText.querySelector('textarea');
    if (isEditing) {
        activeButtonEditContent($('.heading-method-group .btn-edit'));
        JsonData.HeadingOne = isEditing.value;
        headingText.innerHTML = isEditing.value;
    } else {
        activeButtonSaveEditContent($('.heading-method-group .btn-edit'));
        headingText.innerHTML = `<textarea>${headingText.innerHTML}</textarea>`;
    }
}

export function onChangeHeadingContent(JsonData) {
    const headingText = $('.content-notes .heading-text');
    const isEditing = headingText.querySelector('textarea');
    if (isEditing) {
        JsonData.headingMainTwo = isEditing.value;
        headingText.innerHTML = isEditing.value;
        activeButtonEditContent($('.content-notes .btn-edit'));
    } else {
        activeButtonSaveEditContent($('.content-notes .btn-edit'));
        headingText.innerHTML = `<textarea>${headingText.innerHTML}</textarea>`;
    }
}
