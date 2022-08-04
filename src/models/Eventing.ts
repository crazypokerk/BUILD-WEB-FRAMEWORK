type Callback = () => void

export class Eventing {
  // 变量名: 类型是一个对象{ [键: 类型]: 值 } = 初始化为空对象{}
  events: { [key: string]: Callback[] } = {}

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName]
    if (!handlers || !handlers.length) return
    handlers.forEach((callback) => callback())
  }
}
