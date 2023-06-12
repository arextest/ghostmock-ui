FROM node:18.14.2-alpine3.17

# Create app directory
WORKDIR /usr/src/app
COPY . .

# RUN npm install  --loglevel verbose
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run","serve"]

