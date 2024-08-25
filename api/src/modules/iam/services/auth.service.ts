//auth.service.ts
import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from '../dtos/register.dto';
import { AccountService } from './account.service';
import { Account, AccountDocument, User, UserDocument } from 'src/schemas';
import { ERole } from 'src/utils/enums/account.enum';
import { UserService } from './user.service';
import mongoose, { Model, Types } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
    @InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>, 
    private jwtService: JwtService,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const account = await this.accountService.findAccountWithUser(loginDto.username)

    if(!account)
        throw new UnauthorizedException()

    const isValid = await bcrypt.compareSync(loginDto.password, account.password)

    if(!isValid)
        throw new UnauthorizedException()

    const payload = { username: loginDto.username, id: account.id };
    const token = this.jwtService.sign(payload)

    return { token  };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const [account, existingUser] = await this.accountService.findUserAndAccount(registerDto.username, registerDto.phoneNumber);
      if (account) { 
        throw new BadRequestException('Email already exists');
      }

      // TODO: Phone Number Authentication

      if (!existingUser) {
        const newUser: Partial<UserDocument> = { 
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          email: registerDto.email,
          phoneNumber: registerDto.phoneNumber,
          role: ERole.USER,
        };

        const createdUser = await this.userModel.create([newUser], { session: transactionSession });
        registerDto.userId = createdUser[0]._id as any;
      } else {
        registerDto.userId = existingUser._id as any;
      }

      const salt: string = bcrypt.genSaltSync(12);
      const hashedPassword = await bcrypt.hash(registerDto.password, salt);

      const newAccount: Partial<AccountDocument> = { 
        ...registerDto, 
        password: hashedPassword,
      };

      await this.accountModel.create([newAccount], { session: transactionSession});

      await transactionSession.commitTransaction();
      transactionSession.endSession();

      return await this.login({ username: registerDto.username, password: registerDto.password });
    } catch (error) {
      await transactionSession.abortTransaction();
      transactionSession.endSession();
      throw error;
    }
  }
}