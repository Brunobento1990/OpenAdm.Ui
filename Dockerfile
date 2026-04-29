FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
#RUN npm run build
RUN npm run build && rm -rf node_modules && npm install --production --legacy-peer-deps

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 7154
ENV TZ=America/Sao_Paulo
CMD ["npm", "run","start"]
