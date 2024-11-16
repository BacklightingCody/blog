import { ref, Ref, UnwrapRef, Reactive } from 'vue';

export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
};
export function useResetFormRef<T>(value: T): { state: Ref<UnwrapRef<T>>, reset: () => void } {
  const initialValue = deepClone(value);
  const state = ref(value) as Ref<UnwrapRef<T>>; // 明确为 UnwrapRef<T>
  const reset = () => {
    state.value = deepClone(initialValue) as UnwrapRef<T>; // 深拷贝后类型转换
  };
  return { state, reset };
}

export function useResetFormReactive<T extends Object>(value: T): [Reactive<T>, () => void] {
  const state = reactive(deepClone(value))
  const reset = () => {
    Object.keys(state).forEach(key => delete state[key])
    Object.assign(state, deepClone(value))
  }
  return [state, reset]
}