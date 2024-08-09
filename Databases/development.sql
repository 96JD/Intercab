DROP DATABASE IF EXISTS Intercab;
CREATE DATABASE Intercab;
USE Intercab;

CREATE TABLE Companies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(name) >= 3),
    address VARCHAR(100) NOT NULL UNIQUE CHECK (LENGTH(address) >= 10)
);

CREATE TABLE Reports (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL CHECK (LENGTH(name) >= 10),
    path VARCHAR(255) NOT NULL CHECK (LENGTH(path) >= 10),
    is_generated TINYINT NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Companies(id)
);

CREATE TABLE Trips (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    license_number VARCHAR(15) NOT NULL CHECK (LENGTH(license_number) >= 5),
    car_number VARCHAR(10) NULL,
    price DECIMAL(10, 2) NOT NULL,
    start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    report_id INT NOT NULL,
    FOREIGN KEY (report_id) REFERENCES Reports(id)
);

INSERT INTO Companies VALUES (1, "Absoluit", "Tvetenveien 152, 0671 Oslo");
INSERT INTO Companies VALUES (2, "DNB", "Markens gate 19, 4612 Kristiansand");
INSERT INTO Companies VALUES (3, "Handelsbanken", "Markens gate 34, 4612 Kristiansand");
INSERT INTO Companies VALUES (4, "NETS", "Haavard Martinsensvei 54, 0978 Oslo");
INSERT INTO Companies VALUES (5, "Ridel", "Bosmyrkollen 2, 4620 Kristiansand");
INSERT INTO Companies VALUES (6, "Tesla", "Avenyen 21, 4636 Kristiansand");
INSERT INTO Companies VALUES (7, "TTT", "Eivind Jarls gate 16 A, 4631 Kristiansand");
INSERT INTO Companies VALUES (8, "Vipps", "Robert Levins Gate 5, 0150 Oslo");
