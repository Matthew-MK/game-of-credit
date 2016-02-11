FROM node:5.5.0
ENV NODE_ENV "production"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8000
CMD [ "npm", "start" ]
