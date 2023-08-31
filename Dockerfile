FROM node:latest
WORKDIR /usr


COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY public/ public
COPY src/ src
RUN npm install
EXPOSE 3000
CMD ["npm","start"]