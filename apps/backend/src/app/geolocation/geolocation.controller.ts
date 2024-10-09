import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Search for geolocation data based on an address' })
  @ApiResponse({ status: 200, description: 'Geolocation data retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async searchLocation(@Body() input: GeolocationSearchInput) {
    const { address, email } = input;

    // Fetch geolocation data from the third-party API
    let geolocation = await this.geolocationService.searchForAddress(address);

    if (!geolocation) {
      // Handle case where geolocation is not found, e.g., throw an error or return a specific response
      return { message: 'Geolocation not found for the given address.' };
    }

    // Store the geolocation data in the database
    // await this.geolocationService.storeGeolocation(address, geolocation); // Implement this method in your service

    // If email is provided, dispatch a job to send an email
    // if (email) {
    //   await this.emailService.sendGeolocationEmail(email, geolocation); // Implement this method in your email service
    // }

    // Return only the geolocation
    return {
      geolocation
      // latitude: geolocation.latitude, // Adjust according to your geolocation object structure
      // longitude: geolocation.longitude, // Adjust according to your geolocation object structure
    };
  }
}
