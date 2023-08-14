import { inject, injectable } from 'inversify';
import PassengerGateway, { CreatePassengerInput } from './PassengerGateway';
import type HttpClient from '../http/HttpClient';
import Passenger from '../../domain/Passenger';

@injectable()
export default class PassengerGatewayHttp implements PassengerGateway {
  constructor(@inject('httpClient') readonly httpClient: HttpClient) { }

  async create({ name, email, document }: Passenger) {
    const input: CreatePassengerInput = {
      name: name.getValue(),
      email: email.getValue(),
      document: document.getValue()
    }
    const { passengerId } = await this.httpClient.post("http://localhost:3000/passengers", input);
    return passengerId
  }
}