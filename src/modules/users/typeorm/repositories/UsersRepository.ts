import { EntityRepository, Repository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public findByName(name: string): Promise<User | undefined> {
    return this.findOne({ where: { name } });
  }

  public findById(id: string): Promise<User | undefined> {
    return this.findOne({ where: { id } });
  }

  public findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }
}

export default UsersRepository;
