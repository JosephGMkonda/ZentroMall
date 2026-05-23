import { Controller, Body, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './create-shops.dto';
import { UpdateShopsDto } from './update-shops.dto';
import { jwtAuthGuard } from '../auth/guards/jwt_auth.guard';


@Controller('shops')
export class ShopsController {
    constructor(private shopsService: ShopsService){}

    @UseGuards(jwtAuthGuard)
    @Post()
    createShop(@Req() req: any,  @Body() dto: CreateShopDto) {
        return this.shopsService.createShop(req.user.id, dto);
}

    @Get()
    finsAllShops(){
        return this.shopsService.findAllShops();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.shopsService.findOne(id);
    }

    @UseGuards(jwtAuthGuard)
    @Patch(':id')
    updateShop(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateShopsDto){
        return this.shopsService.updateShop(req.user.sub, id, dto);
    }

    @UseGuards(jwtAuthGuard)
    @Delete(':id')
    deleteShop(@Req() req: any, @Param('id') id: string){
        return this.shopsService.deleteShop(req.user.sub, id);
    }
}
