const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
	

const questions = [
	{
	type: "input",
	message: "What is the employee's name?",
	 name: "name",
	},
	{
	 type: "input",
	message: "What is the employee's id number?",
	name: "id",
	},
	{
	type: "input",
    message: "What is the employee's email address?",
	name: "email",
	},
	{
	type: "list",
	message: "What is the employee's role",
	name: "role",
	choices: ["Manager", "Engineer", "Intern"],
	},
];
	
const manangerQuestion = [
	{
	type: "number",
	message: "What is the office number for this Manager?",
	name: "officeNumber",
	},
];

const engineerQuestion = [
    {
    type: "input",
    message: "What is the github username for this engineer",
    name: "github",
    },
];

const internQuestion = [
    {
    type: "input",
    message: "What is the name of the school the Intern attended?",
    name: "school",
    },
];

const lastQuestion = [
    {
    type: "list",
    message: "Would you like to add another team member?",
    name: "lastQuestion",
    choices: ["Yes", "No"],
    },
];

const teamProfileArray = [];
let generatedHTML = "";
let spec;


//Final question awnser is "No", then HTML is generated 
function lastQuestionPrompt() {
  inquirer.prompt(lastQuestion).then((answer) => {
    console.log(teamProfileArray);
    if (answer.lastQuestion === "No") {
      setHtmlTemplate();
      //Gene HTML  
      teamProfileArray.map((result) => {
        console.log(result);


        if (result.getRole() === "Manager") {
          spec = `Office Number: ${result.getOfficeNumber()}`;
        } else if (result.getRole() === "Engineer") {
            spec = `GitHub: <a href="${result.getGitHub()}">${result.getGitHub()}</a>`;
          } else {
            spec = `School: ${result.getSchool()}`;
          }
          generatedHTML += `
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${result.getName()}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${result.getRole()}</h6>
                <p class="card-text">
                <ul class="list-group list-group-flush">\n
                <li class="list-group-item">ID: ${result.getId()}</li>\n
                <li class="list-group-item">Email: 
                <a href="mailto: ${result.getEmail()}" target="NO_BLANK"
                >${result.getEmail()}</a></li>\n
              <li class="list-group-item">${spec}</li>
              </p>
            </div>
          </div>
        </div> 
        `;
      
      });
      console.log(generatedHTML);
      fs.appendFile("./dist/index.html", generatedHTML, (err) =>
        err ? console.log(err) : console.log("successful")
      );
      teamGenerated();
    } else {
      addNewEmployee();
    }
  });
}


function addNewEmployee() {

    //Questions for user
    inquirer.prompt(questions).then((data) => {
      if (data.role === "Manager") {
        inquirer.prompt(manangerQuestion).then((managerData) => {
          console.log(managerData)
          
          const newManager = new Manager(
            data.name,
            Number(data.id),
            data.email,
            Number(managerData.officeNumber)
          );
          console.log(newManager);
          teamProfileArray.push(newManager);
          lastQuestionPrompt();
        });
      }
      if (data.role === "Engineer") {
        inquirer.prompt(engineerQuestion).then((engineerData) => {
          console.log(engineerData);
          const newEngineer = new Engineer(
            data.name,
            Number(data.id),
            data.email,
            engineerData.github
          );
          console.log(newEngineer);
          teamProfileArray.push(newEngineer);
          console.log(teamProfileArray);
          lastQuestionPrompt();
        });
      }
      if (data.role === "Intern") {
        inquirer.prompt(internQuestion).then((internData) => {
          console.log(internData);
          const newIntern = new Intern(
            data.name,
            Number(data.id),
            data.email,
            internData.school
          );
          console.log(newIntern);
          teamProfileArray.push(newIntern);
          console.log(teamProfileArray);
          lastQuestionPrompt();
        });
      }
      
    
  });

}

function teamGenerated() {
    const h_t_m_l = `</div>
    </section>
    </main>
    </body>
    </html>`;
    fs.appendFile("./dist/index.html", h_t_m_l, (err) =>
    err ? console.log(err) : console.log("LastFunc")
    );
  }
  
  //HTML template for generated.html
function setHtmlTemplate() {
    let htmlcard = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Profile Generator</title>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
  crossorigin="anonymous"
  />
  <link rel="stylesheet" href="style.css" />
  </head>
  <body>
  <main>
  <header>
  <div class="container">
  <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
  <span class="navbar-brand mb-0 h1">Team Profile Cards</span>
  </div>
  </nav>
  </div>
  </header>
  <section class="container">
  <div class="row">`
  
  
  fs.writeFile("./dist/index.html", htmlcard, (err) => 
  err ? console.log(err) : console.log()
  )
}


//Make new employee card
addNewEmployee();
