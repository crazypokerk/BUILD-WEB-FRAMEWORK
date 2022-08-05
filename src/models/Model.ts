import { AxiosPromise, AxiosResponse } from 'axios'

type ModelAttributes<T> = {
  set(value: T): void
  getAll(): T
  get<K extends keyof T>(key: K): T[K]
}

type Events = {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

type Sync<T> = {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

type HasId = {
  id?: number
}

export class Model<T extends HasId> {
  constructor(private attributes: ModelAttributes<T>, private events: Events, private sync: Sync<T>) {}

  on = this.events.on

  trigger = this.events.trigger

  get = this.attributes.get

  set(update: T) {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  fetch(): void {
    const id = this.get('id')
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id')
    }
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data)
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
  }
}
