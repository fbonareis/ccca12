import { Container } from 'inversify';
import DriverGatewayHttp from '../infra/gateway/DriverGatewayHttp';
import DriverGateway from '../infra/gateway/DriverGateway';
import PassengerGateway from '../infra/gateway/PassengerGateway';
import PassengerGatewayHttp from '../infra/gateway/PassengerGatewayHttp';
import HttpClient from '../infra/http/HttpClient';
// import AxiosAdapter from '../infra/http/AxiosAdapter';
import FetchAdapter from '../infra/http/FetchAdapter';

export const container = new Container();

container.bind<HttpClient>('httpClient').to(FetchAdapter)
container.bind<DriverGateway>('driverGateway').to(DriverGatewayHttp)
container.bind<PassengerGateway>('passengerGateway').to(PassengerGatewayHttp)