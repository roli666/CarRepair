FROM node:14.16.1-alpine3.13

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts -g

# add app
COPY . .

# start app
CMD ["npm", "start"]
