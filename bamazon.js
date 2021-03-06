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
                    name: "item_id",
                    type: "input",
                    message: "Please enter the item ID you would like to purchase!\n"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to order?_\n"   
                }
            ])
            .then(function(answer){

                connection.query("SELECT * FROM products", function(err, res){
                    if (err) throw err;
                    var quantity = answer.quantity;
                    if (quantity > res[answer.item_id - 1].stock_quantity) {
                        console.log("We only have " + res[answer.item_id - 1].stock_quantity + " items of the product selected")
                        start();
 
                    } else{  
                        console.log("");
                        console.log(res[answer.item_id - 1].product_name + " purchased");
                        console.log(quantity + " qty @ $" + res[answer.item_id - 1].price);

                        var newQuantity = res[answer.item_id - 1].stock_quantity - quantity;
                        connection.query("UPDATE products SET stock_quantity = " + newQuantity + 
                        " WHERE item_id = " + 
                        res[answer.item_id - 1].item_id, 
                        function(err,resUpdate){
                            if (err) throw err;
                            console.log("");
                            console.log("Your Order has been Processed");
                            console.log("Thanks for Shopping!");
                            console.log("");
                            connection.end();
                        }
                        ); 
                    } 
                    
                })


            })
        }
    })
}