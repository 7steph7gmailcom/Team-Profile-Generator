const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, GitHub) {
    super(name, id, email);

    this.GitHub = GitHub;
  }

  getGithub() {
    return this.GitHub;
  }
  getRole() {
    return "Engineer";
  }
  getRoleHtml()
    {
        return `<li>Github: <a href="https://github.com/${this.getGithub()}"target="_blank">${this.getGithub()}</a></li>`
    }
}

module.exports = Engineer;