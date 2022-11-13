import { $ } from '../Util.js';
import { handleAddRightColumn } from './AddColumn.js';

export function showModalConfirm(event, app) {
    const modal = $('.modal.modal-common');
    const modalContent = $('.modal.modal-common .modal-content');
    modal.style.cssText = `display:block; right: 0 ; bottom: 0;`;
    modalContent.style.cssText = `background-color:rgba(33,33,33,0.2); border: 0 ; `;
    processModalContent(event, app);
}

function processModalContent(event, app) {
    const embed = $('.modal.modal-common .modal-content .embed');
    const embedContent = `
  <div style="width:40vw ; height:200px; background:white ;border-radius:10px">
  <div class="embed__header" style="line-height:50px; text-align:center">Input New Column Name</div>
  <hr>
  <div style="width: 80% ; margin:auto; height:100px" class="embed__content">
    <input class="input-column-name" style="width:100%; height:46px" placeholder="Input Column Name" />
  </div>
  <div class="embed__footer center" style="column-gap:15px">
    <button class="button-modal-cancel">Cancel</button>
    <button class="button-modal-rename">Change</button>
    <button class="button-modal-delete">Delete</button>
    <button class="button-modal-add-to-right">Add To Right</button>
  </div>
</div>
  `;
    if (embed.innerHTML !== embedContent) {
        embed.innerHTML = embedContent;
        const indexInsert = +event.target.dataset.index + 1;
        handleAddEventListener(indexInsert, app);
    }
}
function handleAddEventListener(indexInsert, app) {
    const buttonClose = $('.button-modal-close');
    const buttonCancel = $('.button-modal-cancel');
    const buttonOke = $('.button-modal-add-to-right');
    buttonClose.onclick = hideModalConfirm;
    buttonOke.onclick = () => handleClickButtonOke(indexInsert, app);
    buttonCancel.onclick = hideModalConfirm;
}

function getColumnName() {
    const input = $('.input-column-name');
    return input.value;
}

function handleClickButtonOke(indexInsert, app) {
    const newColumName = getColumnName();
    if (!newColumName) return;
    const modal = $('.modal.modal-common');
    handleAddRightColumn(indexInsert, newColumName, app);
    //   handleAddRightColumn(indexInsert, newColumName, app); add tbody first
    //   handleAddRightColumn(indexInsert, newColumName, app); add tbody data row
    modal.style.display = 'none';
}

function hideModalConfirm() {
    const modal = $('.modal.modal-common');
    modal.style.display = 'none';
}
