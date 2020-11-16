const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employer_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  addViewUpdate();
});

function addViewUpdate() {
  inquirer.prompt([
    {
      type: "list",
      name: "addViewUpdate",
      message: "Please select one of the following options:'.",
      choices: [
        "Add departments, roles, employees",
        "View departments, roles, employees",
        "Update employee roles",
        "Exit program"
      ]
    }
  ]).then(function(answer) {
    const choice = answer.addViewUpdate;
    if (choice === "Add departments, roles, employees") {
      addEmployees();
    }
    else if (choice === "View departments, roles, employees") {
      viewEmployees();
    }
    else if (choice === "Update employee roles") {
      updateEmployees();
    }
    else if (choice ==="Exit program") {
      connection.end();
    }
  });
}

function addEmployees() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee's first name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee's last name"
    },
    {
      type: "input",
      name: "roleID",
      message: "Role ID:"
    },
    {
      type: "input",
      name: "managerID",
      message: "Manager's ID:"
    }
  ]).then(function(data) {
    console.log("Inserting an employee...\n");
    var query = connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.roleID,
        manager_id: data.managerID
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee inserted!\n");
      }
    );

    console.log(query.sql);
    addViewUpdate();

  });
}
  
function viewEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    addViewUpdate();
  });
}

function updateEmployees() {
  console.log("Updating employee...\n");
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee's first name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee's last name"
    },
    {
      type: "input",
      name: "roleID",
      message: "Role ID:"
    },
    {
      type: "input",
      name: "managerID",
      message: "Manager's ID:"
    }
  ]).then(function(data) {
    console.log("Updating employee...\n");
    var query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.roleID,
          manager_id: data.managerID
        },
        {
          id 
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee updated!\n");
      }
    );
  
  console.log(query.sql);
  addViewUpdate();

  });
}
