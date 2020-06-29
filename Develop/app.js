const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const firstQuestions = [
    {
        name: 'name',
        message: 'enter your full name',
        type: 'input',
    },
    {
        name: 'id',
        message: 'enter your employee id',
        type: 'input',
    },
    {
        name: 'email',
        message: 'enter your email',
        type: 'input',
    },
    {
        name: 'role',
        message: 'enter your job role',
        type: 'list',
        choices: [

            {
                name: 'Engineer',
                value: "engineer",
                short: "Engineer"
            },
            {
                name: 'Manager',
                value: "manager",
                short: "Manager"
            },
            {
                name: 'Intern',
                value: "intern",
                short: "Intern"
            },
        ],

    },

];

const askAgain = [
    {
        name: "isContinue",
        message: "Do you want to add another Employee?",
        type: "list",
        choices: [
            {
                name: 'Yes',
                value: 'yes',
                short: "Yes"
            },
            {
                name: 'No',
                value: 'no',
                short: "No"
            }
        ]
    }
]

const employeesArray = []

const checkAndAsk = () => {
    inquirer.prompt(askAgain).then(async (answers) => {
        if (answers.isContinue === 'yes') {
            await init()
        } else {
            console.log('Stop')
            console.log(employeesArray)
            fs.writeFile(outputPath, render(employeesArray), function (err) {
                if (err) throw err;
                console.log('HTML FILE GENERATED')
            })
        }
    })
}

async function init() {
    const answers = await inquirer.prompt(firstQuestions)

    if (answers.role === "engineer") {
        const engineerQuestions = [
            {
                name: 'github',
                message: 'enter your git link',
                type: 'input',
            },
        ]
        const engineerAnswers = await inquirer.prompt(engineerQuestions)
        const engineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswers.github)
        employeesArray.push(engineer)
        checkAndAsk()
    } else if (answers.role === "manager") {
        const managerQuestions = [
            {
                name: 'officeNumber',
                message: 'enter your office number',
                type: 'input',
            },
        ]
        const managerAnswers = await inquirer.prompt(managerQuestions)
        const manager = new Manager(answers.name, answers.id, answers.email, managerAnswers.officeNumber)
        employeesArray.push(manager)
        checkAndAsk()
    } else if (answers.role === "intern") {
        const internQuestions = [
            {
                name: 'university',
                message: 'enter your university',
                type: 'input',
            },
        ]
        const internAnswers = await inquirer.prompt(internQuestions)
        const intern = new Intern(answers.name, answers.id, answers.email, internAnswers.university)
        employeesArray.push(intern)
        checkAndAsk()
    } else {
        console.log("Invalid choice here")
    }
}
//Calling of function that runs in node terminal
init();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
