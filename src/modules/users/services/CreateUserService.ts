import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import appError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) throw new appError('E-mail already in use');
    const hashedPassword = await hash(password, 8);

    return userRepository.save({ name, email, password: hashedPassword });
  }
}

export default CreateUserService;
