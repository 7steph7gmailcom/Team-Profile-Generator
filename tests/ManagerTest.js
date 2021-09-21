const Manager = require("../lib/Manager");


Test("Can set office number via constructor argument", () => {
  const testValue = 100;
  const e = new Manager("Create", 1, "make@test.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});


Test('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const e = new Manager("Create", 1, "make@test.com", 100);
  expect(e.getRole()).toBe(testValue);
});


Test("Can get office number via getOffice()", () => {
  const testValue = 100;
  const e = new Manager("Create", 1, "make@test.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});
