import { $, activeButtonEditContent, activeButtonSaveEditContent } from './Util.js';

export function onChangeReferanceContent(JsonData) {
    const refContent = $('.referance-section .referance-content');
    const isEditing = refContent.querySelector('textarea');
    if (isEditing) {
        activeButtonEditContent($('.referance-section .btn-edit'));
        JsonData.referanceContent = isEditing.value;
        refContent.innerHTML = isEditing.value;
    } else {
        activeButtonSaveEditContent($('.referance-section .btn-edit'));
        refContent.innerHTML = `<textarea>${refContent.innerHTML}</textarea>`;
    }
}
