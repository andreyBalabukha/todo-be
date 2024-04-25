FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --only=production
CMD ["node", "/app/dist/server.js"]
