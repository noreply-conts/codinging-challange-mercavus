FROM node:12.4.0-alpine as builder
LABEL stage=intermediate

WORKDIR /srv
COPY . .

RUN apk add git

# install dependencies and compile TS to JS
RUN yarn && yarn build

# prune non-production dependencies (to be copied over later)
RUN yarn install --production

# ---
FROM node:12.4.0-alpine as runner
EXPOSE 3000

RUN apk add --no-cache tzdata
ENV TZ Europe/Berlin

COPY --from=builder /srv/dist /srv
COPY --from=builder /srv/node_modules /srv/node_modules

RUN mkdir /srv/tmp

WORKDIR /srv

CMD ["node", "Main.js"]
