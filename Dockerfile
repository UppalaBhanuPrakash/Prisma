# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema and migrations
COPY prisma ./prisma

# Copy rest of application
COPY . .

# Generate Prisma Client inside the container
RUN npx prisma generate

# Expose API port
EXPOSE 3000

# Run the server
CMD ["npm", "start"]
