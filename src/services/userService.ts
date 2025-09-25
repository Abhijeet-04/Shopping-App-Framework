import { db } from '../loaders/postgres';

export default class UserService {
  public async getUser(id: string) {
    try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
