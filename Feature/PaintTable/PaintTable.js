import { $ } from '../Util.js';
import { saveStyleToJsonData } from './SaveStyle.js';

export function handlePaintTable(event, cellNode, app) {
    const paintWithHotKey = event.shiftKey || event.altKey || event.ctrlKey;

    paintWithHotKey ? processPaintWithHotKey(cellNode, app) : processPaint(cellNode, app);
}

function processPaint(cellNode, app) {
    const feature = getFeaturePaint();
    switch (feature) {
        case FEATURE.MAKE_UP_ROW:
            processMakeUpRow(cellNode, app);
            break;
        case FEATURE.MAKE_UP_CELL:
            processMakeUpCell(cellNode, app);
            break;
        case FEATURE.REMOVE_MAKE_UP_CELL:
            processRemoveMakeUpCell(cellNode, app);
            break;
    }
}

function processPaintWithHotKey(cellNode, app) {
    const feature = getFeaturePaint();
    switch (feature) {
        case FEATURE.MAKE_UP_ROW:
            processRemoveMakeUpRow(cellNode, app);
            break;
        case FEATURE.MAKE_UP_CELL:
            processRemoveMakeUpCell(cellNode, app);
            break;
        case FEATURE.REMOVE_MAKE_UP_CELL:
            processRemoveMakeUpCell(cellNode, app);
            break;
    }
}

function processMakeUpRow(cellNode, app) {
    const backgroundColor = randomColor();
    const rowNode = cellNode.closest('tr');

    for (const cell of rowNode.children) {
        const cellData = getCellData(cell, app);
        cell.style.backgroundColor = backgroundColor;
        saveStyleToJsonData(cellData, backgroundColor);
    }
}

function processMakeUpCell(cellNode, app) {
    const backgroundColor = randomColor();
    const cellData = getCellData(cellNode, app);

    cellNode.style.backgroundColor = backgroundColor;
    saveStyleToJsonData(cellData, backgroundColor);
}

function processRemoveMakeUpCell(cellNode, app) {
    const background = '';
    const cellData = getCellData(cellNode, app);
    cellNode.style.background = background;
    saveStyleToJsonData(cellData, background);
}

function processRemoveMakeUpRow(cellNode, app) {
    const background = '';
    const rowNode = cellNode.closest('tr');

    for (const cell of rowNode.children) {
        const cellData = getCellData(cell, app);
        cell.style.background = background;
        saveStyleToJsonData(cellData, background);
    }
}

function getCellData(cellNode, app) {
    const rowIndex = cellNode.dataset.rowIndex;
    switch (rowIndex) {
        case '0': {
            let rowData = app.JsonData.dataTable.dataTableHeader.find((_, index) => {
                return index === +cellNode.dataset.columnIndex;
            });
            return rowData;
        }
        case '1': {
            let rowData = app.JsonData.dataTable.dataTableFirstRow.find((_, index) => {
                return index === +cellNode.dataset.columnIndex;
            });
            return rowData;
        }
        default: {
            let rowData = app.JsonData.dataTable.dataTableBody.find((_, index) => {
                return index === +cellNode.dataset.rowIndex - 2;
            });
            return rowData[cellNode.dataset.columnIndex];
        }
    }
}

const FEATURE = {
    MAKE_UP_ROW: 'make-up-row',
    MAKE_UP_CELL: 'make-up-cell',
    REMOVE_MAKE_UP_CELL: 'remove-make-up-cell',
};

function randomColor() {
    return 'hsl(' + 360 * Math.random() + ',50%,50%)';
}

function getFeaturePaint() {
    const feature = $('.button-feature-group button[active]');
    return feature.getAttribute('type');
}
