
FROM node:18-alpine

WORKDIR /app

COPY react-app .

RUN npm install
RUN npm run build

RUN npm install -g serve

CMD ["serve","-s","build","-l","3000"]
