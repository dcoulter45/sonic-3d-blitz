function keysInGroup(group, key) {
  var total = 0

  if (group.children) {
    group.children.forEach((obj) => {
      if (obj.key === key) total += 1
    })
  }

  return total
}