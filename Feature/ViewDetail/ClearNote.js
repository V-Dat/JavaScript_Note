import { $ } from '../Util.js';

export function handleClearNote() {
    const textareaNode = $('.modal-row-detail .modal-row-detail-note textarea');
    textareaNode.value = '';
    textareaNode.focus();
}
