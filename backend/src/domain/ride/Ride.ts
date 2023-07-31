import FareCalculatorHandler from "../fare/chain-of-responsability/FareCalculatorHandler";
import NormalFareCalculatorHandler from "../fare/chain-of-responsability/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../fare/chain-of-responsability/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../fare/chain-of-responsability/OvernightSundayFareCalculatorHandler";
import SundayFareCalculatorHandler from "../fare/chain-of-responsability/SundayFareCalculatorHandler";
import DistanceCalculator from "./../distance/DistanceCalculator";
import Position from "./Position";
import Segment from "./Segment";

export default class Ride {
	positions: Position[];
	MIN_PRICE = 10;
	fareCalculator: FareCalculatorHandler

	constructor() {
		this.positions = [];
		const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler()
		const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator)
		const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculator)
		this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator)
	}

	addPosition(lat: number, long: number, date: Date) {
		this.positions.push(new Position(lat, long, date));
	}

	calculate() {
		let price = 0;
		for (const [index, position] of this.positions.entries()) {
			const nextPosition = this.positions[index + 1];
			if (!nextPosition) break;
			const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
			const segment = new Segment(distance, nextPosition.date);
			price += this.fareCalculator.handle(segment)
		}
		return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
	}
}
