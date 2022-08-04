import { AxiosPromise, AxiosResponse } from 'axios'

type ModelAttributes<T> = {
  set(value: T): void
  getAll(): T
  get<K extends keyof T>(key: K): T[K]
}

type Eventing = {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

type ApiSync<T> = {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

type HasId = {
  id?: number
}

export class Model<T extends HasId> {
  constructor(private attributes: ModelAttributes<T>, private events: Eventing, private sync: ApiSync<T>) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

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
    const newAttr = this.attributes.getAll()
    this.sync
      .save(newAttr)
      .then((response: AxiosResponse) => {
        this.trigger('save')
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
