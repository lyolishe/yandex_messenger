FROM node:13

COPY . /app
WORKDIR /app
RUN npm run-script build

EXPOSE 80

# При старте контейнер выполнит эту команду – запустит наше приложение
CMD node ./server.js