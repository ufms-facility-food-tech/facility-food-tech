FROM maven:3.9.8-eclipse-temurin-21 AS build
COPY api/ ./api/
COPY .mvn/ ./.mvn/
COPY mvnw mvnw.cmd pom.xml ./
ENV SPRING_PROFILES_ACTIVE=prod
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21.0.4_7-jdk
COPY --from=build /target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
