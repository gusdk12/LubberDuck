

SELECT * FROM ctt_user;
SELECT * FROM ctt_authority;
SELECT * FROM ctt_menu;
SELECT * FROM ctt_review;
SELECT * FROM ctt_cart;


SELECT
    c.user_id "c_user_id",
    c.cocktail_id "c_cocktail_id",
    c.quantity "c_quantity",
    u.id "u_id",
    u.authority_id "u_authority_id",
    u.username "u_username",
    u.password "u_password",
    u.nickname "u_nickname",
    u.email "u_email",
    u.regdate "u_regdate",
    u.birth_date "u_birth_date",
    m.id "m_id",
    m.name "m_name",
    m.img_url "m_img_url",
    m.info "m_info",
    m.price "m_price",
    m.sequence "m_sequence"
FROM ctt_cart c, ctt_user u, ctt_menu m
WHERE c.user_id = u.id AND c.cocktail_id = m.id AND c.user_id=3
ORDER BY c.cocktail_id DESC;