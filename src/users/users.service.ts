import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // console.log('Servicio inicializado');
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('Buscando email:', email);
    const user = await this.userRepository.findOne({ where: { email } });
    //// poner try catch, ya que si no encuentra el email debe decir poque
    return user;
  }

  async findById(id: number): Promise<User | null> {
    console.log('Buscando usuario por ID:', id);
    const user = await this.userRepository.findOne({ where: { id } });
    console.log( `Usuario : ${user.username}`);
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    console.log('Creando nuevo usuario:', { username: userData.username, email: userData.email });
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
}
