/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateDriver from "./CreateDriver";
import { Provider } from "./ioc/ioc.react";
import { Container, injectable } from "inversify";
import DriverGateway from "./infra/gateway/DriverGateway";
import Driver from "./domain/passenger/Driver";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("should be create a driver", async () => {
  @injectable()
  class DriverGatewayMock implements DriverGateway {
    async save(_driver: Driver): Promise<string> {
      return "f148868f-f100-4a1b-834c-952540ac53a0";
    }
  }

  const container = new Container();
  container.bind<DriverGateway>("driverGateway").to(DriverGatewayMock);

  const { user } = setup(
    <Provider container={container}>
      <CreateDriver />
    </Provider>
  );

  await user.type(screen.getByTestId("driver-name"), "John Doe");
  await user.type(screen.getByTestId("driver-email"), "john.doe@gmail.com");
  await user.type(screen.getByTestId("driver-document"), "69178409047");
  await user.type(screen.getByTestId("driver-car-plate"), "AAA9999");
  await user.click(screen.getByTestId("create-driver-button"));

  await waitFor(() => {
    expect(screen.queryByTestId("driver-id")?.textContent).toHaveLength(36);
  });
});
