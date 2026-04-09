import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
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
  async register(@Body() registerDto: RegisterUserDto) {
    // Register logic here
    return await this.authService.registerUser(registerDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    // Profile logic here
    // console.log('Profile route accessed', req.user); // This will log the user information extracted from the JWT token
    return req.user; // This will return the user information extracted from the JWT token
  }
}
