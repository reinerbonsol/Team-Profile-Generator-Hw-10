const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

function addMember() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the name associated with team member",
        name: "name"
    },
    {
        type: "list",
        message: "Select role associated with team member",
        name: "role",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ],
        
    },
    {
        type: "input",
        message: "Enter the ID associated with team member",
        name: "id"
    },
    {
        type: "input",
        message: "Enter the email associated with team member",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleReturn = "";
        if (role === "Intern") {
            roleReturn = "school name";
        } else if (role === "Engineer") {
            roleReturn = "Github username";
        } else {
            roleReturn = "office phone number";
        }
        inquirer.prompt([{
            type: "input",
            message: `Enter ${roleReturn} associated with team member`,
            name: "roleReturn"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            name: "addTeamMember",
            choices: [
                "yes",
                "no"
            ],
            
        }])
        .then(function({roleReturn, addTeamMember}) {
            let newMember;
            if (role === "Intern") {
                newMember = new Intern(name, id, email, roleReturn);
            } else if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleReturn);
            } else {
                newMember = new Manager(name, id, email, roleReturn);
            }
            employees.push(newMember);
            render(newMember)
            .then(function() {
                if (addTeamMember === "yes") {
                    addMember();
                } else {
                    fs.appendFile(outputPath, function (err) {
                        if (err) {
                            console.log(err);
                        };
                    });
                    console.log("Team Members added and created in team.html");
                }
            });
        });
    });
};

addMember();
