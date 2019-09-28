import Example from "./Example";

describe("Example", () => {
  const example = new Example();

  describe("exampleMethod", () => {
    it("returns true", () => {
      expect(example.exampleMethod()).toBe(true);
    });
  });
});
