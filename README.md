# frenmily-server
testing

//install Routing in React-Native:
yarn add react-router-native @types/react-router-native react-router @types/react-router

docker build -t frienmily-node-server:latest .

yarn add @types/aws-sdk  aws-sdk 


## docker-cli
docker login

docker pull <your-account-name>/<your-repo-name>:<tagname>
docker pull rk6866/frienmily:latest 

docker push <your-account-name>/<your-repo-name>:<tagname>
docker push rk6866/frienmily:latest 

docker tag frienmily:latest rk6866/frienmily:latest  
docker tag <your-local-image-tag>:<tagname>  <your-account-name>/<your-repo-name>:<tagname>  


## docker 
```bash
docker build -t frienmily .\
&&\
docker run -d -it --env-file envfile --name=frienmily-container -p 8080:8080   frienmily

```


## docker-compose
```bash
docker-compose --env-file envfile  up -d 

```