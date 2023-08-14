import { useState } from "react";
import { useInjection } from "./ioc/ioc.react";
import DriverGateway from "./infra/gateway/DriverGateway";
import Driver from "./domain/Driver";

function CreateDriver() {
  const [driverId, setDriverId] = useState("");
  const [driver, setDriver] = useState(new Driver("", "", "", "", ""));

  const driverGateway = useInjection<DriverGateway>("driverGateway");

  async function createDriver() {
    const id = await driverGateway.save(driver);
    setDriverId(id);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriver((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1>Create Driver</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          data-testid="driver-name"
          value={driver.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="E-mail"
          data-testid="driver-email"
          value={driver.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Document"
          data-testid="driver-document"
          value={driver.document}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Car Plate"
          data-testid="driver-car-plate"
          value={driver.carPlate}
          onChange={handleChange}
        />

        <button data-testid="create-driver-button" onClick={createDriver}>
          Create driver
        </button>
      </div>

      <div data-testid="driver-id">{driverId}</div>
    </>
  );
}

export default CreateDriver;
