FROM node:22.20-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

COPY package.json .

RUN npm install && npm cache clean --force

COPY . .

RUN chown -R nodejs:nodejs /app

USER nodejs

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
