import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SchemaCrudService } from "../services/schema-crud.service";
import { ApiBody } from "@nestjs/swagger";

@Controller()
export class SchemaCrudController<T> {
    constructor(
        private readonly service: SchemaCrudService<T>
    ){}

    @Get()
    // @ApiBody({type: () => T})
    async findAll(){
        return await this.service.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id: string){
        return await this.service.findById(id)
    }

    @Get('list/:parentId')
    async findChildren(@Param('parentId') parentId: string){
        return await this.service.findChildren(parentId)
    }

    @Post()
    async create(@Body() itemData: Partial<T>){
        return await this.service.create(itemData)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() itemData: Partial<T>){
        return await this.service.update(id, itemData)
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return await this.service.delete(id)
    }
}