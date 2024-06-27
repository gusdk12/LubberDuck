

SELECT * FROM ctt_user;
SELECT * FROM ctt_authority;
SELECT * FROM ctt_menu;

SELECT * FROM ctt_cart;
SELECT * FROM ctt_bookmark;
SELECT * FROM ctt_order;
SELECT * FROM ctt_recent;
SELECT * FROM ctt_aichat;
SELECT * FROM ctt_calendar;

SELECT * FROM ctt_review;
SELECT * FROM ctt_order_item;

/* 칵테일 평점 평균 */
SELECT AVG(r.rate) '칵테일별 평균'
FROM ctt_order_item o, ctt_review r
WHERE o.id=r.item_id AND o.cocktail_id=20
;