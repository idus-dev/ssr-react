FROM node:dubnium-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --silent

# Bundle app source
COPY . .
RUN npm run --silent build

EXPOSE 8080
CMD [ "npm", "run", "production" ]