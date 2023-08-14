import Driver from "../../domain/passenger/Driver";

export default interface DriverGateway {
  save(driver: Driver): Promise<string>
}