#!/usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.green("Please enter the amount of second."),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.red("Please enter valid number:");
            }
            else if (input > 60) {
                return chalk.red("Seconds must be in 60.");
            }
            else {
                return true;
            }
        }
    }
]);
let input = res.userInput;
function startTime(val) {
    const iniTime = new Date().setSeconds(new Date().getSeconds() + val);
    const interValTime = new Date(iniTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(interValTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.red("Timer has expired."));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
