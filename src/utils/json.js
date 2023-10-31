/**
 * @param {string} string 
 * @returns {Array}
 */
export function extractJsonFromString(string, parser = evalParser) {
  let postions = []
  let i = 0
  while (i < string.length) {
    const c = string[i]
    if (c == '{') {
      let pos = extractJsonObject(string, i)
      if (pos < 0) {
        i++
      } else {
        postions.push([i, pos])
        i = pos
      }
    } else if (c == '[') {
      let pos = extractJsonArray(string, i)
      if (pos < 0) {
        i++
      } else {
        postions.push([i, pos])
        i = pos
      }
    } else {
      i++
    }
  }
  return postions.map(([start, end]) => parser(string.substring(start, end)))
}

/**
* @param {string} json 
* @returns 
*/
export function evalParser(json) {
  return Function(`return (${json})`)()
}

/**
* @param {string} json 
* @returns 
*/
export function jsonParser(json) {
  return JSON.parse(json)
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractJsonObject(string, start) {
  let i = start + 1
  while (i < string.length) {
    i = extractWhiteSpace(string, i)
    let c = string[i]
    if (c == '}') {
      return i + 1
    }
    i = extractJsonKey(string, i)
    if (i < 0) return -1
    i = extractWhiteSpace(string, i)
    c = string[i]
    i++
    if (c != ':') return -1
    i = extractWhiteSpace(string, i)
    i = extractJsonValue(string, i)
    if (i < 0) return -1
    c = string[i]
    if (c == ',') {
      i++
    }
  }
  return -1
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractJsonArray(string, start) {
  let i = start + 1
  while (i < string.length) {
    i = extractWhiteSpace(string, i)
    let c = string[i]
    if (c == ']') {
      return i + 1
    }
    i = extractJsonValue(string, i)
    if (i < 0) return -1
    i = extractWhiteSpace(string, i)
    c = string[i]
    if (c == ',') {
      i++
    }
  }
  return -1
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractJsonKey(string, start) {
  let begin = string[start]
  let quotation = false
  if (begin == '"' || begin == "'") {
    quotation = true
  }
  if (!/['"a-zA-Z_$]/.test(begin)) {
    return -1
  }
  for (let i = start + 1; i < string.length; i++) {
    const c = string[i]
    if (c == '\\') {
      i += 1
      continue
    }
    if (/[\n\r\t]/.test(c)) {
      return -1
    }
    if (quotation) {
      if (c == begin) {
        return i + 1
      }
    } else {
      if (!/[a-zA-Z_$0-9]/.test(c)) {
        return i
      }
    }
  }
  return -1
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractJsonValue(string, start) {
  let begin = string[start]
  if (begin == '{') {
    return extractJsonObject(string, start)
  }
  if (begin == '[') {
    return extractJsonArray(string, start)
  }
  if (begin == '"' || begin == "'") {
    return extractString(string, start)
  }
  if ('1234567890'.includes(begin)) {
    return extractNumber(string, start)
  }
  if ('tfn'.includes(begin)) {
    return extractBooleanOrNull(string, start)
  }
  return -1
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractString(string, start) {
  let begin = string[start]
  for (let i = start + 1; i < string.length; i++) {
    const c = string[i]
    if (c == begin) {
      return i + 1
    }
    if (c == '\\') {
      i += 1
      continue
    }
    if (/[\n\r\t]/.test(c)) {
      return -1
    }
  }
  return -1
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractNumber(string, start) {
  for (let i = start; i < string.length; i++) {
    const c = string[i]
    if (!'1234567890.e-_'.includes(c)) {
      return i
    }
  }
  return string.length
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractBooleanOrNull(string, start) {
  if ('true' === string.substring(start, start + 4)) {
    return start + 4
  }
  if ('false' === string.substring(start, start + 5)) {
    return start + 5
  }
  if ('null' === string.substring(start, start + 4)) {
    return start + 4
  }
  return -1
}

/**
* @param {string} string 
* @param {number} start 
*/
function extractWhiteSpace(string, start) {
  for (let i = start; i < string.length; i++) {
    const c = string[i]
    if (!isWhiteSpace(c)) {
      return i
    }
  }
  return string.length
}

/**
* @param {string} char 
*/
function isWhiteSpace(char) {
  return ' \r\n\t'.includes(char)
}
