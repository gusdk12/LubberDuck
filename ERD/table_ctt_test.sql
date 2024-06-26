

SELECT * FROM ctt_user;
SELECT * FROM ctt_authority;
SELECT * FROM ctt_menu;
SELECT * FROM ctt_review;
SELECT * FROM ctt_cart;
SELECT * FROM ctt_bookmark;
SELECT * FROM ctt_order;
SELECT * FROM ctt_order_item;
SELECT * FROM ctt_recent;
SELECT * FROM ctt_aichat;
SELECT * FROM ctt_calendar;


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
    o.user_id AS "order.user_id",
    u.username AS "user.username",
    u.nickname AS "user.nickname",
    u.id AS "user.id"
FROM
    ctt_review r
        JOIN ctt_order_item oi ON r.item_id = oi.id
        JOIN ctt_menu m ON oi.cocktail_id = m.id
        JOIN ctt_order o ON oi.order_id = o.id
        JOIN ctt_user u ON o.user_id = u.id
ORDER BY r.id DESC
    LIMIT 15, 5;

SELECT cocktail_id
FROM ctt_recent
WHERE user_id = 6
ORDER BY saw_date ASC LIMIT 1
;

DELETE FROM ctt_recent
WHERE user_id = 5
  AND cocktail_id = (SELECT cocktail_id
                     FROM ctt_recent
                     WHERE user_id = 5
                     ORDER BY saw_date ASC LIMIT 1);



DELETE FROM ctt_recent
WHERE user_id = 3
  AND cocktail_id = (
    SELECT cocktail_id
    FROM (
             SELECT cocktail_id
             FROM ctt_recent
             WHERE user_id = 3
             ORDER BY saw_date ASC
             LIMIT 1
         ) AS recent_data
);

DELETE FROM ctt_recent
WHERE user_id = 6 AND cocktail_id = 25
;

SELECT *
FROM ctt_recent
WHERE user_id = 6
ORDER BY saw_date DESC
;