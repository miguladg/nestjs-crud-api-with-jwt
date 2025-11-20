import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
    console.log('estrategia JWT inicializada');
  }

  async validate(payload: any) {
    console.log('validando token', 'payload:', payload);
    
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      console.log('usuario no valido');
      throw new UnauthorizedException();
    }
    
    console.log('usuario validado:', user.username);
    return user;
  }
}
