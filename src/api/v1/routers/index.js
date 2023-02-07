//----------Now use the express-router and creating the end points --------------X
const Router = require('express').Router();

//------Imports all the middlewares--------X
const FetchUser = require('../middlewares/FetchUser'); // middlewares can used to get the all contents of the login users
const Upload = require('../middlewares/UploadFile'); //Used to uploading files, only img format

//-------Imports or require all the controllers functions--------X
const AuthControllers = require('../controllers/AuthControllers'); //Authenticate the users
const ClientsControlles = require('../controllers/ClientsControllers'); //Contact with us
const CoursesControllers = require('../controllers/Mentors/CoursesControllers');
const DevSearchesControllers = require('../controllers/Searches/DevSearchesControllers'); //Developers Searches End Points 

//-----Start to create and defining the end points of the APIs------------X
Router.post('/auth/register',AuthControllers().Register);//register the user after checking the authentication,using POST '/api/auth/register'
Router.post('/auth/login',AuthControllers().Login);//Login the register user after checking the authentication,using POST '/api/auth/login'
Router.get('/auth/getUser',FetchUser,AuthControllers().getUser);//Get the all details of theLogin user,using GET '/api/auth/getUser'

Router.post('/users/contact',ClientsControlles().Contact);//can be contact anybody,using POST '/api/users/contact'

//-----Adding a courses by the mentors and admin----------X
Router.get('/courses/fetch',FetchUser,CoursesControllers().Fetch) //Fetching the courses by the mentors or users
Router.post('/courses/add',FetchUser,Upload.single('myfile'),CoursesControllers().Add) //Adding the courses by the mentors
Router.patch('/courses/update/:_id',FetchUser,Upload.single('myfile'),CoursesControllers().Update) //Updating the courses by the mentors, using '/api/courses/update/:_id'
Router.delete('/courses/delete/:_id',FetchUser,CoursesControllers().Delete) //Deleting the courses by the mentors, using DELETE '/api/courses/delete/:_id'

//----------Creating some filtering APIs routes, for developers or may be 'Admin Use'-----X
Router.get('/search/mentor/:id',DevSearchesControllers().Mentor); //Finding the mentors with ids matching
Router.get('/search/files/:id',DevSearchesControllers().Files); //Finding the imf files with ids matching

module.exports = Router;