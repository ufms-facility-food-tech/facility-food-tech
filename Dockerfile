FROM node:lts-alpine as node
COPY . .
RUN npm ci
RUN npm run build

FROM caddy:alpine
COPY --from=node /build/client /srv
EXPOSE 80
