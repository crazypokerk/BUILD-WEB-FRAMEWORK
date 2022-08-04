import { User } from '../models/User'

export class UserForm {
  constructor(public parent: Element, public user: User) {
    this.bindModel()
  }

  bindModel(): void {
    this.user.on('change', () => {
      this.render()
    })
  }
  // 返回值是一个对象：{ [键: 类型]: 值为返回值为void的函数 }
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#btn1': this.onBtn1Click,
      'click:#btn2': this.onSetNameClick,
    }
  }

  onBtn1Click = (): void => {
    this.user.setRandomAge()
  }

  onSetNameClick = (): void => {
    const input = document.querySelector('input')
    // 添加类型守卫
    if (input) this.user.set({ name: input.value })
  }

  template(): string {
    return `
        <div>
            <h1>AAA</h1>
            <h2>User Name: ${this.user.get('name')}</h2>
            <h2>User age: ${this.user.get('age')}</h2>
            <h1>Random age: ${this.user.get('age')}</h1>
            <input />
            <button id='btn1'>bbb</button>
            <button id='btn2'>ccc</button>
        </div>
    `
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':')
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    this.parent.innerHTML = ''

    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)
    this.parent.appendChild(templateElement.content)
  }
}
