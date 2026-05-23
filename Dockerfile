# Use a lightweight web server meant for HTML/CSS/JS
FROM nginx:alpine

# Clean out default landing pages
RUN rm -rf /usr/share/nginx/html/*

# Copy your game files from the Maven webapp folder into Nginx's public folder
COPY src/main/webapp/index.html src/main/webapp/style.css src/main/webapp/script.js /usr/share/nginx/html/

# Nginx naturally runs on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
