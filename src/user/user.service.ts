import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(registerDto: RegisterUserDto) {
    // console.log('registerDto:: ', registerDto);
    return await this.userModel.create({
      fname: registerDto.fname,
      lname: registerDto.lname,
      email: registerDto.email,
      password: registerDto.password,
    })
    // return {
    //   message: 'User Create Succesfully'
    // }
  }
}
