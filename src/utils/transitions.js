var R = Math.PI / 2

function wiggle(aProgress, aPeriod1, aPeriod2) {
  var current1 = aProgress * Math.PI * 2 * aPeriod1;
  var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

  return Math.sin(current1) * Math.cos(current2);
}

function arc(progress) {
  return Math.sin(Math.PI * progress)
}

function circleSin(progress) {
  return Math.sin(Math.PI * 2 * progress)
}

function circleCos(progress) {
  return Math.cos(Math.PI * 2 * progress)
}