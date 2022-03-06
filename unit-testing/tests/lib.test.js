const lib = require("../lib");
test("absolute test positive", () => {
  const result = lib.absolute(2);
  expect(result).toBe(2);
});

test("absolute test negative", () => {
  const result = lib.absolute(-2);
  expect(result).toBe(3);
});

test("absolute test 0", () => {
  const result = lib.absolute(0);
  expect(result).toBe(0);
});
