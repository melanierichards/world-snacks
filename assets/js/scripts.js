// Detect Windows to hide flag emoji
if (navigator.platform.indexOf('Win') === 0) {
  document.documentElement.setAttribute('data-is-win', 'true');
}