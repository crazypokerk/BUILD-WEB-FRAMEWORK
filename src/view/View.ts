import { Model } from '../models/Model'

export abstract class View<T extends Model<K>, K> {
  // 对象名: { 键的类型为sring : 值类型为Element } = {}
  regions: { [key: string]: Element } = {}

  regionsMap(): { [key: string]: string } {
    return {}
  }

  eventsMap(): { [key: string]: () => void } {
    return {}
  }

  abstract template(): string

  constructor(public parent: Element, public model: T) {
    this.bindModel()
  }
  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
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

  // 该辅助方法是为了将嵌入的模板放入regions中的值
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap()
    for (let regionKey in regionsMap) {
      const selector = regionsMap[regionKey]
      const element = fragment.querySelector(selector)
      if (element) {
        this.regions[regionKey] = element
      }
    }
  }
  // 此方法是为了在render()方法中调用，渲染嵌入的模板，真正的实现在UserEdit类中
  onRender(): void {}

  render(): void {
    this.parent.innerHTML = ''

    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)
    this.mapRegions(templateElement.content)

    this.onRender()

    this.parent.appendChild(templateElement.content)
  }
}
