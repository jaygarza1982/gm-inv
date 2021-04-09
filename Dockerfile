FROM node:14-alpine

WORKDIR /app

#Copy and install node dependencies
COPY package-lock.json .
COPY package.json .
RUN npm install
RUN npm install nodemon -g

#Copy code
COPY . .

#Export port and run our start command
EXPOSE 3000
CMD [ "npm", "start" ]