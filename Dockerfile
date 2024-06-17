FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
