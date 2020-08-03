var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

if (!isChrome) {
  var el = document.getElementById("browser-warning");
  el.style.display = "block";
}