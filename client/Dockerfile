FROM node:10-alpine
WORKDIR /app
COPY ${PWD}/package.json ./
RUN yarn
COPY . . 
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html
#