

-- 샘플 authority
INSERT INTO ctt_authority (name) VALUES
    ('ROLE_CUSTOMER'), ('ROLE_MANAGER')
;

-- 샘플 user
INSERT INTO ctt_user (username, password, nickname, email, authority_id) VALUES
      ('MANAGER1', '$2a$10$ZYPlIVx3aQED1LRGb1vrNeSezD3.rARxjmOYeBksGf0bC0dAzBIzy', '사장님1', 'manager1@mail.com', 2)
;
INSERT INTO ctt_user (username, password, nickname, email, authority_id) VALUES
    ('USER1', '$2a$10$ZYPlIVx3aQED1LRGb1vrNeSezD3.rARxjmOYeBksGf0bC0dAzBIzy', '손님1', 'user1@mail.com', 1)
;
INSERT INTO ctt_user (username, password, nickname, email, authority_id) VALUES
    ('USER2', '$2a$10$ZYPlIVx3aQED1LRGb1vrNeSezD3.rARxjmOYeBksGf0bC0dAzBIzy', '손님2', 'user2@mail.com', 1)
;


INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (2, 3, 1)
;
INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (2, 4, 2)
;
INSERT INTO ctt_cart (user_id, cocktail_id, quantity) VALUES
    (3, 4, 2)
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

-- 메뉴 모음집
INSERT INTO ctt_menu (name, img_url, info, price) VALUES
  ('Americano', '/img/menu/Americano.png', '미국인들이 밀라노-토리노의 씁쓸한 맛을 부드럽게 마시기 위해 탄산수를 섞어 만든 칵테일 (14도)', 0),
  ('Aviation', '/img/menu/Aviation.png', '비행기 하늘을 연상시키는 보라빛 빛깔과 풍미를 가진 클래식 칵테일 (27도)', 0),
  ('Bellini', '/img/menu/Bellini.png', '아름답고 화사한 색으로 복숭아의 상큼함과 샴페인의 탄산이 조화를 이루는 칵테일 (10도)', 0),
  ('Black Russian', '/img/menu/BlackRussian.png', '커피 리큐르의 달콤함과 보드카를 한번에 즐길 수 있는 도수 높은 칵테일 (33도)', 0),
  ('Blue Hawaii', '/img/menu/BlueHawaii.png', '푸른 바다로 둘러싸인 하와이 섬을 연상시키며 상쾌한 맛이 강한 트로피컬 칵테일 (11도)', 0),
  ('Hot Buttered Rum', '/img/menu/ButterRum.png', '향긋한 향신료의 향과 버터의 고소하고 부드러운 맛과 함께 겨울철의 따뜻함과 친근함을 느낄 수 있는 따뜻한 칵테일 (15도)', 0),
  ('Clover Club', '/img/menu/CloverClub.png', '1910년대 뉴욕의 클럽인 "클로버 클럽"에서 탄생한 예쁜 분홍빛의 라즈베리 색의 새콤한 맛이 강한 칵테일 (24도)', 0),
  ('Cosmopolitan', '/img/menu/Cosmopolitan.png', '예쁜 선홍빛 색으로 향긋하고 달콤한 맛을 가진 높은 도수의 칵테일 (26도)', 0),
  ('Eggnog', '/img/menu/Eggnog.png', '미국인들이 크리스마스에 즐겨 마시는 부드럽고 달콤한 맛을 가진 흰색 칵테일 (16도)', 0),
  ('Godfather', '/img/menu/GodFather.png', '강렬한 위스키의 첫 맛과 달달하고 향긋한 아마레또의 향으로 마무리 되어 영화 "대부"가 연상되는 상남자 느낌의 칵테일 (37도)', 0),
  ('Grog', '/img/menu/Grog.png', '영국 해군에서 생겨나 레몬의 신맛과 설탕의 단맛, 럼의 쓴맛을 함께 느낄 수 있는 칵테일 (8도)', 0),
  ('Hot Toddy', '/img/menu/HotTeddy.png', '스코틀랜드에서 감기나 독감에 걸렸을 때 마시던 따뜻하고 부드러운 맛을 가진 칵테일 (12도)', 0),
  ('Hurricane', '/img/menu/Hurricane.png', '처음의 충격과 충격이 지나간 후에 흔적이 남는 허리케인처럼 여름에 어울리는 깔끔하고 상쾌한 맛을 가진 트로피컬 칵테일 (26도)', 0),
  ('Long Island Iced Tea', '/img/menu/IcedTeaWithLemon.png', '달달하고 부드러운 맛이 특징이며 강한 도수 때문에 칵테일계의 폭탄주라고 불리는 칵테일 (29도)', 0),
  ('Irish Coffee', '/img/menu/IrishCream.png', '고소한 풍미의 커피 향과 위스키의 조화로 달콤한 휘핑크림을 얹어 단맛과 쓴맛이 매력적인 칵테일 (14도)', 0),
  ('Kir Royale', '/img/menu/KirRoyale.png', '샴페인의 청량함과 카시스의 달콤함으로 부드럽고 달콤한 매력적인 맛을 가진 칵테일 (14도)', 0),
  ('Lemonade Classic', '/img/menu/LemonadeClassic.png', '진 베이스로 레몬의 새콤함과 시원한 맛을 가진 칵테일 (12도)', 0),
  ('Mai-Tai', '/img/menu/MaiTai.png', '열대과일의 풍부한 향이 조화를 이루며 트로피컬 칵테일의 여왕이라고 불리는 칵테일 (30도)', 0),
  ('Dry Martini', '/img/menu/MartiniDry.png', '칵테일의 제왕이라고 불리며 고유한 씁쓸한 맛과 올리브의 짠맛을 음미할 수 있는 칵테일 (37도)', 0),
  ('Mojito', '/img/menu/Mojito.png', '민트의 시원한 청량감과 달달함이 섞인 입체적인 맛을 가진 칵테일 (19도)', 0),
  ('Mulled Apple Cider', '/img/menu/MulledAppleCider.png', '따뜻한 사과 사이다에 향신료의 향이 잘 스며들어 부드럽고 향긋한 향이 가득한 칵테일 (10도)', 0),
  ('Mulled Wine', '/img/menu/MulledWine.png', '와인에 4가지 과일과 5가지 향신료를 넣고 끓여 만든 낮은 도수의 칵테일 (6도)', 0),
  ('Old Fashioned', '/img/menu/OldFashioned.png', '"비터드슬링"이라 불리며 위스키, 설탕, 비터스 세 가지의 조합의 칵테일 (33도)', 0),
  ('Tequila Sunrise', '/img/menu/OrangeIcedFreshJuice.png', '데킬라의 향과 오렌지의 달달함이 느껴지며 해 뜰 때의 붉은 하늘을 연상시키는 칵테일 (15도)', 0),
  ('Planters Punch', '/img/menu/PlantersPunch.png', '럼 베이스로 신맛과 단맛이 어우러지는 과일 위주의 맛을 가진 칵테일 (20도)', 0),
  ('Rob Roy', '/img/menu/RobRoy.png', '위스키의 향과 스윗 베르뭇의 달콤한 맛이 잘 어우러지며 비터의 씁쓸한 맛으로 깔끔하게 마무리 해주는 칵테일 (32도)', 0),
  ('Sazerac', '/img/menu/Sazerac.png', '상큼한 레몬의 풍미와 상쾌한 허브, 향긋한 아니스의 조합으로 부드러운 질감과 은은한 단맛이 환상적인 밸런스를 이룬 칵테일 (35도)', 0),
  ('Screwdriver', '/img/menu/ScrewDriver.png', '오렌지의 새콤한 향과 단맛으로 보드카의 독한 맛을 잡아주어 쉽게 접할 수 있는 칵테일 (13도)', 0),
  ('Sea Breeze', '/img/menu/SeaBreeze.png', '"바다에서 불어오는 바람"이라는 뜻으로 크렌베리와 자몽주스로 새콤달콤한 맛을 가진 칵테일 (8도)', 0),
  ('Singapore Sling', '/img/menu/SingaporeSling.png', '여성들을 위한 과일주스처럼 예쁜 붉은 색의 상큼하고 단맛을 가진 칵테일 (11도)', 0),
  ('Strawberry Lemonade', '/img/menu/StrawberryLomonade.png', '아름답고 상큼하고 다채로운 여름의 맛을 내어 반하게 만드는 기분 좋은 칵테일 (9도)', 0),
  ('Strawberry Peach Smoothie', '/img/menu/StrawberryPeachSmoothie.png', '달콤하고 상큼한 맛과 크리미한 질감으로 더운 여름 날에 남녀노소 모두가 즐길 수 있는 칵테일 (9도)', 0),
  ('Tom & Jerry', '/img/menu/Tom&Jerry.png', '미국 남부지방에서 즐겨 마시던 달걀 노른자와 흰자를 따로 거품 내어 럼과 브랜디를 섞어서 만든 따뜻한 칵테일 (20도)', 0),
  ('Watermelon Fresh Juice', '/img/menu/WatermelonFreshJuice.png', '가벼운 거품과 수박의 달콤함, 상큼한 라임의 맛이 더해져 더운 여름 날에 어울리는 칵테일 (9도)', 0),
  ('Watermelon Kiwi Smoothie', '/img/menu/WatermelonKiwiSmoothie.png', '시원하게 얼린 키위와 수박의 조합으로 새콤달콤한 맛과 함께 무더운 여름을 보낼 수 있는 가벼운 칵테일 9도)', 0),
  ('Whiskey Cola', '/img/menu/WhiskeyCola.png', '톡톡 터지는 콜라의 탄산과 은은한 계피향, 위스키가 만나 단맛이 더 강렬하게 피어오르는 칵테일 (15도)', 0),
  ('Whiskey Sour', '/img/menu/WhiskeySour.png', '레몬 주스와 설탕으로 신맛과 단맛이 부드럽게 조화를 이루는 칵테일 (18도)', 0),
  ('White Lady', '/img/menu/WhiteLady.png', '갓 짜낸 레몬 주스처럼 귀여운 연노랑색 빛깔의 상큼함과 세련되고 부드러운 크리미한 질감을 가진 칵테일 (30도)', 0),
  ('White Russian', '/img/menu/WhiteRussian.png', 'Black Russian에 크림을 첨가해 훨씬 부드럽고 중후한 맛을 가진 칵테일 (23도)', 0),
  ('Zombie', '/img/menu/Zombie.png', '여러 과일과 시럽의 조합으로 새콤달콤한 맛을 가졌지만 "Zombie" 이름처럼 될 수 있는 높은 도수의 칵테일 (31도)', 0)




