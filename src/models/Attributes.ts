export class Attributes<T> {
  constructor(private data: T) {}

  // K extends keyof T 表示 K 的类型是 T 中的key
  // 比如传入的 T 是 UserProps，那么 K 可以取到的值就是 'name', 'age', 'id'这三个字符串
  // 那么 T[K] 的值对应的分别就是：string, number,
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set(update: T): void {
    Object.assign(this.data, update)
  }

  getAll(): T {
    return this.data
  }
}
