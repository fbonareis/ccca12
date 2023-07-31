import PassengerRepository from '../repository/PassengerRepository'
import Passenger from '../../domain/passenger/Passenger'

type Input = {
  name: string
  email: string
  document: string
}

type Output = {
  passengerId: string
}

export default class CreatePassenger {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly passengerRepository: PassengerRepository) { }

  async execute(input: Input): Promise<Output> {
    const passenger = Passenger.create(input.name, input.email, input.document)
    await this.passengerRepository.save(passenger)
    return {
      passengerId: passenger.passengerId,
    }
  }
}
