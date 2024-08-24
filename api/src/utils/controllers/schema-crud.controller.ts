import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { SchemaCrudService } from '../services/schema-crud.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SchemaCrudType } from '../types/schema-crud.type';


export function SchemaCrudController<T>(
  options?: any
) {
  @Controller()
  @ApiTags('SchemaCrud')
  // Author: ZolaDo
  class SchemaCrudControllerHost {
    constructor(
      public readonly schemaCrudService: SchemaCrudService<T>, 
    ) { }

    @Post()
    @ApiBody({})
    async create(@Body() request: T) {
      const doc = await this.schemaCrudService.create(request)
      return await doc.save()
    }

    @Get()
    async findAll(){
      const doc = await this.schemaCrudService.findAll()
      return doc
    }

    @Get('/:id')
    async findOne(@Param('id') id: string){
      return await this.schemaCrudService.findOne(id)
    }

    @Put('/:id')
    @ApiBody({})
    async update(@Param('id') id: string, @Body() request: T){
      return await this.schemaCrudService.update(id, request)
    }

    @Delete('/:id')
    async delete(@Param('id') id: string){
      return await this.schemaCrudService.delete(id)
    }
  }
  return SchemaCrudControllerHost
}