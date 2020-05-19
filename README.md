# Image Repository 
This is a Single Page Application that is created using MySQL, ExpressJS, AngularJS and NodeJS. This application is developed as part of [Shopify Internship challenge](https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit#).


#### The application has the following features:
1. Upload one/bulk images
2. Display images
3. Load images on scroll to reduce the latency in displaying them
4. Dockerized the application by splitting it into two containers, one for the frontend and the other for backend


#### Yet to complete:
1. Add Authentication for the application
2. Display images based on their visibility as public/private
3. Delete the images

# Instructions to run the Application using Docker Compose
1. Install MySQL database on your machine
2. Add mysql database details in docker-compose.yml file below the environment
2. Install Docker on your machine with virtual Box
3. Run the command `docker-machine ip` on your docker terminal and place the ip address in docker-compose.yml file corresponding to `DB_HOST_IP`
4. Add port forwarding rules in the virtual Box by following the below steps:

   `Virtual Box -> Settings -> Network -> Adapter 1 -> Port Forwarding -> Add port forwarding rules for 3000 and 3002 ports`
5. Run `docker-compose up` in the docker terminal to start the application
6. Go to browser and open http://localhost:3000/main.html to access the application
