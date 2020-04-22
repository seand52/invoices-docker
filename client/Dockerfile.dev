FROM node:alpine
WORKDIR /app
COPY ${PWD}/package.json ./
RUN yarn
COPY . .
CMD ["yarn", "start"]