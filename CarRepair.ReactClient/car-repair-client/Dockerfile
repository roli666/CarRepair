FROM node:12.18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
