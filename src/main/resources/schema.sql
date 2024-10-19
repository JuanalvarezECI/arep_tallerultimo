CREATE TABLE properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    size DOUBLE NOT NULL,
    description TEXT NOT NULL
);