FROM node:latest

# Set working directory
WORKDIR /api

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .


# Start the app with nodemon
CMD ["npm", "run", "devStart"]

