import Ride from '../../domain/ride/Ride'

type Input = {
  positions: { lat: number; long: number; date: Date }[]
}

type Output = {
  price: number
}

export default class CalculateRide {
  async execute(input: Input): Promise<Output> {
    const ride = new Ride()
    for (const position of input.positions) {
      ride.addPosition(position.lat, position.long, new Date(position.date))
    }
    const price = ride.calculate()
    return {
      price,
    }
  }
}
