FROM node:14.17.4

WORKDIR /app


COPY package*.json ./

# when we build image
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm install

COPY . .

EXPOSE 5000

# when we run image
CMD ["npm", "run", "dev"]