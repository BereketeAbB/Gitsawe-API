import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SchemaCrudService<T>  {
  constructor(
    private readonly document: Model<T>, 
  ) { }

  async create(itemData: any) {
    const doc = await this.document.create(itemData)
    return await doc.save()
  }

  async findAll(){
    const doc = await this.document.find()
    return doc
  }

  async findOne(id: string){
    const doc = await this.document.findById(id)
    return doc
  }

  async update(id: string, itemData: any){
    const doc = await this.document.findByIdAndUpdate(id
      , itemData, { new: true })
    return doc
  }

  async delete(id: string){
    const doc = await this.document.findByIdAndDelete(id)
    return doc
  }

}