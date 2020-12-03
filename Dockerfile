FROM node:13

COPY . /app
WORKDIR /app
RUN npm run-script build

EXPOSE 80

CMD node ./server.js