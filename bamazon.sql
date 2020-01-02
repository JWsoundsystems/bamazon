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

INSERT INTO bamazon (product_name, department_name, price, stock_quantity)
VALUES
("Potato Chips", "Food", 5, 1000),
("Computer Monitor", "Electronics", 150, 10);

