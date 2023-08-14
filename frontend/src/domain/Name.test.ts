import Name from "./Name"

test('should be create a valid name', () => {
  const name = new Name('John Doe')
  expect(name.getValue()).toBe('John Doe')
})

test('should be not create a invalid name', () => {
  expect(() => new Name('John')).toThrow(new Error('Invalid name'))
})