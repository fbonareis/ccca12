import RideRepository from '../../application/repository/RideRepository'
import Coord from '../../domain/distance/Coord'
import Ride from '../../domain/ride/Ride'
import DatabaseConnection from '../database/DatabaseConnection'

export default class RideRepositoryDatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) { }

  async save(ride: Ride) {
    await this.connection.query(
      'insert into ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) values ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        ride.rideId,
        ride.passengerId,
        ride.from.lat,
        ride.from.long,
        ride.to.lat,
        ride.to.long,
        ride.status,
        ride.requestDate
      ],
    )
  }

  async get(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query(
      'select * from ride where ride_id = $1',
      [rideId],
    )
    const ride = new Ride(rideData.ride_id,
      rideData.passender_id,
      new Coord(rideData.from_lat, rideData.from_long),
      new Coord(rideData.to_lat, rideData.to_long),
      rideData.status,
      rideData.request_date)

    ride.driverId = rideData.driver_id
    ride.acceptDate = rideData.accept_date
    ride.startDate = rideData.start_date
    ride.endDate = rideData.end_date

    return ride
  }

  async update(ride: Ride): Promise<void> {
    await this.connection.query("update ride set driver_id = $1, status = $2, accept_date = $3, start_date = $4, end_date = $5 where ride_id = $6",
      [ride.driverId, ride.status, ride.acceptDate, ride.startDate, ride.endDate, ride.rideId]
    );
  }
}
