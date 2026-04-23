insert into products (name, price, can_be_returned) values ('chair', 44.00, false);

insert into products (name, price, can_be_returned) values ('stool', 25.99, true);

insert into products (name, price, can_be_returned) values ('table', 124.00, false);

select * from products;

select name from products;

select name, price from products;

insert into products (name, price, can_be_returned) values ('bench', 100.00, false);

select name from products where can_be_returned = true;

select name from products where price < 44.00;

select name from products where price between 22.50 and 99.99;

update products set price = price - 20;

delete from products where price < 25.00;

update products set price = price + 20.00;

update products set can_be_returned = true;