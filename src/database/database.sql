-- Active: 1694122035865@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "u001",
        "Danielle",
        "danielle@email.com",
        "danielle123",
        "NORMAL"
    ), (
        "u002",
        "Bruno",
        "bruno@email.com",
        "bruno123",
        "ADMIN"
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

INSERT INTO
    posts (
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES (
        'p001',
        'u001',
        'Fala galera, quem diria que ia ver o Bruno aprendendo alguma coisa de programção.kkkk',
        0,
        0
    ),(
        'p002',
        'u002',
        'Fala galera, quem diria que ia comprender um pouco de programação!Estou aprandendo cada dia mais!',
        0,
        0
    );

    CREATE TABLE
    likes_deslikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );
    INSERT INTO likes_deslikes (user_id, post_id, like)
    VALUES (
        'u001',
        'p001',
        0
    ),(
        'u002',
        'p002',
        0
    );