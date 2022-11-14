import { showModalRowDetail } from '../ModalRowDetail.js';
import { toggleNode } from '../MenuBar/ButtonMenuBar.js';
import { $ } from '../Util.js';
import { getRowDataFromActiveRow, setActiveRow } from './AccessData.js';

export function handleClickViewRow(event, app) {
    const rowNode = event.target.closest('tr');
    // rowData start at index = 2 but data start at index = 0
    setActiveRow(app, rowNode.dataset.rowIndex);
    console.log(333, app.activeRow);
    const rowData = getRowDataFromActiveRow(app);
    showModalRowDetail(rowData);
    toggleNode($('.switch-document-group .btn-switch'));
}
