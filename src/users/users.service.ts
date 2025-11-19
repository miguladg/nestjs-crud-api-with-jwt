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
    console.log('Servicio inicializado');
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('Buscando email:', email);
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('Resultado:', user ? `Usuario encontrado: ${user.username}` : 'Usuario no encontrado');
    return user;
  }

  async findById(id: number): Promise<User | null> {
    console.log('Buscando usuario por ID:', id);
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('[UsersService] Resultado:', user ? `Usuario encontrado: ${user.username}` : 'Usuario no encontrado');
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    console.log('Creando nuevo usuario:', { username: userData.username, email: userData.email });
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    console.log('Usuario creado exitosamente:', { id: savedUser.id, username: savedUser.username });
    return savedUser;
  }
}
