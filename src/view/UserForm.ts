import { User, UserProps } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
  // 返回值是一个对象：{ [键: 类型]: 值为返回值为void的函数 }
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#set-age': this.onSetAgeClick,
      'click:#set-name': this.onSetNameClick,
      'click:#save-model': this.onSaveClick,
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    // 添加类型守卫
    if (input) this.model.set({ name: input.value })
  }

  onSaveClick = (): void => {
    this.model.save()
  }

  template(): string {
    return `
        <div>
            <input placeholder='${this.model.get('name')}' />
            <button id='set-name'>Change Name</button>
            <button id='set-age'>Set Random Age</button>
            <button id='save-model'>Save</button>
        </div>
    `
  }
}
