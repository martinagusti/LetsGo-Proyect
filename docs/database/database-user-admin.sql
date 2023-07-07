INSERT INTO USERS (name, lastName, userName, email, password, createAt, role, image, verificationCode, bio) values
	("Carlos", "Fernandez", "Carlos", "carlos@gmail.com", "1234", "2023-05-12 11:50:37", "admin", "", "", "Apacionado por la programacion"),
    ("Giancarlo", "Molina", "Giancarlo", "giancarlo@gmail.com", "1234", "2023-05-12 11:50:37", "admin", "", "", "Apacionado por la programacion"),
    ("Gustavo", "Tejera", "Gustavo", "cgustavo@gmail.com", "1234", "2023-05-12 11:50:37", "admin", "", "", "Apacionado por la programacion"),
    ("Martin", "Agusti", "martinagusti3", "martinagusti@hotmail.com", "$2b$12$OLlzRPSCCo84SdWiSHHwLOKHpoa6hnD3StquaMiQ91HqM6zXWJ.k.", "2023-05-12 11:50:37", "admin", "5-FF2l8s1WxP.jpg", "7LTUOxHU9K2kmckNHy7ttaJlgo80LfvByIm2ugGnVZe8D3KMs91NhEgsnrWYrOkW", "Apacionado por la programacion"),
    ("Martin2", "Agusti", "martinagusti2", "martinhagusti@gmail.com", "$2b$12$fzuNLVcLUdefSeNqnh1/kOnArIyI6fooGlmlKL7br7Sqg7kUbXdF.", "2023-05-12 11:50:37", "admin", "5-FF2l8s1WxP.jpg", "7LTUOxHU9K2kmckNHy7ttaJlgo80LfvByIm2ugGnVZe8D3KMs91NhEgsnrWYrOkW", "Apacionado por la programacion");
    
    
    INSERT INTO TRIPS (IdUser, title, createAt, dateExperience, category, city, excerpt, description, image) VALUES 
    (14, "Viaje a Venecia", "2023-05-12 11:50:37", "2022-03-05", "viaje-negocios", "Venecia", "Viaje a venecia por negocios", "Volveria, muy recomendable", ""),
    (15, "Viaje a Madrid", "2023-05-12 11:50:37", "2022-03-05", "viaje-negocios", "Madrid", "Viaje  por negocios", "Volveria, muy recomendable", ""),
    (17, "Viaje a Barcelona", "2023-05-12 11:50:37", "2022-03-05", "viaje-familiar", "Barcelona", "Viaje familiar", "Volveria, muy recomendable", ""),
    (17, "Viaje a Galicia", "2023-05-12 11:50:37", "2022-03-05", "viaje-playero", "Galicia", "Viaje a la costa", "Volveria, muy recomendable", ""),
    (18, "Viaje a Mallorca", "2023-05-12 11:50:37", "2022-03-05", "viaje-playero", "Mallorca", "Viaje  playero", "Volveria, muy recomendable", "");
    
    INSERT INTO VOTES (IdUser, IdTrip) VALUES
    (17, 28),(17, 29),(17, 30),(18, 28),(18, 29),(18, 30),(14, 29),(14, 30),(14, 31),(15, 30),(15, 31),(15, 32);
    
    INSERT INTO comentaries (IdUser, IdTrip, comentaries ) VALUES 
    (17, 28, "Excelente"),(17, 29, "todo muy bien"),(17, 30, "No me ha gustado"),(18, 28, "ok"),(18, 29, "todo muy bien"),(18, 30, "ok"),(14, 29, "todo muy bien"),(14, 30, "No me ha gustado"),(14, 31, "todo muy bien"),(15, 30, "todo muy bien"),(15, 31, "todo muy bien"),(15, 32, "No me ha gustado");