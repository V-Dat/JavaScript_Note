import { $ } from './Util.js';

export function arrowFeature() {
    window.pageYOffset / $('body').scrollHeight > 0.3 ? enableArrowBlock() : disableArrowBlock();
}

export function handleClickArrowFeature(event) {
    const targetClass = event.target.getAttribute('class');
    targetClass === 'up'
        ? window.scrollTo({ top: 0, behavior: 'smooth' })
        : window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function enableArrowBlock() {
    const arrowFeatureBlock = $('.arrow-features');
    arrowFeatureBlock.style.display = 'flex';
}

function disableArrowBlock() {
    const arrowFeatureBlock = $('.arrow-features');
    arrowFeatureBlock.style.display = 'none';
}

export function toggleArrowBlock(isNavigateHome = false) {
    if (isNavigateHome) {
        arrowFeature();
    } else {
        disableArrowBlock();
    }
}
