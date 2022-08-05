import axios from 'axios'
import { Collection } from './models/Collection'
import { User, UserProps } from './models/User'
import { UserEdit } from './view/UserEidt'
import { UserForm } from './view/UserForm'

// const u = new User({ name: 'zs', age: 12 })

// const age = u.get('age')

// console.log(age)

// u.on('fuck', () => {
//   console.log('fuck')
// })

// u.on('cao', () => {
//   console.log('cao')
// })

// console.log(u)

// u.trigger('fucdsadask')

// axios.post('http://localhost:3000/users', {
//   name: 'asshole',
//   age: 188,
// })

// axios.get('http://localhost:3000/users')

// const u1 = new User({ id: 1 })

// u1.fetch()

// console.log(u1)

// const putUser = new User({ id: 1, name: 'putUser', age: 666 })
// const postUser = new User({ name: 'postUser', age: 888 })

// putUser.save()
// postUser.save()

// const user = new User({
//   id: 3,
//   name: 'Erik',
//   age: 18,
// })

// // user.attributes.set({ name: 'Erik', age: 888 })

// const newUser = {
//   id: user.attributes.get('id'),
//   name: user.attributes.get('name'),
//   age: user.attributes.get('age'),
// }

// console.log(newUser)

// user.on('change', () => {
//   console.log('change it!')
// })

// user.trigger('change')

// user.get('name')

// console.log(user)

// const user = new User({
//   id: 711,
//   name: '便利店',
//   age: 555,
// })

// user.on('change', () => {
//   console.log(`user info has been changed!!!`)
// })

// console.log(user.attributes)

// setTimeout(() => {
//   user.set({
//     name: '万象汇-便利店',
//     age: 666,
//   })
//   console.log(user.attributes)
// }, 2000)

// const user = new User({ id: 2 })
// user.on('change', () => {
//   console.log(user.attributes)
// })

// user.fetch()

// const user = new User({
//   name: '葡萄城',
//   age: 32,
// })

// user.on('save', () => {
//   console.log('user info is saving...')
// })

// user.save()

// const user = User.buildUser({
//   id: 3,
// })

// user.on('change', () => {
//   console.log(user)
// })

// user.fetch()

// const collection = new Collection('http://localhost:3000/users')

// collection.on('change', () => {
//   console.log(collection)
// })

// collection.fetch()

// const collection = User.buildCollection()

// collection.on('change', () => {
//   console.log(collection)
// })

// collection.fetch()

const user = User.buildUser({
  name: 'Nancy Pelosi',
  age: 82,
})

const root = document.getElementById('root')
if (root) {
  const userEdit = new UserEdit(root, user)
  userEdit.render()
  console.log(userEdit)
} else {
  throw new Error()
}
