/**
 * noop if not string
 */
export const abbreviateName = (name, length) =>
  typeof name === 'string'
    ? name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, length)
    : name

export const capitalizeFirstLetter = string =>
  typeof string === 'string'
    ? string.slice(0, 1).toUpperCase() + string.slice(1)
    : string

/* eslint-disable no-useless-escape */
export const slugify = text =>
  (text || '')
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')

/**
 * Unslugifies a slugified string.
 *
 * @param {string} slug slugified string.
 * @returns {string} un-slugified string.
 */
export const unslugify = text =>
  (text || '')
    .replace(/\-/g, ' ')
    .replace(/\_/g, ' ')
    .replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    )

export const isTruthyString = data => typeof data === 'string' && data !== ''

export const breakStringOnCapitalize = str =>
  typeof str === 'string' ? str.replace(/([A-Z])/g, ' $1').trim() : undefined
