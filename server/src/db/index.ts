import {CollectionWrapper, DBWrapper, User, DummyDb} from './types';

const users: CollectionWrapper<User> = {
  find: (id: string) => {
    return new Promise(resolve => {
      resolve([{name: id}])
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
