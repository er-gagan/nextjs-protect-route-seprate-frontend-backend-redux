export const create_client_table = `create table if not exists Client (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) unique not null,
    email varchar(500),
    website varchar(2000),
    phone varchar(500),
    address text
)`
