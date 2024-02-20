# install a node js with alpine os
FROM node:12-alpine

# my contact and add some meta-data for unique image
LABEL maintainer="david.laun@epitech.eu"

# Create /app folder in container
WORKDIR /app

# Copy all files in /app container
COPY . /app

# Install node app dependancies
RUN npm install

# open the 80 port
EXPOSE 80

# command to run the app
CMD ["npm", "start"]
