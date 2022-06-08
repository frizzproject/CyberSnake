/* ===== Random ===== */
export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

/* ===== Css helper ===== */
export function css(el, styles = {}) {
    Object.assign(el.style, styles)
}

/* ===== Get css property helper ===== */
export const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
    let response = getComputedStyle(element).getPropertyValue(propKey);
  
    if (response.length) {
      response = response.replace(/"/g, '').trim();
    }
  
    switch (castAs) {
      case 'number':
      case 'int':
        return parseInt(response, 10);
      case 'float':
        return parseFloat(response, 10);
      case 'boolean':
      case 'bool':
        return response === 'true' || response === '1';
    }
  
    return response;
};