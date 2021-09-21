const Intern = require("../lib/Intern");

Test("Can set school via constructor", () => {
  const testValue = "DU";
  const e = new Intern("Create", 1, "make@test.com", testValue);
  expect(e.school).toBe(testValue);
});


Test("Can get school via getSchool()", () => {
    const testValue = "DU";
    const e = new Intern("Create", 1, "make@test.com", testValue);
    expect(e.getSchool()).toBe(testValue);
  });

  
Test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Create", 1, "make@test.com", "DU");
  expect(e.getRole()).toBe(testValue);
});

