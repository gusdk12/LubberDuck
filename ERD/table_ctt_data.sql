

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

