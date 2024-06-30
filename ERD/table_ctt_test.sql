

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

SELECT * FROM ctt_guestbook;

SELECT u.id           "u_id"
     , u.nickname     "nickname"
     , b.id           "b_id"
     , b.user_id      "b_user_id"
     , b.x_coordinate "b_x_coordinate"
     , b.y_coordinate "b_y_coordinate"
     , b.z_coordinate "b_z_index"
     , b.content      "b_content"
     , b.postItKind   "b_postItKind"
FROM ctt_guestbook b,
     ctt_user u
WHERE 1 = 1
  AND b.user_id = u.id
ORDER BY z_coordinate DESC;

SELECT MAX(z_coordinate) AS MaxZ
FROM ctt_guestbook;


/* 칵테일 평점 평균 */
SELECT AVG(r.rate) '칵테일별 평균'
FROM ctt_order_item o, ctt_review r
WHERE o.id=r.item_id AND o.cocktail_id=20
;