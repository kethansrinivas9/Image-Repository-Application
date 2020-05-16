# Image Repository Application
This is a Single Page Application that is created using MySQL, ExpressJS, AngularJS and NodeJS. This application is developed as part of [Shopify Internship challenge](https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit#).


The application has the following features:
1. Upload one/bulk images
2. Display images
3. Load images on scroll to reduce the latency in displaying them
4. Dockerized the application by splitting it into two containers, one for frontend and the other for backend


Yet to complete:
1. Add Authentication for the application
2. Display images based on their visibility as public/private
3. Delete the images

# Instructions to Install and Deploy the Application
1. Download Docker on your machine
2. Clone the repository into your machine
3. Pull the latest docker images of Client and Server into your machine with the below commands

   a) docker pull kethansrinivas9/image_repository_client:latest
   
   b) docker pull kethansrinivas9/image_repository_server
4. Once the images are pulled into your machine run the docker containers using below commands

   a) docker run -d --name client -p 3000:3000 kethansrinivas9/image_repository_client
   
   b) docker run -d --name server -p 3002:3002 kethansrinivas9/image_repository_server
5. You should be able to access the application by entering the url http://localhost:3000/main.html in your browser
