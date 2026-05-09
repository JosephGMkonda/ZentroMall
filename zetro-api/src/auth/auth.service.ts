import { 
    Injectable,
    BadRequestException,
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,

    ){}

    async register(dto: RegisterDTO){
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });

        if(userExists){
            throw new BadRequestException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword
            }

        });

        return this.generateToken(user);
    }


    async login(dto: LoginDTO){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if(!user){
            throw new UnauthorizedException('User with this email does not exist');
        }

        const passwordMatches = await bcrypt.compare(
            dto.password,
            user.password
        );

        if(!passwordMatches){
            throw new UnauthorizedException('Incorrect password');
        }

        return this.generateToken(user);

    }

    private async generateToken(user: any){
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        }
    }
}



