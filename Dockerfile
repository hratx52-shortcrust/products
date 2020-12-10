FROM node:15
WORKDIR /docker-app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 3142
CMD [ "npm", "start"]

# Some useful commands:
# sudo docker build .
# sudo docker build -t jessepye/sdc_products .
# sudo docker run -p 5000:8080 b909406d737