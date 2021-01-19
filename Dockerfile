FROM node:12
RUN npm install --global gulp-cli
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD gulp watch