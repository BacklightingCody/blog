export function useRef<T extends new (...args: any[]) => any>(_comp: T) {
  return ref<InstanceType<T>>()
}