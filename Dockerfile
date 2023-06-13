FROM node:18.14.2-alpine3.17

# Create app directory
WORKDIR /usr/src/app
COPY . .

RUN npm install vite -g
RUN npm install  --loglevel verbose
RUN npm run build
# RUN npm install pnpm -g
# RUN pnpm install  --loglevel verbose
# RUN pnpm run build


EXPOSE 3000
CMD [ "npm", "run","serve"]

