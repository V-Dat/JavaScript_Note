import { handleRowFeature } from './Actions/RowFeature.js';
import { handlePaintTable } from './PaintTable/PaintTable.js';
import { $ } from './Util.js';

export function handleClickOnTable(event, app) {
    const targetNode = event.target;
    const isClickOnFeature = event.target.closest(`img[type="feature"]`);
    const isClickOnCell = event.target.closest(`td[type="cell"]`);
    const cellNode = isClickOnCell;
    const featureNode = isClickOnFeature;
    if (isClickOnCell && targetNode.nodeName !== 'IMG') {
        handlePaintTable(event, cellNode, app);
    } else if (isClickOnFeature && targetNode.nodeName === 'IMG') {
        handleRowFeature(event, featureNode, app);
    }
}

// Footer Feature ========================================================================

export function selectFeatureHighlight(event) {
    const activeButton = event.target.closest('.button-feature');
    const buttonFeature = $('.button-feature-group');

    if (!activeButton) return;
    for (const btn of buttonFeature.children) {
        btn.removeAttribute('active');
    }
    activeButton.setAttribute('active', true);
}

// =======================================================================================

export function getButtonEdit(rowIndex, cellIndex) {
    // sau này thay key = feature name
    const attr = `type="feature" width="28px" height="28px"`;
    return `
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="save" title="Save" class="save" src="./Assets/Icons/create-unactive-icon.svg" ></img>
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="edit" title="Edit" class="edit active" src="./Assets/Icons/edit-active-icon.svg"  ></img>
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="eraser" title="Eraser" class="eraser" src="./Assets/Icons/delete-icon.svg" ></img> 
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="undo" title="Undo" class="undo" src="./Assets/Icons/undo-unactive-icon.svg"  ></img> 
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="view-detail"  title="View Detail" class="view-detail" src="./Assets/Icons/view-detail-icon.svg"  ></img> 
    `;
}
