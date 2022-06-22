// Include packages needed for this application

const mysql = require('mysql2');

const inquirer = require('inquirer');

// Define all functions

// function for welcome image and first prompt
afterConnection = () => {
  console.log("***********************************");
  console.log("*                                 *");
  console.log("*        EMPLOYEE MANAGER         *");
  console.log("*                                 *");
  console.log("***********************************");
// First prompt
  promptUser();
};

// inquirer prompt for choosing action
const promptUser = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices', 
      message: 'What would you like to do?',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Update an employee manager',
                "View employees by department",
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'No Action']
    }
  ])
    .then((answers) => {
      const { choices } = answers; 

      if (choices === "View all departments") {
        showDepartments();
      }

      if (choices === "View all roles") {
        showRoles();
      }

      if (choices === "View all employees") {
        showEmployees();
      }

      if (choices === "Add a department") {
        addDepartment();
      }

      if (choices === "Add a role") {
        addRole();
      }

      if (choices === "Add an employee") {
        addEmployee();
      }

      if (choices === "Update an employee role") {
        updateEmployee();
      }

      if (choices === "Update an employee manager") {
        updateManager();
      }

      if (choices === "View employees by department") {
        employeeDepartment();
      }

      if (choices === "Delete a department") {
        deleteDepartment();
      }

      if (choices === "Delete a role") {
        deleteRole();
      }

      if (choices === "Delete an employee") {
        deleteEmployee();
      }

      if (choices === "View department budgets") {
        viewBudget();
      }

      if (choices === "No Action") {
        connection.end()
    };
  });
};


// Function to display all departments
showDepartments = () => {
  const sql = `SELECT id AS Department_ID, name AS Department FROM department`;
  
  db.query(sql, (err, rows) => {
    console.table(rows);
    promptUser();
  });
};


// Function to display all roles
showRoles = () => {
  const sql = `SELECT title AS Roles FROM role`;
  
  db.query(sql, (err, rows) => {
    console.table(rows);
    promptUser();
  });
};


// Function to display all employees
showEmployees = () => {
  const sql = `SELECT * FROM employee`;
  
  db.query(sql, (err, rows) => {
    console.table(rows);
    promptUser();
  });
};


// Function to add department
addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDept',
      message: "Which department do you want to add?",
      validate: addDept => {
        if (addDept) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!"); 

        showDepartments();
    });
  });
};


// Function to add role
addRole = () => {

  inquirer.prompt([
    {
      type: 'input', 
      name: 'addRole',
      message: "Which role do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: salary => {
        if (salary) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'department',
      message: "Which department is this role in? Please enter department ID",
      validate: department => {
        if (department) {
            return true;
        } else {
            console.log('Please enter a department ID');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [answer.addRole, answer.salary, answer.department];
      db.query(sql, params, (err, result) =>{
        if (err) throw err;
        console.log('Added ' + answer.addRole + " to roles!"); 

        showRoles();
      });
  });
};


// Function to add employee
addEmployee = () => {
   
  inquirer.prompt([
    {
      type: 'input', 
      name: 'first_name',
      message: "Enter new employee first name",
      validate: first_name => {
        if (first_name) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'last_name',
      message: "Enter new employee last name",
      validate: last_name => {
        if (last_name) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'role_id',
      message: "Enter role_ID for this employee",
      validate: role_id => {
        if (role_id) {
            return true;
        } else {
            console.log('Please enter a role_ID');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'manager_id',
      message: "Enter manager_ID for this employee",
      validate: manager_id => {
        if (manager_id) {
            return true;
        } else {
            console.log('Please enter a manager_ID');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.first_name + " " + answer.last_name + " to employees!"); 
        showEmployees();
    });
  });
};


// Function to update employee
updateEmployee = () => {
   
  inquirer.prompt([
    {
      type: 'input', 
      name: 'employee_id',
      message: "Enter employee_ID to be updated",
      validate: employee_id => {
        if (employee_id) {
            return true;
        } else {
            console.log('Please enter a employee_id');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'role_id',
      message: "Enter new role_ID",
      validate: role_id => {
        if (role_id) {
            return true;
        } else {
            console.log('Please enter a role_id');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [answer.role_id, answer.employee_id];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Updated role for employee ' + answer.employee_id + " to " + answer.role_id); 
        showEmployees();
    });
  });
};


// Function to update manager of employee
updateManager = () => {
   
  inquirer.prompt([
    {
      type: 'input', 
      name: 'employee_id',
      message: "Enter employee_ID to be updated",
      validate: employee_id => {
        if (employee_id) {
            return true;
        } else {
            console.log('Please enter a employee_id');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'manager_id',
      message: "Enter new manager_ID",
      validate: manager_id => {
        if (manager_id) {
            return true;
        } else {
            console.log('Please enter a manager_id');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
      const params = [answer.manager_id, answer.employee_id];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Updated manager for employee ' + answer.employee_id + " to " + answer.manager_id); 
        showEmployees();
    });
  });
};


// Function to view employee by department
employeeDepartment = () => {
  console.log('Displaying employees by department...\n');
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  });
  };


// Function to delete department
deleteDepartment = () => {
  inquirer.prompt ([
    {
      type: 'input', 
      name: 'department_id',
      message: "Please enter department_id to be deleted",
      validate: department_id => {
        if (department_id) {
            return true;
        } else {
            console.log('Please enter a department_id');
            return false;
        }
      }
    }
  ])
  .then(answer => {
  const sql = `DELETE FROM department WHERE id = ?`;

  db.query(sql, answer.department_id, (err, rows) => {
    if (err) throw err; 
    console.log("Department deleted!");
    showDepartments(); 
    promptUser();
  });
  }
)};


// Function to delete role
deleteRole = () => {
  inquirer.prompt ([
    {
      type: 'input', 
      name: 'role_id',
      message: "Please enter role_id to be deleted",
      validate: role_id => {
        if (role_id) {
            return true;
        } else {
            console.log('Please enter a role_id');
            return false;
        }
      }
    }
  ])
  .then(answer => {
  const sql = `DELETE FROM role WHERE id = ?`;

  db.query(sql, answer.role_id, (err, rows) => {
    if (err) throw err; 
    console.log("Role deleted!");
    showRoles(); 
    promptUser();
  });
  }
)};


// Function to delete employee
deleteEmployee = () => {
  inquirer.prompt ([
    {
      type: 'input', 
      name: 'employee_id',
      message: "Please enter employee_id to be deleted",
      validate: employee_id => {
        if (employee_id) {
            return true;
        } else {
            console.log('Please enter a employee_id');
            return false;
        }
      }
    }
  ])
  .then(answer => {
  const sql = `DELETE FROM employee WHERE id = ?`;

  db.query(sql, answer.employee_id, (err, rows) => {
    if (err) throw err; 
    console.log("Employee deleted!");
    showEmployees(); 
    promptUser();
  });
  }
)};


// Function to view department budget
viewBudget = () => {
  const sql = `SELECT department.name AS department,
                SUM(salary) AS budget
                FROM  role  
                JOIN department ON role.department_id = department.id GROUP BY  department_id`;

  db.query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  });
  };

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'groot',
    database: 'employee_db'
  },
  afterConnection()
);