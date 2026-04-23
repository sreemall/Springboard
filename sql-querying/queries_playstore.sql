select app_name from analytics where id = 1880;

select id, app_name from analytics where last_updated = '2018-01-18';

select category, count(*) as count from analytics group by category;

select app_name, reviews  from analytics order by reviews desc limit 10;

select app_name from analytics where rating >= 4.8 order by reviews desc limit 1;

select category, avg(rating) as "avg_rating" from analytics group by category order by avg_rating desc;

select app_name,price, rating from analytics where rating < 3 order by price desc limit 1;

select app_name from analytics where min_installs < 50 and rating is not null order by rating desc;

select app_name from analytics where rating < 3 and reviews >= 10000;

select app_name from analytics where price between 0.10 and 1.00 order by reviews desc limit 10;

select app_name from analytics where last_updated in (select min(last_updated) from analytics);

select app_name from analytics where price in (select max(price) from analytics);

select sum(reviews) AS "All the Reviews" from analytics;

select category from analytics group by category having count(*) > 300;

select app_name, reviews, min_installs, min_installs,  min_installs/reviews as proportion
from analytics
where min_installs >= 100000 order by proportion desc limit 1;
