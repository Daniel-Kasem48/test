import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

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

  async fetchGeoLocationFromThirdParty(addressAsString:string){
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressAsString)}&format=json`);
      if (response.data.length === 0) {
        throw new HttpException('No geolocation data found for the given address.',400);
      }

      const { lat, lon } = response.data[0]; // Get the first result
      const geolocation = { lat: lat, long: lon };
      return geolocation
  }

  private getGeolocationPoint(lat: number, long: number): string {
    return `POINT(${long} ${lat})`; // Format for MySQL POINT
  }


}
