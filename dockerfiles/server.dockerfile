FROM node:12.16.1

COPY ./Server/ ./Application/Server
COPY ./package.json ./Application
COPY ./package-lock.json ./Application

WORKDIR ./Application
RUN npm install

WORKDIR ./Server

ENV DB_HOST_IP
ENV DB_USER
ENV DB_PASS
ENV DB_PORT

EXPOSE 3002

CMD ["node", "server.js"]
