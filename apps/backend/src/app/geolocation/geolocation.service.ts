import { Injectable } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../persistence/entities/address';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {
  }

  searchForAddress(address:string){
    return this.addressRepository.findOneBy({
      value:address
    })
  }


}
