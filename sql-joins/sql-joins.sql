select * from owners full outer join vehicles on owners.id = vehicles.owner_id;

select first_name, last_name, count(*) as count from owners
join vehicles on owners.id = vehicles.owner_id
group by (first_name, last_name) order by first_name ;

select first_name, last_name, avg(price) as average_price, count(*) as count           
from owners                                                                                             
join vehicles on owners.id = vehicles.owner_id                                                          
group by (first_name, last_name) having count(*) > 1 and avg(price) > 10000 order by first_name desc;