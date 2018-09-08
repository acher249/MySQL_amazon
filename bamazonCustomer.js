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

var productToBuy = process.argv[2];
var quantityToBuy = process.argv[3];

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log("______________________________________________");
  console.log("Availiable Products: ");
  readProducts();
  setTimeout(firstQuestions, 500);
  setTimeout(buy, 550);
});

function firstQuestions() {
  console.log("What would you like to buy? (product id)");
  console.log("Also How much would you like to buy?");
}

function buy(productToBuy, quantityToBuy) {
  var query = "SELECT product_name FROM products WHERE item_id = " + productToBuy;
  connection.query(query, function(err, res) {
    console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log(res[i]);
    }
    console.log("You want to buy " + quantityToBuy + "," + productToBuy + "!" );
  });

 
}

function createProduct() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      item_id: 006,
      product_name: 3.0,
      department: "home products",
      price: 30,
      stock_quantity,
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

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      //is this OR or AND?
      {
        product_name: "shoes" 
      },
      {
        department: "home products"
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
      department: "home products"
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
