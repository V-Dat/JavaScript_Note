import { showModalConfirm } from '../AddColumn/ShowModalAddColumn.js';
import { $, $$ } from '../Util.js';

export function renderdataTableHeader(app) {
    const tHead = $('#table thead');

    const newTHead = app.JsonData.dataTable.dataTableHeader.map((cell) => {
        return `<td type="cell"  data-row-type="header" data-column-name=${
            cell.name
        } data-row-index=0 data-column-index=${cell.index} class="cell column-${cell.index}" style="background-color:${
            cell.bg || 'color'
        }; position:sticky ;text-align:center;  vertical-align:middle">${cell.data} ${
            cell.actionSrc
                ? `<img class="header-feature" width=16px style="position: absolute; right: 12px; top : 34%; border-radius: 50%;
                padding: 1px; background: #d4d4d4;" data-index=${cell.index} src=${cell.actionSrc} />`
                : ''
        }</td>`;
    });

    tHead.innerHTML = `<tr data-row-type="header" data-row-index=0>${newTHead.join('')}</tr>`;
    const buttonAdd = $$('#table thead .header-feature');

    buttonAdd.forEach((item) => {
        item.addEventListener('click', (event) => showModalConfirm(event, app));
    });
}
