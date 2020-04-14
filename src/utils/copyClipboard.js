// Added minor additions
// Source: https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
import checkAndroid from './checkAndroid';
import checkIOS from './checkIOS';

const isMobile = checkAndroid() || checkIOS();

/* eslint-disable import/prefer-default-export */
export function copyStringToClipboard(event, string, callback) {
  if (isMobile) return null;

  try {
    // Create new element
    const tempElement = document.createElement('textarea');
    // Set value (string to be copied)
    tempElement.value = string;
    // Set non-editable to avoid focus and move outside of view
    tempElement.setAttribute('readonly', '');
    tempElement.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(tempElement);
    // Select text inside element
    tempElement.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(tempElement);

    callback(true);
    window.setTimeout(() => callback(false), 3000);

    event.preventDefault();
  } catch (error) {
    console.log(
      'Failed to copy. Will open mailto link as normal. Error:',
      error,
    );
  }
}
