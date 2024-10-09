import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import axios from 'axios';

import { GeolocationSearchInput } from './inputs/geolocation-search.input';
import { GeolocationService } from './geolocation.service';
import { MailSenderService } from '../mail/mail-sender.service';
import { GeolocationSearchResultMailTemplate } from '../mail/templates';

@ApiTags('Geolocation')
@Controller('geolocation')
export class GeolocationController {
  constructor(
    private readonly geolocationService: GeolocationService,
    private readonly mailSenderService: MailSenderService,
  ) {}

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Search for geolocation data based on an address' })
  @ApiResponse({ status: 200, description: 'Geolocation data retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async searchLocation(@Body() input: GeolocationSearchInput) {
    const { address, email } = input;

    const addressRecord = await this.geolocationService.searchForAddress(address);

    if (addressRecord) {
      if (email) {
        const mail=new GeolocationSearchResultMailTemplate(email,addressRecord.value,addressRecord.latitude,addressRecord.longitude);
        await this.mailSenderService.dispatch(mail);
      }
      return { latitude: addressRecord.latitude, longitude: addressRecord.longitude };
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);

      if (response.data.length === 0) {
        throw new Error('No geolocation data found for the given address.');
      }

      const { lat, lon } = response.data[0]; // Get the first result
      const geolocation = { lat: lat, long: lon };

      const addressRecord = await this.geolocationService.storeGeolocation(address, geolocation);

      if (email) {
        const mail=new GeolocationSearchResultMailTemplate(email,addressRecord.value,addressRecord.latitude,addressRecord.longitude);
        await this.mailSenderService.dispatch(mail);
      }

      return { latitude: addressRecord.latitude, longitude: addressRecord.longitude };
    } catch (e) {
      console.error(e);
      throw new Error('Could not store geolocation data or fetch from API'); // Handle this error appropriately
    }

  }
}
