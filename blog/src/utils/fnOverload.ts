export const fnOverload = <T extends (...args: any[]) => any> (fn?: T) => {
  const fnMap = new Map < string, (...args: any[]) => any > ()

  function overload (...args: any[]) {
    const key = args.map((arg) => typeof arg).join('_')
    const fn = fnMap.get(key)
    if (!fn) {
      throw new Error(`No overload for function with types ${key}`)
    }
    return fn(...args) // 使用展开操作符调用函数
  }

  overload.addImpl = (...args: any[]) => {
    const fn = args.pop()
    if (typeof fn !== 'function') {
      throw new Error('Last argument must be a function')
    }
    const key = args.map((arg) => arg).join('_') // 确保与获取key的逻辑一致
    fnMap.set(key, fn)
  }

  return overload
}