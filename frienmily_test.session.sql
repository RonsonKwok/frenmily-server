CREATE TABLE users (
  id SERIAL primary key,
  username text not null,
  is_male boolean,
  firstName text default null,
  lastName text default null,
  password text not null,
  mobile text default null,
  email text default null,
  isActive boolean not null default true,
  profile_picture text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

CREATE TABLE groups(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "groupname" TEXT NOT NULL,
    "shopping_list_id" INTEGER NOT NULL,
    "is_family_group" BOOLEAN NOT NULL,
    "profile_picture" TEXT NOT NULL
);

CREATE TABLE user_friends(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_friend_id" INTEGER NOT NULL
);

CREATE TABLE group_members(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL
);
--
INSERT INTO users (username, password, mobile)
VALUES('mike', '1111', '1111')