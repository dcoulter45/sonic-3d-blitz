function getProp(param, obj, defaultValue) {
  var value = null

  if (obj.properties) {
    obj.properties.forEach((prop) => {
      if (prop.name === param) {
        value = prop.value
      }
    })
  }

  return value !== null ? value : defaultValue
}