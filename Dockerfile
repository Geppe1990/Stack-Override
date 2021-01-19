FROM node:10
WORKDIR /app
COPY . /app/
RUN npm install --global gulp-cli
RUN npm install
CMD ["npm","start"]