export interface User {
  name: string
}

export interface Trip {
  _id: string,
  name: string,
  members: TripMember[]
}

export interface TripMember {
  name: string,
  expenses: string[]
}

export interface DBWrapper {
  [key: string]: CollectionWrapper<any>
}

export interface CollectionWrapper<T> {
  find?: (...args: any) => Promise<[T]>,
  findOne: (...args: any) => Promise<T>,
  updateOne?: () => Promise<T>,
  insertOne: (doc: T) => Promise<boolean>
}

export interface DummyDb {
  connect: (options?: any) => Promise<DBWrapper>,
  getConnection: () => DBWrapper
}
