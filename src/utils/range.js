function range(start, end) {
  var array = []

  if (start < end) {
    for (var i = start; i <= end; i++) {
      array.push(i)
    }
  }
  else {
    for (var i = start; i >= end; i--) {
      array.push(i)
    }
  }

  return array
}