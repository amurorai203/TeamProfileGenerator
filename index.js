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

const enginnerQuesteions = [
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

async function engineerQuestion(teams){
    await inquirer.prompt(enginnerQuesteions).then((engineerAnswers) =>{
        let engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
        teams.push(engineer);
        prepareMenu();
    })
};

async function internQuestion(teams){
    await inquirer.prompt(internQuestions).then((answers) =>{
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teams.push(intern);
        prepareMenu();
    })
};

async function prepareMenu(){
    await inquirer.prompt(menu).then((answers)=>{
            userOption = answers.option;
            if (userOption === 'engineer'){
                engineerQuestion(teams);
            }
            else if (userOption === 'intern'){
                internQuestion(teams);
            }
            else if (userOption === 'quit'){
                console.log(teams);
                console.log(render(teams));
                fs.writeFile(outputPath, render(teams), function(err){
                    if (err) throw err;
                    console.log("HTML generated");
                } )
                return;
            }
    })
};

async function init(){
    await inquirer.prompt(managerQuestions).then((answers)=>{
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
        teams.push(manager);
    })
    prepareMenu();
};

init();