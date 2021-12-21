import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import appError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IUser {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IUser): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    if (!user)
      throw new appError(
        'E-mail or password invalid, please check your credentials!',
        401,
      );

    const validPassword = await compare(password, user.password);

    if (!validPassword)
      throw new appError(
        'E-mail or password invalid, please check your credentials!',
        401,
      );

    const token = sign({}, 'fbd1a2de46cfbc0262d478244dbd00c', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
