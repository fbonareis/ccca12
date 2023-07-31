import DatabaseConnection from './DatabaseConnection'
import pgp from 'pg-promise'

// Frameworks and Drivers
export default class PgPromiseAdapter implements DatabaseConnection {
  private connection: any

  constructor() {
    this.connection = pgp()(
      'postgres://postgres:mysecret@localhost:5432/cccat12',
    )
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}
