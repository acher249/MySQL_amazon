DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NULL,
  product_name VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL
);

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES (001 ,"brush", "home products", 12, 124);

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES (002 ,"shoes", "clothing", 65, 21);

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES (003 ,"pants", "clothing", 35, 56);

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES (004 ,"vacum", "home products", 87, 8);

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES ( 005,"lawn mower", "home products", 220, 75);

SELECT *
FROM products

