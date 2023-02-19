# #dockerfile created by ruffi0

# build stage
FROM node:14-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache git
RUN git --version
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
# Add nginx config
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/player/client.js /usr/share/nginx/html/client.js
COPY docker/player/CODEC.wasm /usr/share/nginx/html/CODEC.wasm
# RUN envsubst /usr/src/app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
