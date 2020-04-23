FROM node:10-alpine
WORKDIR /app
COPY ${PWD}/package.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:10-alpine
WORKDIR /app
COPY --from=0 /app ./
EXPOSE 5000
CMD ["sh", "-c", "yarn typeorm migration:run && yarn start:prod"]