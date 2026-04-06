import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  // Using constructor shorthand to inject the AuthService
  constructor(private readonly authService: AuthService) { }

  // Alternative way to inject the service without using constructor shorthand
  // authService: AuthService;
  // constructor(authService: AuthService){
  //   this.authService = authService;
  // }

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    // Register logic here
    return this.authService.registerUser(registerDto);
  }
}
