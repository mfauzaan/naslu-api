FROM node:12-alpine

EXPOSE 3001 5001

RUN mkdir /app
WORKDIR /app
ADD package.json /app
ADD . /app
RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]