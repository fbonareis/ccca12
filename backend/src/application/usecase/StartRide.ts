import RideRepository from "../repository/RideRepository"

type Input = {
  rideId: string,
  date: Date
}

export default class StartRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId)
    ride.start(input.date)
    return this.rideRepository.update(ride)
  }
}