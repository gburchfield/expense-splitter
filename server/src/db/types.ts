export interface User {
  name: string
}

export interface DBWrapper {
  [key: string]: CollectionWrapper<any>
}

export interface CollectionWrapper<T> {
  find: (...args: any) => Promise<[T]>,
  findOne?: () => Promise<T>,
  UpdateOne?: () => Promise<T>
}

export interface DummyDb {
  connect: (options?: any) => Promise<DBWrapper>,
  getConnection: () => DBWrapper
}
