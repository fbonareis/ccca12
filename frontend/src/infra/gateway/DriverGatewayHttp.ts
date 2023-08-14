import { inject, injectable } from 'inversify';
import DriverGateway from './DriverGateway';
import type HttpClient from '../http/HttpClient';
import Driver from '../../domain/passenger/Driver';

@injectable()
export default class DriverGatewayHttp implements DriverGateway {
  constructor(@inject('httpClient') readonly httpClient: HttpClient) { }

  async save(driver: Driver) {
    const driverDate = await this.httpClient.post("http://localhost:3000/drivers", driver);
    return driverDate.driverId
  }
}