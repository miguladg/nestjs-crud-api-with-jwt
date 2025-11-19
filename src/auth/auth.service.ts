import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    console.log('[AuthService] Datos recibidos:', { username: registerDto.username, email: registerDto.email });
    
    const { username, email, password } = registerDto;

    // Verificar si el usuario ya existe
    console.log('Verificando si el email ya existe');
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      console.log('Email ya registrado');
      throw new ConflictException('El email ya está registrado');
    }
    console.log('email disponible');

    // Hashear la contraseña
    console.log('hasheando contraseña ');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[Contraseña hasheada');

    // Crear el usuario
    console.log('guardando usuario en base de dato');
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generar token JWT
    console.log('generando token jwt');
    const payload = { sub: user.id, email: user.email, username: user.username };
    const token = this.jwtService.sign(payload);
    console.log('token generado');

    console.log('REGISTRO COMPLETADO');
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
    console.log('ingreso con usuario');
    console.log('[AuthService] Email:', loginDto.email);
    
    const { email, password } = loginDto;

    // Buscar el usuario
    console.log('buscando usuario');
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      console.log('usuario no encontrado');
      throw new UnauthorizedException('Credenciales inválidas');
    }
    console.log('[Uasuario encontrado:', user.username);

    // Verificar la contraseña
    console.log('verificando contrasena...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('contraseña incorrecta');
      throw new UnauthorizedException('Credenciales inválidas');
    }
    console.log('contraseña correcta');

    // Generar token JWT
    console.log('generando token JWT');
    const payload = { sub: user.id, email: user.email, username: user.username };
    const token = this.jwtService.sign(payload);
    console.log('Token generado');

    console.log('LOGIN COMPLETADO');
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
    console.log('Lalidando usuario con id', userId);
    const user = await this.usersService.findById(userId);
    console.log('[AuthService] Resultado validación:', user ? 'Usuario válido' : 'Usuario no válido');
    return user;
  }
}
