# FROM node:10 as build
# LABEL description="This is a multi-stage NodeJS image"
# WORKDIR /src
# COPY package*.json .
# RUN npm install
# COPY . .

# FROM node:10-slim
# WORKDIR /src 
# COPY --from=build /src .
# EXPOSE 9000
# CMD ["node", "app.js"]

# Use a recent Node.js version
FROM node:18-alpine as build
#LABEL description="This is a multi-stage NodeJS image"

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Final image
FROM node:18-alpine
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Expose the port and define the command to run the application
EXPOSE 9000
CMD ["node", "app.js"]
