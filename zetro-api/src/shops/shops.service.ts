import { ForbiddenException, Injectable,NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateShopDto } from "./create-shops.dto";
import { UpdateShopsDto } from "./update-shops.dto";
import { identity } from "rxjs";


@Injectable()
export class ShopsService {
    constructor(private prisma: PrismaService){}

    async createShop(userId: string,dto: CreateShopDto){
        return this.prisma.shop.create({
            data: {
                name: dto.name,
                description: dto.description,
                ownerId: userId
            }
        })

    }

    async findAllShops(){
        return this.prisma.shop.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        
                    }
                }
            }
        })
    }

    async findOne(shopId: string){
        
        const shop = await this.prisma.shop.findUnique({
            where: {
                id: shopId
            },

            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        
                    }
                },

               products: true
            }
        })

        if(!shop){
            throw new NotFoundException('The shop with the given ID was not found');
        }
        return shop;
    }



    async updateShop(userId: string,shopId: string,dto: UpdateShopsDto){

        const shop = await this.prisma.shop.findUnique({
            where: {
                id: shopId

            }
        })
        if(!shop){
            throw new NotFoundException('The shop with the given ID was not found');
        }

        if(shop.ownerId !== userId){
            throw new ForbiddenException('You are not allowed to update this shop');
        }

        return this.prisma.shop.update({
            where: {
                id: shopId,
            },
            data: dto

        })
    }

    async deleteShop(userId: string,shopId: string){

        const shop = await this.prisma.shop.findUnique({
            where: {
                id: shopId
            }
        })

        if(!shop){
            throw new NotFoundException('The shop with the given ID was not found');
        }

        if(shop.ownerId !== userId){
            throw new ForbiddenException('You are not allowed to delete this shop');
        }

        await this.prisma.shop.delete({
            where:{
                id: shopId
            }
        })

        return {
            message: 'Shop deleted successfully'
        }
    }
}