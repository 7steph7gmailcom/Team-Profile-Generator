const Engineer = require("../lib/Engineer");


Test("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Create", 1, "make@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});


Test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Create", 1, "make@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});


Test("getRole() should return \"Engineer\"", () => {
    const testValue = "Engineer";
    const e = new Engineer("Create", 1, "make@test.com", "GitHubUser");
    expect(e.getRole()).toBe(testValue);
  });