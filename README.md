# Dimensionless_Task

## Step 1 Git Clone -->

Command: git clone https://github.com/hemantcgupta/Dimensionless_Task.git


## Step 2 Frontend (React Application) -->
#### Open below File location in Vscode and open Terminal.
..path\Dimensionless_Task\React\object

#### Intall Required Pakages using below command, 
command: npm i

#### run the react App using below Command,
Command: npm start
(After that it will pop-up chrome browser on localhost:3000)

## Step 3 Backend  (Django Server) -->
#### Open below File location in Vscode and open Terminal or Anaconda Prompt.
..path\Dimensionless_Task\Django\objectServer

#### Note: Please Install all the Python package that required to run the backend server or Use anaconda Prompt
pip install django	
pip install djangorestframework
pip install django-cors-headers
pip install pandas 
pip install numpy 
pip install csv
pip install ast
...
...
More,

### Now, runs the Backend Server using below Command,
Command: python manage.py runserver

## All Frontend and Backend SetUp Done!! Now Test The application,

The data.csv has Stored in given below location,
..path\Dimensionless_Task\data.csv

1. please upload this data from fronted browser and then Press the Upload button.
2. after Click on Upload Button you will see the Sucess console.log. Aand Additinally Your CSV data Will Push into the SQLLite DataBase. Which is located in below location,
..path\Dimensionless_Task\Django\objectServer\object.db

### Now We will Fetch the Specific date range record from the database by putting start date and end date in web page. and Finally click on the button "fetch data and Generate the report" 

The record.csv file will be genreate on below location,
..path\Dimensionless_Task\Django\objectServer\report.db

