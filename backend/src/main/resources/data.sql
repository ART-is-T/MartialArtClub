-- Martial Arts
INSERT INTO schedule_entry (date, start_time, end_time, martial_art) VALUES
                                                                         ('2025-09-08', '18:00:00', '19:00:00', 'Каратэ'),
                                                                         ('2025-09-09', '19:00:00', '20:00:00', 'Айкидо'),
                                                                         ('2025-09-10', '17:30:00', '19:00:00', 'Дзюдо'),
                                                                         ('2025-09-11', '18:00:00', '19:30:00', 'Муай-тай'),
                                                                         ('2025-09-12', '19:00:00', '20:00:00', 'Айкидо'),
                                                                         ('2025-09-13', '12:00:00', '13:30:00', 'Каратэ'),
                                                                         ('2025-09-14', '15:00:00', '16:30:00', 'Муай-тай')
    ON CONFLICT DO NOTHING;
INSERT INTO martial_art (title, slug, description, bg_image, icon_image)
VALUES ('Каратэ', 'karate',
        'Каратэ — традиционное японское боевое искусство, основанное на ударах руками и ногами. Развивает силу и дисциплину.',
        '/images/karate_bg.jpg', '/images/karate.jpg') ON CONFLICT DO NOTHING;

INSERT INTO martial_art (title, slug, description, bg_image, icon_image)
VALUES ('Айкидо', 'aikido',
        'Айкидо — японское боевое искусство, использующее энергию противника против него самого. Отличается мягкой техникой.',
        '/images/aikido_bg.jpg', '/images/aikido.jpg')ON CONFLICT DO NOTHING;

INSERT INTO martial_art (title, slug, description, bg_image, icon_image)
VALUES ('Дзюдо', 'judo',
        'Дзюдо — олимпийский вид спорта, акцентирующий броски и удержания. Популярен во всем мире.',
        '/images/judo_bg.jpg', '/images/judo.jpg')ON CONFLICT DO NOTHING;

INSERT INTO martial_art (title, slug, description, bg_image, icon_image)
VALUES ('Тайский бокс', 'muaythai',
        'Муай-тай — боевое искусство Таиланда, знаменитое ударами локтями и коленями.',
        '/images/muaythai_bg.jpg', '/images/muaythai.jpg')ON CONFLICT DO NOTHING;

-- Trainers
INSERT INTO trainer (name, slug, martial_art, bio, photo_url, background_image)
VALUES ('Иван Карпов', 'ivan-karpov', 'Каратэ',
        'Мастер спорта по каратэ, чемпион Европы 2020 года. Более 15 лет тренерского опыта.',
        '/images/trainer1.jpg', '/images/karate_bg.jpg')ON CONFLICT DO NOTHING;

INSERT INTO trainer (name, slug, martial_art, bio, photo_url, background_image)
VALUES ('Саито Такеши', 'saito-takeshi', 'Айкидо',
        'Учился в Японии у мастеров айкидо. 20 лет практики, специализация – мягкие техники и философия.',
        '/images/trainer2.jpg', '/images/aikido_bg.jpg')ON CONFLICT DO NOTHING;

INSERT INTO trainer (name, slug, martial_art, bio, photo_url, background_image)
VALUES ('Мария Иванова', 'maria-ivanova', 'Дзюдо',
        'Призёр чемпионатов РБ, сертифицированный тренер по дзюдо. Работает с детьми и подростками.',
        '/images/trainer3.jpg', '/images/judo_bg.jpg')ON CONFLICT DO NOTHING;