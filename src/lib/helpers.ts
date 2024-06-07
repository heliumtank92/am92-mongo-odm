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
