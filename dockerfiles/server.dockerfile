FROM node:12.16.1

COPY ./Server/ ./Application/Server
COPY ./package.json ./Application
COPY ./package-lock.json ./Application

WORKDIR ./Application
RUN npm install

WORKDIR ./Server

EXPOSE 3002

CMD ["node", "server.js"]
