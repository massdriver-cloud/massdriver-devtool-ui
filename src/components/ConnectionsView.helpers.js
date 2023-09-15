
export const getTypeFromId = id => id ? id.split('/').slice(id.split('/').length - 2).join('/') : ''
