import { getButtonEdit } from '../CellFeature.js';
import { $ } from '../Util.js';

export function insertAndRenderRowToTableBody(dataTableBody) {
    const tableRowData = processRow(dataTableBody);
    const tbody = $('#table tbody');
    tbody.insertAdjacentHTML('beforeend', tableRowData);
}

function processRow(data) {
    if (!data) return;
    let tableRow = '';
    data.forEach((row) => {
        // minus 1 because in json start at 0
        let rowIndex = row[0].data - 1;
        let cellIndex = 0;
        tableRow += `<tr data-row-index=${rowIndex}>`;
        row.forEach((cell) => {
            if (cell.show.includes('home') || cell.show.includes('default-home')) {
                tableRow += `<td type="cell" data-row-type="row-data" data-row-index=${rowIndex} data-column-index=${cellIndex} data-column-name=${
                    cell.name
                } class="${cell.show.includes('default-home') ? 'cell' : 'column-data cell'}" style="background-color:${
                    cell.bg || 'color'
                }" >${cell.data ? cell.data : getButtonEdit(rowIndex, cellIndex)}</td>`;
                cellIndex++;
            }
        });
        tableRow += '</tr>';
    });
    return tableRow;
}
