import {
  AfterLoad,
  Column,
  Entity
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Address extends BaseEntity {
  @Column({length:"255"})
  value: string;

  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326, // This specifies that you're using the WGS 84 coordinate system (standard for GPS)
  })
  geolocation: string

  latitude:string
  longitude:string

  @AfterLoad()
  extractCoordinates() {
    const coordinates = this.geolocation.replace('POINT(', '').replace(')', '').split(' ');
    this.longitude=coordinates[0]
    this.latitude=coordinates[1]
  }
}


