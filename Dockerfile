FROM node:18.17.1

WORKDIR /usr/src/app
COPY . .

RUN npm install && npm run build

COPY env-to-file.sh ./env-to-file.sh
RUN chmod +x ./env-to-file.sh

CMD ["./env-to-file.sh"]
