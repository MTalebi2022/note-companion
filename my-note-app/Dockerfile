FROM node:20 as build

WORKDIR /client-note

COPY package*.json .

RUN npm install

COPY . .



RUN npm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /client-note/build /usr/share/nginx/html