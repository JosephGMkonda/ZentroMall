import { Controller,Get,Post,Body,Req,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { jwtAuthGuard } from './guards/jwt_auth.guard';



@Controller('auth')
export class AuthController {

constructor(private authService: AuthService){}

@Post('register')
register(@Body() dto: RegisterDTO){
    return this.authService.register(dto);
}

@Post('login')
Login(@Body() dto: LoginDTO){
    return this.authService.login(dto);
}

@UseGuards(jwtAuthGuard)
@Get('profile')
getProfile(@Req() req){
    return req.user;
}
}
