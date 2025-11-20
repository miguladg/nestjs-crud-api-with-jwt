import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async register(registerDto: RegisterDto) {
    console.log('registro recibido', { username: registerDto.username, email: registerDto.email });
    
    const { username, email, password } = registerDto;

    console.log('verificando email', email);
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      console.log('email existe');
      throw new ConflictException('El email ya esta registrado');
    }
    console.log('email ok');

    // console.log('hashs contrasenia');
    const hashedPassword = await bcrypt.hash(password, 5);

    /// Falta poner un try catch ya que se rompe si hay un usuario duplicado
    /// tanto en username como en email

    console.log('guardando usuario');
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });
    // console.log('usuario guardado', { id: user.id });

    console.log('generando token');
    const payload = { sub: user.id, email: user.email, username: user.username };
    const token = this.jwtService.sign(payload);
    console.log('token generado');

    console.log('registro completado');
    return {
      message: 'Usuario registrado exitosamente',
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    
    const { email, password } = loginDto;

    console.log('buscando usuario', email);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      console.log('usuario no encontrado');
      throw new UnauthorizedException('Credenciales invalida');
    }
    console.log('usuario encontrado');

    console.log('verificando contraseña');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('contraseña invalida');
      throw new UnauthorizedException('Credenciales invalida');
    }
    // console.log('contrasenia ok');

    // console.log('generando token');
    const payload = { sub: user.id, email: user.email, username: user.username };
    const token = this.jwtService.sign(payload);
    console.log('token generado', );

    console.log('login completado');
    return {
      message: 'Login exitoso',
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async validateUser(userId: number) {
    console.log('validando usuario', userId);
    const user = await this.usersService.findById(userId);
    if (!user) {
      console.log('usuario no válido');
      return null;
    }
    console.log('usuario válido');
    return user;
  }
}
