import { getDatabase } from 'firebase-admin/database';

export default class UserService {
  public async getUser(id: string) {
    try {
      const userRecord = await getDatabase().ref(`/users/${id}`).once('value');
      return userRecord.val();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
