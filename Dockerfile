FROM node:boron-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
&& cnpm install

# Bundle app source
COPY . .

EXPOSE 3001

CMD echo "exports.sql = $SQL_URI; exports.isApiServer = $IS_API_SERVER;" > conf.js \
&& npm start