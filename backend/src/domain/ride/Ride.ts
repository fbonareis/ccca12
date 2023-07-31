import Coord from '../distance/Coord'
import FareCalculatorHandler from '../fare/chain-of-responsability/FareCalculatorHandler'
import NormalFareCalculatorHandler from '../fare/chain-of-responsability/NormalFareCalculatorHandler'
import OvernightFareCalculatorHandler from '../fare/chain-of-responsability/OvernightFareCalculatorHandler'
import OvernightSundayFareCalculatorHandler from '../fare/chain-of-responsability/OvernightSundayFareCalculatorHandler'
import SundayFareCalculatorHandler from '../fare/chain-of-responsability/SundayFareCalculatorHandler'
import UUIDGenerator from '../identity/UUIDGenerator'
import DistanceCalculator from './../distance/DistanceCalculator'
import Position from './Position'
import Segment from './Segment'

export default class Ride {
  positions: Position[]
  MIN_PRICE = 10
  fareCalculator: FareCalculatorHandler
  driverId?: string
  acceptDate?: Date
  startDate?: Date
  endDate?: Date

  constructor(readonly rideId: string, readonly passengerId: string, readonly from: Coord, readonly to: Coord, public status: string, readonly requestDate: Date) {
    this.positions = []
    const overnightSundayFareCalculator =
      new OvernightSundayFareCalculatorHandler()
    const sundayFareCalculator = new SundayFareCalculatorHandler(
      overnightSundayFareCalculator,
    )
    const overnightFareCalculator = new OvernightFareCalculatorHandler(
      sundayFareCalculator,
    )
    this.fareCalculator = new NormalFareCalculatorHandler(
      overnightFareCalculator,
    )
  }

  addPosition(lat: number, long: number, date: Date) {
    this.positions.push(new Position(lat, long, date))
  }

  calculate() {
    let price = 0
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1]
      if (!nextPosition) break
      const distance = DistanceCalculator.calculate(
        position.coord,
        nextPosition.coord,
      )
      const segment = new Segment(distance, nextPosition.date)
      price += this.fareCalculator.handle(segment)
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : price
  }

  accept(driverId: string, date: Date) {
    this.driverId = driverId
    this.status = "accepted"
    this.acceptDate = date
  }

  start(date: Date) {
    this.status = 'in_progress'
    this.startDate = date
  }

  end(date: Date) {
    this.status = 'completed'
    this.endDate = date
  }

  static create(passenderId: string, from: Coord, to: Coord, requestDate: Date = new Date()) {
    const riderId = UUIDGenerator.create()
    const status = "requested"
    return new Ride(riderId, passenderId, from, to, status, requestDate)
  }
}
