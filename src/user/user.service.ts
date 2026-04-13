import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(registerDto: RegisterUserDto) {
    try {
      return await this.userModel.create({
        fname: registerDto.fname,
        lname: registerDto.lname,
        email: registerDto.email,
        password: registerDto.password,
      })
    } catch (error) {
      console.error('Error creating user: ', error);
      if ((error as any).code === 11000) { // MongoDB duplicate key error code
        // Extract the field that caused the duplicate key error
        // throw new ConflictException(`${Object.keys((error as any).keyPattern).join(', ')} ${registerDto.email} already exists`);

        // For simplicity, we can just mention the email field since it's the unique one
        throw new ConflictException(`${registerDto.email} already exists`);
      }
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
}
