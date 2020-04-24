FROM node:10-alpine
WORKDIR /app
COPY ${PWD}/package.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 5000
CMD ["sh", "-c", "yarn typeorm migration:run && yarn start:prod"]