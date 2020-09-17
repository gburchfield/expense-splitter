import {CollectionWrapper, DBWrapper, User, DummyDb, Trip} from './types';

// Define in-memory variables for dummy DB
const Users: User[] = [{name: 'glen'}, {name: 'sophia'}, {name: 'corey'}]
const Trips: Trip[] = []

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
      resolve({insertedId: user.name})
    })
  }
}

const trips: CollectionWrapper<Trip> = {
  find: (query: {name: string}) => {
    return new Promise(resolve => {
      const result = Trips.filter(x => {
        let hasUser = false
        x.members.forEach(y => hasUser = hasUser || y.name === query.name)
        return hasUser
      })
      resolve(result)
    })
  },
  findOne: (query: {_id: string}) => {
    const {_id} = query
    return new Promise( resolve => {
      const trip = Trips.find(x => x._id === _id)
      resolve(trip)
    })
  },
  insertOne: (trip) => {
    return new Promise(resolve => {
      Trips.push(trip)
      resolve({insertedId: trip._id})
    })
  },
  updateOne: (filter, newDoc) => {
    return new Promise(resolve => {
      let index = -1
      Trips.forEach((x, i) => {
        if (x._id === filter._id){
          index = i
        }
      })
      if (index >= 0){
        Trips[index] = newDoc
        resolve(newDoc)
      } else {
        resolve(null)
      }
    })
  }
}

const dbWrapper: DBWrapper = {
  users,
  trips
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
