import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

let saltRounds: number = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * Logic for User Registration
   * 1. Check the user email exists - done
   * 2. Hash the password - done
   * 3. Store the user details in the db - done
   * 4. Generate a JWT token - done
   * 5. Send token in the response - done
  */

  async registerUser(registerDto: RegisterUserDto): Promise<object> {
    let hash: string = await bcrypt.hash(registerDto.password, saltRounds)
    const createdUser = await this.userService.createUser({
      ...registerDto,
      password: hash
    });
    let token = await this.jwtService.signAsync({ email: createdUser.email, id: createdUser._id, role: createdUser.role });
    return { ...createdUser.toObject(), token };
  }
}
