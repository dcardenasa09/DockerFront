# Etapa 1: Construcción de la aplicación React
FROM node:16 AS build

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos de configuración necesarios
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Servidor NGINX para servir la aplicación compilada
FROM nginx:stable-alpine

# Copiar los archivos construidos en la etapa anterior al contenedor de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copiar archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
