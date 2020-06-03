# Project 2 

Web application for finding hackathon events

# Backend Psuedo Code 

## Authentication 
- Use passport.js or using oarth

 # Models Folder - Create the tables for the database. 
 - Same login page 
 - Sign up page Students will Create email, password, & student email. This saves the all this data and adds it to the database 
- Sign Up for business will create email, password & business informaiton saves all this and adds to the database. 

# Routes 
- CRUD For the buinesses 

# Database Tables 

- 1 tables one for all the users business one for student, column for type. Student or business 

* User Student 
- password
- name 
- email 
- role 
- technologies (going to multiple answers)
- Course graduated from ? 
- Looking employement 
- id Auto Increments 
- Business Name 
- location 
- number of employees 

- company id 

Table 2 Company table for access of muliple employees 


Nice to have 
school table 




# Role wil tell us if your a student or business 

1 Job posting Table 
- Id auto_incremented 
- title (Breif Description)
- describtion 
- Number of students 
- start date 
- end date 

# Linking Table 
* MANY TO MANY relationships 
- user id
- job posting id 