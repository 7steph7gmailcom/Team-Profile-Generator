const Employee = require("../lib/Employee");


Test("Can get name via getName()", () => {
    const testValue = "Stephanie";
    const e = new Employee(testValue);
    expect(e.getName()).toBe(testValue);
  });


Test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});


Test("Can set email via constructor argument", () => {
  const testValue = "make@email.com";
  const e = new Employee("Create", 1, testValue);
  expect(e.email).toBe(testValue);
});


Test("Can get id via getId()", () => {
  const testValue = 100;
  const e = new Employee("Create", testValue);
  expect(e.getId()).toBe(testValue);
});


Test("Can set name via constructor arguments", () => {
    const name = "Stephanie";
    const e = new Employee(name);
    expect(e.name).toBe(name);
  });


Test("Can get email via getEmail()", () => {
  const testValue = "make@gmail.com";
  const e = new Employee("Create", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});


Test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Stephanie", 1, "make@test.com");
  expect(e.getRole()).toBe(testValue);
});


Test("Can set id via constructor argument", () => {
    const testValue = 100;
    const e = new Employee("Create", testValue);
    expect(e.id).toBe(testValue);
  });