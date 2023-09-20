FROM node:19

WORKDIR .
COPY package.json .
RUN yarn install
COPY . .
CMD yarn start