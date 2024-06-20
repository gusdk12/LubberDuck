

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

SELECT
    r.id AS "id",
    r.item_id AS "item_id",
    r.content AS "content",
    r.rate AS "rate",
    r.regdate AS "regdate",
    oi.id AS "order_item.id",
    oi.order_id AS "order_item.order_id",
    oi.cocktail_id AS "order_item.cocktail_id",
    oi.quantity AS "order_item.quantity",
    oi.price AS "order_item.price",
    m.id AS "menu.id",
    m.name AS "menu.name",  -- 칵테일 이름 추가
    m.img_url AS "menu.imgUrl",
    o.regdate AS "order.regdate",
    o.id AS "order.id",
    o.number AS "order.number",
    o.user_id AS "order.user_id"
FROM
    ctt_review r
        JOIN ctt_order_item oi ON r.item_id = oi.id
        JOIN ctt_menu m ON oi.cocktail_id = m.id
        JOIN ctt_order o ON oi.order_id = o.id
WHERE oi.cocktail_id ;