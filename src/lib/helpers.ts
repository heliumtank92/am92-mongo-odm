import { MongoLeanOption } from '../TYPES'

/** @ignore */
export function getLeanOption(lean?: MongoLeanOption): MongoLeanOption {
  const isNotLean = lean === false

  let leanOption: MongoLeanOption = {
    virtuals: true,
    getters: true,
    defaults: true
  }

  if (typeof lean === 'object') {
    leanOption = { ...leanOption, ...lean }
  }

  return isNotLean ? false : leanOption
}

/** @ignore */
export function sanitizeCreateDoc(doc: any): any {
  if (Array.isArray(doc)) {
    return doc.map(sanitizeCreateDoc)
  } else if (doc !== null && typeof doc === 'object') {
    const newObj = { ...doc }
    if (!newObj._id) {
      delete newObj._id
    }
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        newObj[key] = sanitizeCreateDoc(newObj[key])
      }
    }
    return newObj
  }
  return doc
}
