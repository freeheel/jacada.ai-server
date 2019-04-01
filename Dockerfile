# You start off as the 'strongloop' user.
# Check out https://hub.docker.com/_/node to select a new base image
FROM node:6-slim

RUN apt-get update

RUN apt-get -y install python make gcc

# Set to a non-root built-in user `node`
#USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . .
#RUN sudo chown -R node .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]
