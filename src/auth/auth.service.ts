import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

let saltRounds: number = 10;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  /**
   * Logic for User Registration
   * 1. Check the user email exists
   * 2. Hash the password
   * 3. Store the user details in the db
   * 4. Generate a JWT token
   * 5. Send token in the response
  */

  async registerUser(registerDto: RegisterUserDto): Promise<object> {
    let hash: string = await bcrypt.hash(registerDto.password, saltRounds)
    const createdUser = await this.userService.createUser({ ...registerDto, password: hash });
    console.log('createdUser:: ', createdUser);
    return {}
  }
}
