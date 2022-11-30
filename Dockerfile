FROM node:14-stretch
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install && \ 
    # yarn knex migrate:latest --env production &&\
    # yarn knex seed:run &&\
    yarn start