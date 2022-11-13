// ============ BUTTON BUTTON SAVE NEW RECORD ============

import { $$ } from '../Util.js';
import { setActiveRow } from './AccessData.js';

export function activeButtonSaveNewRecord(rowNode) {
    if (!rowNode) return;
    const createNode = rowNode.querySelector('.save-new-record');
    createNode.classList.add('active');
    createNode.src = './Assets/Icons/create-active-icon.svg';
}
export function unactiveButtonSaveNewRecord(rowNode) {
    if (!rowNode) return;
    const createNode = rowNode.querySelector('.save-new-record.active');
    if (!createNode) return;
    createNode.classList.remove('active');
    createNode.src = './Assets/Icons/create-unactive-icon.svg';
}

// ============ BUTTON EDIT ============

export function activeButtonEdit(node) {
    if (!node) return;
    node.classList.add('active');
    node.src = './Assets/Icons/edit-active-icon.svg';
}

export function unActiveButtonEdit(node) {
    if (!node) return;
    node.classList.remove('active');
    node.src = './Assets/Icons/edit-unactive-icon.svg';
}

export function activeAllButtonEdit() {
    const allButtonEditNoActive = $$('.cell img.edit:not(.active)');
    if (!allButtonEditNoActive) return;
    allButtonEditNoActive.forEach((button) => activeButtonEdit(button));
}

// ============ BUTTON UNDO ============
export function unActiveAllButtonUndo() {
    const allButtonUndo = $$('img.undo.active');
    if (!allButtonUndo) return;
    allButtonUndo.forEach((button) => unActiveButtonUndo(button));
}

export function activeButtonUndo(node) {
    if (!node) return;
    node.classList.add('active');
    node.src = './Assets/Icons/undo-active-icon.svg';
}

export function unActiveButtonUndo(node) {
    if (!node) return;
    node.classList.remove('active');
    node.src = './Assets/Icons/undo-unactive-icon.svg';
}

// ============ BUTTON SAVE ============
export function unActiveAllButtonSave() {
    const allButtonSave = $$('img.save.active');
    if (!allButtonSave) return;
    allButtonSave.forEach((button) => unActiveButtonSave(button));
}

export function activeButtonSave(node) {
    if (!node) return;
    node.classList.add('active');
    node.src = './Assets/Icons/create-active-icon.svg';
}
export function unActiveButtonSave(node) {
    if (!node) return;
    node.classList.remove('active');
    node.src = './Assets/Icons/create-unactive-icon.svg';
}

// ============ BUTTON ERASER ============

export function activeButtonEraserInput(node) {
    if (!node) return;
    const eraserNode = node.querySelector('img.eraser');
    eraserNode.src = './Assets/Icons/eraser-active-icon.svg';
}

export function activeButtonEraserNewNode(rowNode) {
    if (!rowNode) return;
    const eraserNewNode = rowNode.querySelector('.clear-new-node');
    eraserNewNode.classList.add('active');
    eraserNewNode.src = './Assets/Icons/eraser-active-icon.svg';
}

export function unActiveButtonEraserNewNode(rowNode) {
    if (!rowNode) return;
    const eraserNewNode = rowNode.querySelector('.clear-new-node.active');
    if (!eraserNewNode) return;
    eraserNewNode.classList.remove('active');
    eraserNewNode.src = './Assets/Icons/eraser-unactive-icon.svg';
}

// ============ BUTTON DELETE & ERASER ROW ============

export function activeButtonEraserRow(node) {
    if (!node) return;
    node.classList.add('active');
    node.src = './Assets/Icons/eraser-active-icon.svg';
}

export function unActiveAllButtonEraserRowShowAllButtonDelete() {
    const allEraserNode = $$('img.eraser.active');
    allEraserNode.forEach((button) => unActiveButtonEraserRowAndShowButtonDelete(button));
}

export function unActiveButtonEraserRowAndShowButtonDelete(node) {
    node.classList.remove('active');
    node.src = './Assets/Icons/delete-icon.svg';
}

// ============ TR - ROW TOGGLE CLASS EDITING ============

export function unActiveAllEditingRow(app) {
    const allEditingRowNode = $$('tr.editing');
    if (!allEditingRowNode) return;
    setActiveRow(app, null);
    allEditingRowNode.forEach((rowEditing) => {
        rowEditing.classList.remove('editing');
    });
}

export function activeEditingRow(rowNode, app) {
    rowNode.classList.add('editing');
    setActiveRow(app, rowNode.dataset.rowIndex);
}

//
export function focusNode(rowNode) {
    const textAreaGroup = rowNode.querySelectorAll('textarea');
    const maxLength = textAreaGroup[0].value.length;
    textAreaGroup[0].setSelectionRange(maxLength, maxLength);
    textAreaGroup[0].focus();
}
