# Login Temperatures
A web server that will store the current temperature of two cities when a user logs in, and display a historical list of the users login temperatures.

![Alt text](https://bishrulhaq.com/wp-content/uploads/2021/12/TempCheck.png "Temp Check")

## Technologies Used
* Node JS 
* EJS for Templating.
* Vue Js for frontend and Axios for http calls.
* PassportJS for Authentication.

Application is created using Node and Express Js with MVC architecture moreover, bootstrap is used to style the frontend along with custom CSS.Vue Js is used in the front end for form validation and for weather temperature conversions. EJS acts as the template engine for html pages.

## Things to Do
1. Run npm install
2. Change .env.example to .env
3. Add the relevant config and credentials to .env ( Country codes for Open Weather API is added)
4. Run the SQL File (tables.sql)

## Open Weather API Usage
The city codes are fetched from Official Open Weather website. Can be accessed via visiting the URL
http://bulk.openweathermap.org/sample/
