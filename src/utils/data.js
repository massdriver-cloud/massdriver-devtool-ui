/**
 * *** DO NOT USE FOR OTHER STUFF - JUST JSON ***
 * This method has some problems and limitations, but we use it to copy form
 * data from the API which is guaranteed valid JSON.
 * https://medium.com/@pmzubar/why-json-parse-json-stringify-is-a-bad-practice-to-clone-an-object-in-javascript-b28ac5e36521
 */
export const expensiveJankyJsonCopy = (data, shouldThrow = false) => {
  try {
    const copy = JSON.parse(JSON.stringify(data))
    return copy
  } catch (error) {
    if (shouldThrow || process.NODE_ENV === 'development')
      throw new Error(`Unable to make a copy of JSON: ${error}`)
    console.error('Unable to make a copy of JSON: ', error)
  }
}

export const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      )
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

export const getFP = path => obj => get(path, obj)

/**
 * Will dig for nested value using `utils#get` and will run filter using (string|array).includes().
 * @param keyVal [Array: [key: string, value: string]] - A tuple containing a string for the nested path and the string value to look for.
 * @param data [Array] - A collection to filter through.
 * @returns Array of one - containing the found element.
 */
export const filterViaIncludes = ([key, val] = [], data) =>
  (data || []).filter(item => get(item, key)?.includes(val))

/**
 * Will parse a JSON string and handle parsing errors.
 * @param json [String] - A JSON string.
 * @param onError [Function] - A function accepting an error as its only argument.
 * @returns Object with parseJson or parseError.
 */
export const parseJson = (json, onError) => {
  let parsedJson
  try {
    parsedJson = JSON.parse(json)
  } catch (error) {
    onError?.(error)
    return { parseError: error }
  }
  return { parsedJson }
}

/**
 * Does Not Mutate
 * Filters list by predicate unless it produces no results. When no results are found, it returns the original list.
 * @param predicate [Function] - Same as the Array.filter() predicate.
 * @param list [Array] - An array with stuff in it.
 * @return Array
 */
export const maybeFilter = (predicate, list) => {
  const result = list?.filter(predicate)
  return result && result.length > 0 ? result : list
}

export const removeProps = (obj, keys) => {
  Array.isArray(obj) && obj.forEach(item => removeProps(item, keys || []))

  isPojo(obj) &&
    Object.getOwnPropertyNames(obj).forEach(key => {
      if ((keys || []).indexOf(key) !== -1) return delete obj[key]
      removeProps(obj[key], keys)
    })
}

/**
 * Removes defined props when found AND the predicate returns true. The
 * predicate receives the value of the target key, the key, and the object
 * the key lives on.
 *
 * predicate: (keyValue, keyName, object) => boolean
 */
export const removePropsWhen = (obj, keys, predicate) =>
  Array.isArray(obj)
    ? obj.forEach(item => removePropsWhen(item, keys || [], predicate))
    : isPojo(obj) &&
    Object.getOwnPropertyNames(obj).forEach(key =>
      (keys || []).indexOf(key) !== -1 && predicate?.(obj[key], key, obj)
        ? delete obj[key]
        : removePropsWhen(obj[key], keys, predicate)
    )

export const isPojo = obj =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null

export const isEmptyObject = obj => {
  // eslint-disable-next-line
  for (let _ in obj) return false
  return true
}

/**
 * @NOTE
 * This will return false if its NOT an object. It only returns true if its an
 * object AND its empty.
 */
export const isObjectAndEmpty = obj =>
  !isPojo(obj) ? false : isEmptyObject(obj)

export const isEmptyArray = ary => Array.isArray(ary) && ary.length === 0

export const isNil = thing => thing === null || thing === undefined
export const isNotNil = thing => thing !== null && thing !== undefined

/**
 * Creates an object with each element assigned to a key
 * value of choice.
 */
export const normalizeByKey = (collection, key) =>
  collection && key
    ? collection.reduce(
      (entities, item) =>
        item && item[key]
          ? {
            ...entities,
            [item[key]]: item
          }
          : entities,
      {}
    )
    : collection

export const normalizeByKeyDeep = (collection, key) =>
  collection && key
    ? collection.reduce((entities, item) => {
      const theKey = typeof key === 'function' ? key(item) : get(item, key)
      return item && theKey
        ? {
          ...entities,
          [theKey]: item
        }
        : entities
    }, {})
    : collection

/**
 * Checks if a string is in valid JSON format.
 */
export const isValidJsonString = input => {
  try {
    JSON.parse(input)
  } catch (error) {
    return false
  }
  return true
}

/**
 * Checks if a string is in valid JSON Object format.
 * Excludes primitive datatypes that pass as a valid JSON String.
 */
export const isValidJsonObject = input => {
  try {
    const parsedJSON = JSON.parse(input)

    if (parsedJSON && typeof parsedJSON !== 'object')
      throw new Error('Non-object')
  } catch (error) {
    return false
  }
  return true
}

/**
 * Convert an object to an array. Includes an option arg to choose what
 * name is used for the object key.
 *
 * @TODO
 * Separate unit test needed for this - currently tested via
 * `prepConnectionsData` unit test in `diagram-helpers.js`
 */
export const objectToArray = (obj, keyName, predicate) =>
  obj &&
  Object.keys(obj)
    .map(key => {
      const value = obj[key]
      const shouldInclude = predicate ? predicate([key, value]) : true

      return shouldInclude
        ? isPojo(value)
          ? {
            [keyName || 'id']: key,
            ...value
          }
          : value
        : undefined
    })
    .filter(thing => !!thing)

/**
 * Turns this:
 * ```
 * [
 *   { id: '420', slug: 'four-twenty' },
 *   { id: '421', slug: 'four-twenty-one' }
 * ]
 * ```
 *
 * Into this:
 * ```
 * {
 *   '420': 'four-twenty',
 *   '421': 'four-twenty-one',
 *   'four-twenty': '420',
 *   'four-twenty-one': '421'
 * }
 * ```
 *
 * or into this if the split flag is true:
 * ```
 * {
 *    id: {
 *     '420': 'four-twenty',
 *     '421': 'four-twenty-one'
 *    },
 *    slug: {
 *     'four-twenty': '420',
 *     'four-twenty-one': '421'
 *    }
 * }
 * ```
 */
export const createDictionary = (collection, keys, split = false) =>
  keys && collection
    ? collection?.reduce(
      (dict, item) => ({
        ...dict,
        ...(keys.length === 1
          ? {
            [item[keys[0]]]: item
          }
          : split
            ? {
              [keys[0]]: {
                ...(dict[keys[0]] || {}),
                [item[keys[0]]]: item[keys[1]]
              },
              [keys[1]]: {
                ...(dict[keys[1]] || {}),
                [item[keys[1]]]: item[keys[0]]
              }
            }
            : {
              [item[keys[0]]]: item[keys[1]],
              [item[keys[1]]]: item[keys[0]]
            })
      }),
      {}
    )
    : undefined

/**
 * Will deep merge two objects. The later objects passed take precedence over the earlier when there are duplicate values (arrays will be combined).
 * ex. objectDeepMerge(obj1, obj2, obj3).
 * Order of precedence:
 * 1. obj3
 * 2. obj2
 * 3. obj1
 */
export const objectDeepMerge = (...objects) =>
  objects.reduce(
    (prevObject, obj) =>
      Object.keys(obj || {}).reduce(
        (prev, key) => ({
          ...prev,
          [key]:
            Array.isArray(prev[key]) && Array.isArray(obj[key])
              ? [...prev[key], ...obj[key]]
              : isPojo(prev[key]) && isPojo(obj[key])
                ? objectDeepMerge(prev[key], obj[key])
                : obj[key]
        }),
        prevObject
      ),
    {}
  )
