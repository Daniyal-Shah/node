const lib = require("../lib");

describe("absolute", () => {
  test("positive", () => {
    const result = lib.absolute(2);
    expect(result).toBe(2);
  });

  test("negative", () => {
    const result = lib.absolute(-2);
    expect(result).toBe(2);
  });

  test("0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greeting", () => {
  test("daniyal ", () => {
    const result = lib.greet("daniyal !");
    expect(result).toMatch(/daniyal/);
    expect(result).toContain("daniyal");
  });
});
