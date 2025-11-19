FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files first (leverage Docker layer caching)
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN npm install --frozen-lockfile --prod

# Copy the rest of the application code
COPY . .

# Ensure Prisma files and environment variables are included
COPY prisma ./prisma
# COPY .env ./

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Define the startup command
CMD ["node", "dist/main.js"]