import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

class ListUserService {
  public execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    return userRepository.find();
  }
}

export default ListUserService;
