
export type CreateTripDoc = (tripName: string, memberName: string) => Trip

export interface User {
  name: string
}

export interface Trip {
  _id: string,
  name: string,
  members: TripMember[]
}

export type RequireKeys<T, TNames extends keyof T> = T & { [P in keyof T]-?: P extends TNames ? T[P] : never }

export interface TripMember {
  name: string,
  expenses: Expense[]
}

export interface Expense {
  _id: string,
  amount: string
}

export interface DBWrapper {
  [key: string]: CollectionWrapper<any>
}

export interface CollectionWrapper<T> {
  find?: (...args: any) => Promise<T[]>,
  findOne: (...args: any) => Promise<T>,
  updateOne?: (filter: {_id: string}, doc: T) => Promise<T | null>,
  insertOne: (doc: T) => Promise<{insertedId: string}>
}

export interface DummyDb {
  connect: (options?: any) => Promise<DBWrapper>,
  getConnection: () => DBWrapper
}
