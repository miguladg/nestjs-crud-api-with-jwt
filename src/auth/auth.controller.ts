import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('controlador de autenticación inicializado');
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    console.log('Body:', registerDto);
    
    const result = await this.authService.register(registerDto);
    console.log('Respuesta enviada, parte del post donde se confirma');
    
    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
  //  console.log('post/auth/login');
    console.log('[AuthController] Email:', loginDto.email);
    
    const result = await this.authService.login(loginDto);
    
    console.log('respuesta enviada');
    
    return result;
  }
}
