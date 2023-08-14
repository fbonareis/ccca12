import Passenger from "./Passenger"

test('should be not create a invalid passenger', () => {
  expect(() => new Passenger("", "", "", "")).toThrow(new Error('Invalid name'))
})