import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';

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
    let access_token = await this.jwtService.signAsync({ email: createdUser.email, id: createdUser._id, role: createdUser.role });
    // return { ...createdUser.toObject(), access_token };
    return { access_token };
  }


  /**
   * Logic for User Login
   * 1. Check the user email exists - done
   * 2. Compare the password with the hashed password stored in the db - done
   * 3. If password matches, generate a JWT token - done
   * 4. Send token in the response - done
   * 5. If email does not exist or password does not match, throw an error - done
  */
  async loginUser(loginDto: LoginUserDto): Promise<object> {
    const userDetail = await this.userService.findUserByEmail(loginDto.email);
    if (!userDetail) {
      throw new ConflictException('Invalid email or password');
    }
    let isMatch = await bcrypt.compare(loginDto.password, userDetail.password);
    if (!isMatch) {
      throw new ConflictException('Invalid email or password');
    }
    let access_token = await this.jwtService.signAsync({ email: userDetail.email, id: userDetail._id, role: userDetail.role });
    return { access_token };
  }
}
