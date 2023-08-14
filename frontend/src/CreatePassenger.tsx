import { useState } from "react";
import { useInjection } from "./ioc/ioc.react";
import PassengerGateway from "./infra/gateway/PassengerGateway";
import { PassengerBuilder } from "./domain/Passenger";

function CreatePassenger() {
  const [passengerId, setPassengerId] = useState("");
  const passengerBuilder = new PassengerBuilder();
  const passengerGateway = useInjection<PassengerGateway>("passengerGateway");
  const [error, setError] = useState("");

  async function createPassenger() {
    try {
      setError("");
      const passenger = passengerBuilder.build();
      passenger.passengerId = await passengerGateway.create(passenger);
      setPassengerId(passenger.passengerId);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <>
      <h1>Create Passenger</h1>
      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          data-testid="passenger-name"
          onChange={(e) => (passengerBuilder.name = e.target.value)}
        />
        <input
          name="email"
          type="text"
          placeholder="E-mail"
          data-testid="passenger-email"
          onChange={(e) => (passengerBuilder.email = e.target.value)}
        />
        <input
          name="document"
          type="text"
          placeholder="Dcoument"
          data-testid="passenger-document"
          onChange={(e) => (passengerBuilder.document = e.target.value)}
        />

        <div data-testid="error">{error}</div>

        <button data-testid="create-passenger-button" onClick={createPassenger}>
          Create passenger
        </button>
      </div>

      <div data-testid="passenger-id">{passengerId}</div>
    </>
  );
}

export default CreatePassenger;
