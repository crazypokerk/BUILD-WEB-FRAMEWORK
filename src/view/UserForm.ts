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
    this.user.setRandomAge()
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    // 添加类型守卫
    if (input) this.user.set({ name: input.value })
  }

  onSaveClick = (): void => {
    this.user.save()
  }

  template(): string {
    return `
        <div>
            <input placeholder='${this.user.get('name')}' />
            <button id='set-name'>Change Name</button>
            <button id='set-age'>Set Random Age</button>
            <button id='save-model'>Save</button>
        </div>
    `
  }
}
