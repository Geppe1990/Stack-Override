FROM node:10.13
WORKDIR /app
COPY package.json .
RUN npm install --global gulp-cli
RUN npm install
EXPOSE 8000
CMD ["npm","start"]