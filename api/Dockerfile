FROM maven:3.9.8-eclipse-temurin-21 as build
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.m2 ./mvnw -f /app/pom.xml clean package

FROM eclipse-temurin:21.0.4_7-jdk
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT java -jar /app.jar
