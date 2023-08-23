FROM node:18-alpine

WORKDIR /server

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 10000

CMD [ "npm", "start" ]