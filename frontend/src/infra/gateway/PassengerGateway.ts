import Passenger from "../../domain/Passenger";

export type CreatePassengerInput = {
  name: string
  email: string
  document: string
}

export default interface PassengerGateway {
  create(passenger: Passenger): Promise<string>
}