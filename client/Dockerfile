FROM node:17-alpine

WORKDIR /app


COPY package.json .

# when we build image
RUN npm install

COPY . .

EXPOSE 8080

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# when we run image
CMD [ "npm", "run", "dev" ]