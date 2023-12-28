const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let teams = [];


// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Define Manager questions
const managerQuestions = [
{
    type: 'input', 
    name: 'name',
    message: "Manager Name: ",
},    
{
    type: 'input', 
    name: 'id',
    message: "Employee ID: ",
},   
{
    type: 'input', 
    name: 'email',
    message: "Email address: ",
},   
{
    type: 'input',
    name: 'officenumber',
    message: "Office number: "
}
];

// Define Enginner questions
const enginnerQuestions = [
    {
        type: 'input', 
        name: "name",
        message: "Engineer's Name: ",
    },    
    {
        type: 'input', 
        name: 'id',
        message: "ID: ",
    },   
    {
        type: 'input', 
        name: 'email',
        message: "Email: ",
    },   
    {
        type: 'input',
        name: 'github',
        message: "GitHub username: "
    }
];

// Define Intern questions
const internQuestions = [
    {
        type: 'input', 
        name: 'name',
        message: "Intern's name: ",
    },
    {
        type: 'input', 
        name: 'id',
        message: "ID: ",
    },    
    {
        type: 'input', 
        name: 'email',
        message: "Email: ",
    },        
    {
        type: 'input',
        name: 'school',
        message: "School: "
    }
];

// Define menu questions
const menu = [
{
    type: 'list',
    name: 'option',
    message: "Options: ",
    choices: [
        {
            key: 'e',
            name: 'Add an engineer',
            value: 'engineer'
        },
        {
            key: 'i',
            name: 'Add an intern',
            value: 'intern'
        },
        {
            key: 'q',
            name: 'Finish building the team',
            value: 'quit'
        }
    ],
    default: 'quit'
}
];

// Define function to trigger Engineering questions
async function engineerQuestion(teams){
    await inquirer.prompt(enginnerQuestions).then((engineerAnswers) =>{
        let engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
        teams.push(engineer);
        prepareMenu();
    })
};

// Define function to trigger Intern questions
async function internQuestion(teams){
    await inquirer.prompt(internQuestions).then((answers) =>{
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teams.push(intern);
        prepareMenu();
    })
};

// Define te funtion to trigger the main menu
async function prepareMenu(){
    await inquirer.prompt(menu).then((answers)=>{
            userOption = answers.option;
            if (userOption === 'engineer'){
                // Trigger engineer questions
                engineerQuestion(teams);
            }
            else if (userOption === 'intern'){
                // Trigger intern questions
                internQuestion(teams);
            }
            else if (userOption === 'quit'){
                // console.log(teams);
                // console.log(render(teams));
                // Trigger render function and write output string to HTML
                fs.writeFile(outputPath, render(teams), function(err){
                    if (err) throw err;
                    console.log("HTML generated");
                } )
                return;
            }
    })
};

async function init(){
    // First trigger Manager questions
    await inquirer.prompt(managerQuestions).then((answers)=>{
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
        teams.push(manager);
    })
    // Prepare main menu for Engineer and Intern questions
    prepareMenu();
};

init();