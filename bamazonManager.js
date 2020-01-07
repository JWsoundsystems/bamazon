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
    console.log("    ============ Welcome to Bamazon Manager ============    ");
    console.log("How May I Help You?");

    inquirer
    .prompt([
        {
            name: "intro",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
    .then(function(answer){
        if(answer.intro === "View Products for Sale"){
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
                    if (quantity > res[0].stock_quantity) {
                        console.log("We only have " + res[0].stock_quantity + " items of the product selected")
                        start();
 
                    } else{  
                        console.log("");
                        console.log(res[0].product_name + " purchased");
                        console.log(quantity + " qty @ $" + res[0].price);

                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query("UPDATE products SET stock_quantity = " + newQuantity + 
                        " WHERE item_id = " + 
                        res[0].item_id, 
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