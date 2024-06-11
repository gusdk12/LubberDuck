

-- 샘플 authority
INSERT INTO ctt_authority (name) VALUES
    ('ROLE_CUSTOMER'), ('ROLE_MANAGER')
;

-- 샘플 user
INSERT INTO ctt_user (username, password, nickname, email, authority_id) VALUES
      ('MANAGER1', '$2a$10$ZYPlIVx3aQED1LRGb1vrNeSezD3.rARxjmOYeBksGf0bC0dAzBIzy', '사장님1', 'manager1@mail.com', 2)
;

-- 샘플 칵테일
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Clover Club', '/img/menu/CloverClub.png', 'Dry shake ingredients to emulsify, add ice, shake and served straight up.', -1);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Americano', '/img/menu/Americano.png', 'Pour the Campari and vermouth over ice into glass, add a splash of soda water and garnish with half orange slice.', -1);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Bellini', '/img/menu/Bellini.png', 'Pour peach purée into chilled flute, add sparkling wine. Stir gently.', 1);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Blue Hawaii', '/img/menu/BlueHawaii.png', 'Shake all ingredients with ice, strain into a cocktail glass, and serve.', 2);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Aviation', '/img/menu/Aviation.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and strain into cocktail glass. Garnish with a cherry.', 3);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Black Russian', '/img/menu/BlackRussian.png', 'Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.', 4);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Butter Rum', '/img/menu/ButterRum.png', 'Blend together in a blender. Serve in a chilled Beer mug with Fresh Blueberries and caramel for topping.', 5);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Cosmopolitan', '/img/menu/Cosmopolitan.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and double strain into large cocktail glass.', 6);

INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Eggnog', '/img/menu/Eggnog.png', 'Dry shake ingredients to emulsify, add ice, shake and served straight up.', 7);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('God Father', '/img/menu/GodFather.png', 'Pour the Campari and vermouth over ice into glass, add a splash of soda water and garnish with half orange slice.', 8);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Grog', '/img/menu/Grog.png', 'Pour peach purée into chilled flute, add sparkling wine. Stir gently.', -1);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Hot Teddy', '/img/menu/HotTeddy.png', 'Shake all ingredients with ice, strain into a cocktail glass, and serve.', 9);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Hurricane', '/img/menu/Hurricane.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and strain into cocktail glass. Garnish with a cherry.', 10);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Iced Tea With Lemon', '/img/menu/IcedTeaWithLemon.png', 'Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.', 11);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Irish Cream', '/img/menu/IrishCream.png', 'Blend together in a blender. Serve in a chilled Beer mug with Fresh Blueberries and caramel for topping.', 12);
INSERT INTO ctt_menu (name, img_url, info, sequence) VALUES
    ('Kir Royale', '/img/menu/KirRoyale.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and double strain into large cocktail glass.', 13);



