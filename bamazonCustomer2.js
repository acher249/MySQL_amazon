var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Shot51222!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log("______________________________________________");
  console.log("Availiable Products: ");
  readProducts();
  setTimeout(runSearch, 500);
});

function createProduct() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      // updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function buyProduct() {
  var itemToBuy;
  var quantityToBuy;

  inquirer
  .prompt({
    name: "buy",
    type: "input",
    message: "What do you want to buy? (product id)"
  })
  .then(function(answer) {
    // var query = "SELECT product_name FROM products GROUP BY item_id = ", answer;
    switch (answer.action) {
      case 1:
        console.log("buying a brush");
      break;

      case 2:
      console.log("buying a shoes");
      break;

      case 3:
      console.log("buying a pants");
      break;

      case 4:
      console.log("buying a vacum");
      break;

      case 5:
      console.log("buying a lawn mower");
      break;
    }
  }
);
  // var query = connection.query(
  //   "INSERT INTO products SET ?",
  //   {
  //     flavor: "Rocky Road",
  //     price: 3.0,
  //     quantity: 50
  //   },
  //   function(err, res) {
  //     console.log(res.affectedRows + " product inserted!\n");
  //     // Call updateProduct AFTER the INSERT completes
  //     // updateProduct();
  //   }
  // );

  // // logs the actual query being run
  // console.log(query.sql);
}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      //is this OR or AND?
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      // deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      // readProducts();
    }
  );
}

function readProducts() {
  // console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Buy an Item",
        "Add an Item",
        "Delete an Item"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Buy an Item":
          buyProduct();
        break;

        case "Add an Item":
          createProduct();
        break;

        case "Delete an Item":
          deleteProduct();
        break;
      }
    }
  );
}
