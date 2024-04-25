#! /usr/bin/env node
// import inquirer
import inquirer from "inquirer";
// welcome message
console.log("\n\n\t\t\t<<<=======================================================>>>");
console.log("<<<================>>>\t<<<=======>>>\tWELCOME TO MY TODO LIST APP\t<<<=======>>>\t<<<================>>>");
console.log("\t\t\t<<<=======================================================>>>\n\n");
let todoList = [];
// main function
let condition = true;
let main = async () => {
    while (condition) {
        let options = await inquirer.prompt([
            {
                name: "choice",
                message: "Choose An Option You Want To Do: ",
                type: "list",
                choices: [
                    "Add Task",
                    "Update Task",
                    "View Todo-List",
                    "Delete Task",
                    "Exit",
                ],
            },
        ]);
        //conditional statemennt
        if (options.choice === "Add Task") {
            await addTask();
        }
        else if (options.choice === "Update Task") {
            await updateTask();
        }
        else if (options.choice === "View Todo-List") {
            await viewTask();
        }
        else if (options.choice === "Delete Task") {
            await deleteTask();
        }
        else if (options.choice === "Exit") {
            await message();
        }
    }
};
// function to add tasks
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter Your Task: ",
        },
    ]);
    todoList.push(newTask.task);
    console.log(`\n You added "${newTask.task}" in your todos!\n`);
};
// function to view tasks
let viewTask = async () => {
    console.log("\nYour Todo-List:\n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
// function to update tasks
let updateTask = async () => {
    await viewTask();
    let updatedTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the number of the task you want to update: ",
        },
        {
            name: "new_task",
            type: "input",
            message: "Enter Your New Task: ",
        },
    ]);
    todoList[updatedTask.index - 1] = updatedTask.new_task;
    console.log(`\nTask at number "${updatedTask.index}" update successfully. `);
    await viewTask();
};
// function to delete tasks
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the number of the task you want to delete: ",
        },
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n"${deletedTask}" this task has been deleted successfully.`);
    await viewTask();
};
// fuction to end app and give end message
let message = async () => {
    condition = false;
    console.log("\n\n\t\t\t<<<=======================================================>>>");
    console.log("<<<================>>>\t<<<=======>>>\t\tYOU EXIT THE APP\t<<<=======>>>\t<<<================>>>");
    console.log("\t\t\t<<<=======================================================>>>\n\n");
};
main();
