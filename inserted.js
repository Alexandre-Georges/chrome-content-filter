let currentClickedElement = null;
let highlightedElement = null;
let highlightedFormerStyles = {};

function highlightElement(element) {
  highlightedFormerStyles.border = element.style.border;
  highlightedFormerStyles.background = element.style.background;
  element.style.setProperty('border', '2px solid red', 'important');
  element.style.setProperty('background', 'rgba(255, 0, 0, 0.1)', 'important');
}

function restoreElement() {
  highlightedElement.style.border = highlightedFormerStyles.border;
  highlightedElement.style.background = highlightedFormerStyles.background;
}

window.addEventListener('click', (event) => {
  let clickedElement = event.target;
  if (currentClickedElement) {
    restoreElement();

    if (clickedElement === currentClickedElement) {
      if (highlightedElement.parentElement.nodeName !== 'BODY') {
        highlightedElement = highlightedElement.parentElement;
        highlightElement(highlightedElement);
        return;
      }
    }
  }

  currentClickedElement = clickedElement;
  highlightedElement = clickedElement;
  highlightElement(highlightedElement);
});
window.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const body = window.document.getElementsByTagName('BODY')[0];
    while (body.childNodes.length > 0) {
      body.removeChild(body.childNodes[0]);
    }
    restoreElement();
    body.appendChild(highlightedElement);
    currentClickedElement = null;
    highlightedElement = null;
    highlightedFormerStyles = {};
  }
});
