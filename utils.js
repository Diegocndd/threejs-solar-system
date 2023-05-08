export const isVisibleElement = function (element) {
  let rect = element.getBoundingClientRect(),
    top = rect.top,
    height = rect.height,
    el = element.parentNode;

  // Check if bottom of the element is off the page
  if (rect.bottom < 0) return false;

  // Check its within the document viewport
  if (top > document.documentElement.clientHeight) return false;

  do {
    rect = el.getBoundingClientRect();
    if (top <= rect.bottom === false) return false;

    // Check if the element is out of view due to a container scrolling
    if (top + height <= rect.top) return false;
    el = el.parentNode;
  } while (el != document.body);

  return true;
};

export function isCompletelyVisibleElement(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}
