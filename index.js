const inquirer = require("inquirer");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
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
    message: "What is the name of the school the Intern attended or attends?",
    name: "school",
    },
];

const finishQuestion = [
    {
    type: "list",
    message: "Would you like to add another team member?",
    name: "finishQuestion",
    choices: ["Yes", "No"],
    },
];
      

const teamProfileArray = [];
let generatedHTML = "";
let spec;


//Final question awnser is "No", then HTML is generated 
function questionPrompt() {
  inquirer.prompt(questionPrompt).then((answer) => {
    // console.log(teamArray);
    if (answer.questionPrompt === "No") {
      setHtmlTemplate();
      // generate html function should go here
      teamArray.map((result) => {
        console.log(result);


        if (result.getRole() === "Manager") {
          // setHtmlTemplate();
          spec = `Office Number: ${result.getOfficeNumber()}`;
        } else if (result.getRole() === "Engineer") {
            // setHtmlTemplate();
            spec = `GitHub: <a href="${result.getGitHub()}">${result.getGitHub()}</a>`;
          } else {
            // setHtmlTemplate();
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
      fs.appendFile("./dist/generated.html", generatedHTML, (err) =>
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
          questionPrompt();
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
          teamArray.push(newEngineer);
          console.log(teamArray);
          finishQuestionPrompt();
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
          teamArray.push(newIntern);
          console.log(teamArray);
          finishQuestionPrompt();
        });
      }
      
    
  });

}

function teamGenerated() {
    const lastWords = `</div>
    </section>
    </main>
    </body>
    </html>`;
    fs.appendFile("./dist/generated.html", lastWords, (err) =>
    err ? console.log(err) : console.log("theEnd function working!")
    );
  }
  
  //Sets html template for generated.html
function setHtmlTemplate() {
    let firstWords = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Generator</title>
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
  fs.writeFile("./dist/generated.html", firstWords, (err) => 
  err ? console.log(err) : console.log()
  )
}




//starts prompt, begins entire process of making cards
addNewEmployee();
