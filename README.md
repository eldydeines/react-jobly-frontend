# React Front End to Jobly BackEnd

This project tied in the back end api to build out a job board site with mock data.  It utilizes authentication to the backend, showing companies and their jobs, and allowing the user to apply to these jobs.

Tech used: Components, Props, Custom Hooks, React Hooks (useContext, useState, useEffect, Browser Routing, Navigation Routes)

## Available Scripts

In the project directory, you can run:

### `npm start` 
for development
### `npm run build`
for production

## Step Zero: Setup
- Utlize the backend express-jobly exercise.
- Re-create the jobly database from the backend solution using the jobly.sql file.
- Create a new React project.
- Utilized port 5000 for backend and 3000 for front end.

## Step One: Design Component Hierarchy
- Designed component hierarchies.
- Determine props to use and data required.

## Step Two: Make an API Helper
- Utilized a single JoblyAPI class, which will have helper methods for centralizing this data requests to the backend. information. 
- Built the following API calls to the backend: getCompanies, getFilteredCompanies, getCompany, getJobs, getFilteredJobs, login, register, getUserProfile, updateUserProfile, and applyToJob.

## Step Three: Make Your Routes File
- Made routes 
- Made Navigation bar

## Step Four: Companies & Company Detail
- Built out components for showing detail on a company, showing the list of all companies, and showing simple info about a company on the list.
- Made filters to filter out companies. 

## Step Five: Jobs
- Build out components that lists all jobs, and the “job card”, which shows info on a single job. 

## Step Six: Current User
- Added features where users can log in, sign up, and log out. 
- Retrieved information about login user and tracking info.
- Developed forms for logging in and signing up
- Created links to the login and signup forms if a user is not currently logged in.
- If someone is logged in, app will show their username in the navigation, along with a way to log out.
- Developed the homepage to show different messages if the user is logged in or out.
- Saves the token from the login and register processes and stores that token on the JoblyApi class.  

## Step Seven: Using localStorage and Protecting Routes
- Developed a hook for localStorage to store the token which will allow for saving the users session.

## Protecting Routes
- Developed protected routes for jobs page, or a company details page.

## Step Eight: Profile Page
- Added feature where the logged-in user can edit their profile. Made sure that when a user saves changes here, those are reflected elsewhere in the app.

## Step Nine: Job Applications
- Added the ability for a user to apply for jobs.
- Added a button to apply for a job in company detail jobs and jobs list. 
- If user has already applied to a job, app reflects this. 

## Step Ten: Deploy Application
We’re going to use Heroku to deploy our backend and Surge to deploy our frontend! Before you continue, make sure you have two folders, each with their own git repository (and make sure you do not have one inside of another!)

Your folder structure might look something like this

jobly-backend
jobly-frontend
It’s important to have this structure because we need two different deployments, one for the front-end and one for the backend.

Backend
Make sure you are running the following commands in the jobly-backend folder — do not copy and paste these commands!*

$ heroku login
$ heroku create NAME_OF_APP
$ echo "web: node server.js" > Procfile
$ heroku git:remote -a NAME_OF_APP
$ git add .
$ git commit -m "ready to deploy backend"
These commands will create a web application and the Procfile which tells Heroku what command to run to start the server.

Now that you have a remote named, run the following commands in the jobly-backend folder. We’re going to push our code to Heroku and copy our local database (which we have named jobly) to the production one (so that we can have a bunch of seed data in production)

$ git push heroku master
$ heroku addons:create heroku-postgresql:hobby-dev -a NAME_OF_APP
$ heroku pg:push jobly DATABASE_URL -a NAME_OF_APP
$ heroku config:set PGSSLMODE=no-verify
$ heroku open
If you are getting any errors, make sure you run heroku logs -t -a NAME_OF_APP

Frontend
Now let’s deploy the frontend! To do that, we’re going to be using a tool called Surge, which is a very easy way to deploy static websites!

Make sure that you have the surge command installed. You can run this command anywhere in the Terminal:

$ npm install --global surge
In your JoblyApi.js and anywhere else you make requests to localhost:3001 make sure you have the following:

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
Next, let’s make sure we define the environment variable for our frontend app. YOUR_HEROKU_BACKEND_URL should be something like https://YOUR_BACKEND_APP_NAME.herokuapp.com.

Make sure you are running the following commands in the jobly-frontend folder

$ REACT_APP_BASE_URL=YOUR_HEROKU_BACKEND_URL npm run build
$ cp build/index.html build/200.html
$ surge build