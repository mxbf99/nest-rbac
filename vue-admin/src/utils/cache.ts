enum CacheType {
  Local,
  Session
}

class Cache {
  constructor(type: CacheType) {
    this.storage = type == CacheType.Local ? localStorage : sessionStorage
  }

  storage: Storage

  set(key: string, value: any) {
    if (value)
      if (typeof value === 'object')
        this.storage.setItem(key, JSON.stringify(value))
      else this.storage.setItem(key, value)
  }

  get(key: string) {
    const value = this.storage.getItem(key)
    if (value) return value
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
