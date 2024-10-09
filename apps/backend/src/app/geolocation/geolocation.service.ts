import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../persistence/entities/address';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async searchForAddress(address: string): Promise<Address | null> {
    return this.addressRepository.findOneBy({
      value: address,
    });
  }

  async storeGeolocation(address: string, geolocation: { lat: number; long: number }): Promise<Address> {
    const newAddress = this.addressRepository.create({
      value: address,
      geolocation: this.getGeolocationPoint(geolocation.lat, geolocation.long), // Convert to POINT type
    });

    const record=await this.addressRepository.save(newAddress);
    record.extractCoordinates()

    return record
  }

  private getGeolocationPoint(lat: number, long: number): string {
    return `POINT(${long} ${lat})`; // Format for MySQL POINT
  }


}
