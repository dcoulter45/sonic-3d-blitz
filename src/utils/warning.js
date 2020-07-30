var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
console.log(isChrome);
if (!isChrome) {
  var el = document.getElementById("browser-warning");
  el.style.display = "block";
}