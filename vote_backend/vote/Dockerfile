FROM node:9.6.1

WORKDIR /backend
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
COPY . ./backend