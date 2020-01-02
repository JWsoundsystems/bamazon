var mysql = require("mysql");
var inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err){
    if(err) throw err;
    console.log("Connecting to site......\n");

    start();
})


function start() {
    console.log("    ============ Welcome to Bamazon ============    ");
    console.log("How May I Help You?");

    inquirer
    .prompt([
        {
            name: "intro",
            type: "list",
            message: "What would you like to do?",
            choices: ["Browse Catalog", "Purchase Item"]
        }
    ])
    .then(function(answer){
        if(answer.intro === "Browse Catalog"){
            connection.query("SELECT * FROM products", function(err, res){
                if (err) throw err;
                console.table(res);
                start();
            });

        }else {
            inquirer
            .prompt([
                {
                    name: "productID",
                    type: "input",
                    message: "Please enter the item ID you would like to purchase!\n"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?_\n"   
                }
            ])
            .then(function(answer){

                connection.query("SELECT * FROM products", function(err, res){
                    if (err) throw err;

                    console.log("\nYou have chosen item " + res[answer.productID - 1].product_name + "Quantity\n");

                    if (res[answer.productID - 1].stock_quantity < answer.quantity){
                        console.log("Not enought in stock, check back soon\n")
                    }else{
                        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item ")
                        [answer.quantity, answer.productID],
                        function(err,res){
                            if(err) throw err;
                        }

                        console.log("Order Confirmed! We Thank you for shopping with bamazon! \n");
                        console.log("Quantity Updated");
                    }
                    start();
                })



            })
        }
    })
}