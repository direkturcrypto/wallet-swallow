import secureStorage from "libs/secureStorage"

const setItem = (key, value, expire) => {
  const expireTime = expire ? expire : 60
  let data = {
    value
  }

  if (expire===false) {
    secureStorage.setItem(key, data)
  } else {
    secureStorage.setItem(key, {...data, ttl: Date.now() + (expireTime*1000)})
  }

}

const getItem = (key) => {
  const item = secureStorage.getItem(key)
  // console.log(item)
  if (!item)
    return null

  // console.log({ttl:item.ttl, now: Date.now()})
  if (Date.now()>item.ttl) {
    // console.log('[EXPIRE]')
    secureStorage.removeItem(key)
    return null
  }

  return item.value
}

export {setItem, getItem}