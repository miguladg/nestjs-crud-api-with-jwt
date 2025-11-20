import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // console.log('controlador auth inicializado');
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  
  async register(@Body() registerDto: RegisterDto) {
    console.log('registro recibido', { username: registerDto.username, email: registerDto.email });
    
    const result = await this.authService.register(registerDto);
    // console.log('registro enviado');
    
    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    //  console.log('post/auth/login');
    // console.log('login recibido', loginDto.email);
    
    const result = await this.authService.login(loginDto);
    
    // console.log('login enviado');
    
    return result;
  }
}
