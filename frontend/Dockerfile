# Step 1: Build React
FROM node:18-alpine as build-stage
WORKDIR /app
COPY react-app/package*.json ./
RUN npm install
COPY react-app/ .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
# Config nginx akan di-inject via docker-compose
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]