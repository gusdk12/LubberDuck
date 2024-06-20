

SELECT * FROM ctt_user;
SELECT * FROM ctt_authority;
SELECT * FROM ctt_menu;
SELECT * FROM ctt_review;
SELECT * FROM ctt_cart;
SELECT * FROM ctt_bookmark;
SELECT * FROM ctt_order;
SELECT * FROM ctt_order_item;


UPDATE ctt_menu
SET sequence=-1
WHERE  name='Mojito'
;

UPDATE ctt_bookmark
SET comment = '하하'
WHERE user_id = 2 AND cocktail_id = 1
;