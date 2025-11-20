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
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
    console.log('estrategia jwt inicializada');
  }

  async validate(payload: any) {
    console.log('validando token', payload);
    
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      console.log('usuario no válido');
      throw new UnauthorizedException();
    }
    
    console.log('usuario válido');
    return user;
  }
}
