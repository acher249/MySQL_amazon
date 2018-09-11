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
  readProducts();
  setTimeout(runSearch, 500);
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Buy a product",
        "View all products"
        // "Find all artists who appear more than once",
        // "Find data within a specific range",
        // "Search for a specific song",
        // "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      // case "Find songs by artist":
      //   artistSearch();
      //   break;

      case "Buy a product":
        buyProduct();
        break;  

      // case "Find all artists who appear more than once":
      //   // multiSearch();
      //   break;

      // case "Find data within a specific range":
      //   // rangeSearch();
      //   break;

      // case "Search for a specific song":
      //   // songSearch();
      //   break;

      // case "Find artists with a top song and top album in the same year":
      //   // songAndAlbumSearch();
      //   break;
      }
    });
}

function buyProduct() {
  inquirer
    .prompt({
      name: "item_id",
      type: "input",
      message: "What product would you like to buy? (enter ID)"
    })
    .then(function(answer) {
      //give me all these things out of the DB
      var query = "SELECT product_name, department, price, stock_quantity FROM products WHERE ?";
      //Now grab this specific piece of data
      connection.query(query, { item_id: answer.item_id }, function(err, res) {
        //response is going to be all of the associated data to that artist
        // for (var i = 0; i < res.length; i++) {
        //   console.log("Department: " + res[i].department + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
        // }
        console.log(res);
        // console.log("Department: " + res.department + " || Price: " + res.price + " || Stock: " + res.stock_quantity);
        // runSearch();
      });
    });
}


function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      //give me all these things out of the DB
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      //Now grab this specific piece of data
      connection.query(query, { artist: answer.artist }, function(err, res) {
        //response is going to be all of the associated data to that artist
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  // dont understand this query
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  //not inputing anything
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album +
              " || Year: " +
              res[i].year
          );
        }

        runSearch();
      });
    });
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

