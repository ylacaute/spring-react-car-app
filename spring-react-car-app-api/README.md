

# Start spring boot
mvn spring-boot:run

# Build docker image
mvn install dockerfile:build

# Start docker
All assets (cars) are supposed to be in /static for this example : 
docker run -i -p 8080:8080  -v /static:/static -t ylacaute/spring-react-car-app-api:latest

# Push docker image
mvn dockerfile:push

