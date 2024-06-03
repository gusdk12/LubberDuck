

-- 샘플 authority
INSERT INTO ctt_authority (name) VALUES
    ('ROLE_CUSTOMER'), ('ROLE_MANAGER')
;

-- 샘플 user
INSERT INTO ctt_user (username, password, name, email) VALUES
      ('MANAGER1', '$2a$10$ZYPlIVx3aQED1LRGb1vrNeSezD3.rARxjmOYeBksGf0bC0dAzBIzy', '사장님1', 'manager1@mail.com')
;

-- 샘플 사용자-권한
INSERT INTO ctt_user_authorities VALUES
        (1, 1),
        (1, 2)
;

-- 샘플 칵테일
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Colver Club', '/img/menu/CloverClub.png', 'Dry shake ingredients to emulsify, add ice, shake and served straight up.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Americano', '/img/menu/Americano.png', 'Pour the Campari and vermouth over ice into glass, add a splash of soda water and garnish with half orange slice.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Bellini', '/img/menu/Bellini.png', 'Pour peach purée into chilled flute, add sparkling wine. Stir gently.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Blue Hawaii', '/img/menu/BlueHawaii.png', 'Shake all ingredients with ice, strain into a cocktail glass, and serve.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Aviation', '/img/menu/Aviation.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and strain into cocktail glass. Garnish with a cherry.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Black Russian', '/img/menu/BlackRussian.png', 'Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Butter Rum', '/img/menu/ButterRum.png', 'Blend together in a blender. Serve in a chilled Beer mug with Fresh Blueberries and caramel for topping.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Cosmopolitan', '/img/menu/Cosmopolitan.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and double strain into large cocktail glass.');

INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Eggnog', '/img/menu/Eggnog.png', 'Dry shake ingredients to emulsify, add ice, shake and served straight up.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('God Father', '/img/menu/GodFather.png', 'Pour the Campari and vermouth over ice into glass, add a splash of soda water and garnish with half orange slice.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Grog', '/img/menu/Grog.png', 'Pour peach purée into chilled flute, add sparkling wine. Stir gently.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Hot Teddy', '/img/menu/HotTeddy.png', 'Shake all ingredients with ice, strain into a cocktail glass, and serve.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Hurricane', '/img/menu/Hurricane.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and strain into cocktail glass. Garnish with a cherry.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Iced Tea With Lemon', '/img/menu/IcedTeaWithLemon.png', 'Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Irish Cream', '/img/menu/IrishCream.png', 'Blend together in a blender. Serve in a chilled Beer mug with Fresh Blueberries and caramel for topping.');
INSERT INTO ctt_menuplate (name, img_url, info) VALUES
    ('Kir Royale', '/img/menu/KirRoyale.png', 'Add all ingredients into cocktail shaker filled with ice. Shake well and double strain into large cocktail glass.');



