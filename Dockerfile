# Use the official Node.js 18-alpine image as the base image
FROM node:20-alpine AS build_image

# Set the working directory in the container
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application's source code to the container
COPY . .

# Build the React.js application
RUN npm run build

# Use the official Nginx image as the base image
FROM nginx:1.21-alpine

# Copy the build output from the build image to the Nginx image
COPY --from=build_image /app/frontend/dist /usr/share/nginx/html

# Expose the port that the Nginx server listens on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
