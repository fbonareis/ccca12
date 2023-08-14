/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePassenger from "./CreatePassenger";
import { Container, injectable } from "inversify";
import PassengerGateway from "./infra/gateway/PassengerGateway";
import { Provider } from "./ioc/ioc.react";
import Passenger from "./domain/Passenger";

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("should be create a passenger", async () => {
  @injectable()
  class PassengerGatewayMock implements PassengerGateway {
    async create(_: Passenger): Promise<string> {
      return "f148868f-f100-4a1b-834c-952540ac53a0";
    }
  }

  const container = new Container();
  container.bind<PassengerGateway>("passengerGateway").to(PassengerGatewayMock);

  const { user } = setup(
    <Provider container={container}>
      <CreatePassenger />
    </Provider>
  );

  await user.type(screen.getByTestId("passenger-name"), "John Doe");
  await user.type(screen.getByTestId("passenger-email"), "john.doe@gmail.com");
  await user.type(screen.getByTestId("passenger-document"), "69178409047");
  await user.click(screen.getByTestId("create-passenger-button"));

  await waitFor(() => {
    expect(screen.queryByTestId("passenger-id")?.textContent).toHaveLength(36);
  });
});

test("should be not create a invalid passenger", async () => {
  @injectable()
  class PassengerGatewayMock implements PassengerGateway {
    async create(_: Passenger): Promise<string> {
      return "f148868f-f100-4a1b-834c-952540ac53a0";
    }
  }

  const container = new Container();
  container.bind<PassengerGateway>("passengerGateway").to(PassengerGatewayMock);

  const { user } = setup(
    <Provider container={container}>
      <CreatePassenger />
    </Provider>
  );

  await user.type(screen.getByTestId("passenger-name"), "John");
  await user.type(screen.getByTestId("passenger-email"), "john.doe@gmail.com");
  await user.type(screen.getByTestId("passenger-document"), "69178409047");
  await user.click(screen.getByTestId("create-passenger-button"));

  expect(screen.getByTestId("error")).toHaveTextContent("Invalid name");
});

test("should be not create a passenger with email invalid", async () => {
  @injectable()
  class PassengerGatewayMock implements PassengerGateway {
    async create(_: Passenger): Promise<string> {
      return "f148868f-f100-4a1b-834c-952540ac53a0";
    }
  }

  const container = new Container();
  container.bind<PassengerGateway>("passengerGateway").to(PassengerGatewayMock);

  const { user } = setup(
    <Provider container={container}>
      <CreatePassenger />
    </Provider>
  );

  await user.type(screen.getByTestId("passenger-name"), "John Doe");
  await user.type(screen.getByTestId("passenger-email"), "john.doe");
  await user.type(screen.getByTestId("passenger-document"), "69178409047");
  await user.click(screen.getByTestId("create-passenger-button"));

  expect(screen.getByTestId("error")).toHaveTextContent("Invalid email");
});
