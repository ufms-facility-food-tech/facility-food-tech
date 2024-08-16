# base node image
FROM node:lts-alpine as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /srv

ADD package.json ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /srv

COPY --from=deps /srv/node_modules /srv/node_modules
ADD package.json ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

WORKDIR /srv

COPY --from=deps /srv/node_modules /srv/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /srv

COPY --from=production-deps /srv/node_modules /srv/node_modules

COPY --from=build /srv/build /srv/build
COPY --from=build /srv/public /srv/public
ADD . .

CMD ["npm", "start"]