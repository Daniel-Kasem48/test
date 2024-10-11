import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GeolocationSearchInput } from './inputs/geolocation-search.input';
import { GeolocationService } from './geolocation.service';
import { MailSenderService } from '../mail/mail-sender.service';
import { GeolocationSearchResultMailTemplate } from '../mail/templates';
import { GeolocationSearchResultDto } from './dto/geolocation-search-result.dto';

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
    const { address: addressAsString, email } = input;

  let addressRecord = await this.geolocationService.searchForAddress(addressAsString);

  let responseToSend:GeolocationSearchResultDto
  if (addressRecord) {
    responseToSend={ latitude: addressRecord.latitude, longitude: addressRecord.longitude }
  }

  else {
    const geolocationPoint=await this.geolocationService.fetchGeoLocationFromThirdParty(addressAsString)

    addressRecord = await this.geolocationService.storeGeolocation(addressAsString, geolocationPoint);

    responseToSend={ latitude: addressRecord.latitude, longitude: addressRecord.longitude }
  }

  if (email) {
    const mail=new GeolocationSearchResultMailTemplate(email,addressRecord.value,addressRecord.latitude,addressRecord.longitude);
    await this.mailSenderService.dispatch(mail);
  }

  return responseToSend
  }
}
