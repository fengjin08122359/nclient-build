function lowerCamelCase(str){ 
  var reg = /\b(\w)|\s(\w)/g; 
  return str.replace(reg,function(m){return m.toLowerCase()}) 
}

function upperCamelCase(str){ 
  var reg = /\b(\w)|\s(\w)/g; 
  return str.replace(reg,function(m){return m.toUpperCase()}) 
}

module.exports = {
  lowerCamelCase,
  upperCamelCase
}