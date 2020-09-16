import {CollectionWrapper, DBWrapper, User, DummyDb} from './types';

// Define in-memory variables for dummy DB
const Users: User[] = [{name: 'glen'}, {name: 'sophia'}, {name: 'corey'}]

const users: CollectionWrapper<User> = {
  findOne: (query: {[key: string]: string}) => {
    const {name} = query
    return new Promise(resolve => {
      const user = Users.find(x => x.name === name)
      resolve(user)
    })
  },
  insertOne: (user) => {
    return new Promise(resolve => {
      Users.push(user)
      resolve(true)
    })
  }
}

const dbWrapper: DBWrapper = {
  users
}

let connection: DBWrapper | null

const db: DummyDb = {
  connect: () => {
    return new Promise(resolve => {
      connection = dbWrapper
      resolve(dbWrapper)
    })
  },
  getConnection: () => {
    if (!connection) { throw new Error('no connection') }
    return connection
  }
}

export default db
