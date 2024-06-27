

-- 샘플 카트
INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (2, 40, 2)
;
INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (2, 2, 1)
;
INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (2, 20, 3)
;
INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (3, 18, 2)
;

INSERT INTO ctt_order (user_id, regdate) VALUES
    (2, 20240617);
INSERT INTO ctt_order (user_id, regdate) VALUES
    (2, 20240617);

INSERT INTO ctt_order (user_id, regdate) VALUES
    (2, 20240617121250);

INSERT INTO ctt_order (user_id, regdate) VALUES
    (3, 20240617121250);

INSERT INTO ctt_order (user_id, regdate) VALUES
    (5, 20240617121250);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (5, 15, 1, 7600);
INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (5, 1, 1, 7600);
INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (5, 2, 1, 7600);
INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (5, 3, 1, 7600);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (1, 11, 1, 7600);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (1, 19, 2, 6700);
INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (2, 12, 1, 7600);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (2, 3, 2, 6700);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (3, 10, 5, 8900);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (3, 13, 3, 9600);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (3, 3, 2, 7600);


INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (4, 6, 1, 8800);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (4, 15, 2, 9800);

INSERT INTO ctt_order_item (order_id, cocktail_id, quantity, price) VALUES
    (4, 20, 3, 5800);



-- 샘플 리뷰


INSERT INTO ctt_review (item_id, rate, content) VALUES
    (18, 5, '정말 맛있어요 최고예요. 달콤한 맛이 계속 기억에 남네요!');

INSERT INTO ctt_review (item_id, rate, content) VALUES
    (18, 4, '제가 생각한 맛이에요 ! 그런데 가게 분위기가 조금 시끄러워서 아쉽네요. 별점 1개 깎겠습니다!');

INSERT INTO ctt_review (item_id, rate, content) VALUES
    (18, 2, '흑흑 이걸 마신다고 해도 그녀가 잊혀지지 않아!!!!!!!!!!!');

-- 샘플 최근
INSERT INTO ctt_recent (user_id, cocktail_id) VALUES
    (2,2)
;

-- 샘플 캘린더
INSERt INTO ctt_calendar (id, date, cocktail_id, comment, memo) VALUES
    (20240604,'2024-06-04',1,'가나다','일정메모는 longtext?')
;

INSERt INTO ctt_calendar (id, date, memo) VALUES
    (20240618,'2024-06-18','일정메모는 longtext?')
;

-- 샘플 recent
INSERT INTO ctt_recent (user_id, cocktail_id) VALUES
    (2,10)
;

INSERT INTO ctt_recent(user_id, cocktail_id)
VALUES (5,12)
;