
CREATE TABLE ctt_authority
(
    id   INT         NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE ctt_authority
    ADD CONSTRAINT UQ_name UNIQUE (name);

CREATE TABLE ctt_menuplate
(
    name    VARCHAR(100) NOT NULL,
    img_url VARCHAR(500) NOT NULL,
    info    LONGTEXT     NOT NULL,
    PRIMARY KEY (name)
) COMMENT '손님에게보이는메뉴';

ALTER TABLE ctt_menuplate
    ADD CONSTRAINT UQ_name UNIQUE (name);

CREATE TABLE ctt_user
(
    id       INT          NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name     VARCHAR(80)  NOT NULL,
    email    VARCHAR(80)  NOT NULL,
    regdate  DATETIME     NULL     DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE ctt_user
    ADD CONSTRAINT UQ_username UNIQUE (username);

CREATE TABLE ctt_user_authorities
(
    user_id      INT NOT NULL,
    authority_id INT NOT NULL,
    PRIMARY KEY (user_id, authority_id)
);

ALTER TABLE ctt_user_authorities
    ADD CONSTRAINT FK_ctt_user_TO_ctt_user_authorities
        FOREIGN KEY (user_id)
            REFERENCES ctt_user (id);

ALTER TABLE ctt_user_authorities
    ADD CONSTRAINT FK_ctt_authority_TO_ctt_user_authorities
        FOREIGN KEY (authority_id)
            REFERENCES ctt_authority (id);
