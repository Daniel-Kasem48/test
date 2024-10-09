import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import axios from 'axios'; // Import Axios

import { GeolocationSearchInput } from './inputs/geolocation-search.input';
import { GeolocationService } from './geolocation.service';
// import { EmailService } from './email.service'; // Assuming you have an EmailService for sending emails

@ApiTags('Geolocation')
@Controller('geolocation')
export class GeolocationController {
  constructor(
    private readonly geolocationService: GeolocationService,
    // private readonly emailService: EmailService, // Injecting the EmailService
  ) {}

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Search for geolocation data based on an address' })
  @ApiResponse({ status: 200, description: 'Geolocation data retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async searchLocation(@Body() input: GeolocationSearchInput) {
    const { address, email } = input;

    // Fetch geolocation data from the database
    const addressRecord = await this.geolocationService.searchForAddress(address);

    // If geolocation exists in the database, return lat and long
    if (addressRecord) {
      return { latitude: addressRecord.latitude, longitude: addressRecord.longitude };
    }

    try {
      // Fetch geolocation data from the Nominatim API
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);

      if (response.data.length === 0) {
        throw new Error('No geolocation data found for the given address.');
      }

      const { lat, lon } = response.data[0]; // Get the first result
      const geolocation = { lat: lat, long: lon };

      // Store the geolocation data in the database
      const newAddress = await this.geolocationService.storeGeolocation(address, geolocation);

      return { latitude: newAddress.latitude, longitude: newAddress.longitude };
    } catch (e) {
      console.error(e);
      throw new Error('Could not store geolocation data or fetch from API'); // Handle this error appropriately
    }

    // If email is provided, dispatch a job to send an email
    // if (email) {
    //   await this.emailService.sendGeolocationEmail(email, geolocation); // Implement this method in your email service
    // }
  }
}
