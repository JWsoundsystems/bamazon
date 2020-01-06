DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL,
    product_name VARCHAR(50),
    dept_name VARCHAR(30),
    price INTEGER(10),
    stock_quantity INTEGER(10)
)

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES
("Potato Chips", "Food", 5, 1000),
("Shoes", "Apperal", 20, 100),
("Basket Ball", "Sports", 30, 60),
("Printer", "Electronics", 80, 200),
("Computer Monitor", "Electronics", 150, 10),
("Bananas", "Produce", 2, 950),
("Pencils", "Office Supplies", 3, 1000),
("Lawn Chairs", "Outdoor Goods", 40, 300),
("Rifles", "Hunting", 900, 15),
("Coffee", "Food", 10, 600);



