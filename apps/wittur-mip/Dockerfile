# Utiliza una imagen base de Node.js
FROM node:lts-alpine AS base

# Establece el directorio de trabajo en /app
WORKDIR /app

RUN corepack enable

# Copia los archivos necesarios para la instalación de dependencias
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./yarn/releases

# Instala las dependencias
RUN yarn --immutable

# Copia el resto del código fuente del monorepo
COPY . .

# Construye los proyectos del monorepo
RUN yarn nx run build wittur-mip --configuration=production

# --- Stage 2: Crear la imagen de producción ---
FROM node:lts-alpine AS production

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia solo las dependencias de producción desde la fase anterior
COPY --from=base /app/node_modules ./node_modules

# Copia los archivos de compilación necesarios desde la fase anterior
COPY --from=base /app/dist ./dist

# Copia otros archivos necesarios (ajusta según tus necesidades)
COPY --from=base /app/package.json ./
COPY --from=base /app/yarn.lock ./

# Configuración por defecto de la aplicación (ajusta según tu configuración de NestJS)
ENV PORT=3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/apps/your-app-name/main.js"]
