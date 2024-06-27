

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
    id "id"
     , user_id "user_id"
     , regdate "regdate"
FROM ctt_order
WHERE user_id = 2
ORDER BY regdate DESC
LIMIT 0, 4
