FROM node:lts-alpine AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY app/ ./app/
COPY public/favicon.ico ./public/
COPY public/images/static/ ./public/images/static/
COPY .gitignore .prettierrc .prettierignore biome.json postcss.config.js tailwind.config.js tsconfig.json vite.config.ts ./
RUN npm run build

FROM caddy:alpine
COPY --from=build /build/client /srv
