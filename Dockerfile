FROM node:lts-alpine AS build
COPY . .
RUN npm ci
RUN npm run build

FROM caddy:alpine
COPY --from=build /build/client /srv/client
COPY --from=build /build/server /srv/server
