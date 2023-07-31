import Cpf from "./../person/Cpf";
import Email from "./../person/Email";
import UUIDGenerator from "./../identity/UUIDGenerator";
import CarPlate from "./CarPlate";

export default class Driver {
	document: Cpf;
	email: Email;
	carPlate: CarPlate;

	constructor(readonly driverId: string, readonly name: string, email: string, document: string, carPlate: string) {
		this.document = new Cpf(document);
		this.email = new Email(email);
		this.carPlate = new CarPlate(carPlate);
	}

	static create(name: string, email: string, document: string, carPlate: string) {
		const driverId = UUIDGenerator.create();
		return new Driver(driverId, name, email, document, carPlate);
	}

}
