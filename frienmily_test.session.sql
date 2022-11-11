CREATE TABLE users (
  id SERIAL primary key,
  username text not null,
  password text not null,
  mobile text default null,
  firstName text default null,
  lastName text default null,
  email text default null,
  isActive boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
--
INSERT INTO users (username, password, mobile)
VALUES('mike', '1111', '1111')