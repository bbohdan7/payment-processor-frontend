FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
ADD package.json /usr/src/app/package.json

RUN npm install
RUN npm install react-script -g
COPY . .
EXPOSE 3000

cmd ["npm", "run", "start"]
