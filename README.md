

<a ID="readme-top"></a>

<div align="center">
Challenge 13 - Object-Relational Mapping (ORM)


# Huber's eCommerce-Backend

To be updated ... ...

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)](https://nodejs.org/en)
[![Inquirer Badge](https://img.shields.io/badge/Inquirer-red)](https://www.npmjs.com/)
![MySQL2 Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

</div>


## Description

to update
Employee Tracker is an employee management solution that keeps track of current employees, roles (job functions) and departments.
Employee Tracker is a command line interface (CLI) application that enables users to maintain the database. 

High level features of the solution are:

API for product/category and tag RESTFUL API

* Viewing the database - departments, roles and employees
* Additions to the database - departments, roles and employees
* Deleting from the database - departments, roles and employees
* Updates to employee records

This application has been developed from a boiler palte

## Table of contents

- <a href="#user-story">User Story</a>
- <a href="#user-acceptance-criteria">User Acceptance Criteria</a>
- [Installation](#installation)
- [Usage](#usage)
- <a href="#video-screenshots">Video and Screenshots</a>
- [License](#license)
- [Contributing](#contributing)
- [Testing](#testing)
- <a href="#technologies-used">Technologies Used</a>
- [Questions](#questions)

## User Story <a ID="user-story"></a>

This application was developed with this user story in mind:

```
AS A manager at an internet retail company

I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria <a ID="user-acceptance-criteria"></a>

### This application was developed with the below User acceptance criteria:

```
GIVEN a functional Express.js API

WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize

WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data

WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database

WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database

```


### Additional requirements:

* MySQL2 package must be used to connect to MySQL database
* Inquirer package must be used to enable interaction via command line interface


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Video and Screenshots <a ID = "video-screenshots"></a>

### Video

Watch this video to learn more about the application

<a href="https://drive.google.com/file/d/1F-TxUnNaoULuqn5DTNpz_jC-25aPx1c2/view"> Video - "How to: Huber's Employee Tracker" </a>

### Screenshots

Screenshot of the application during "Add New Role" and "Add New Employee Process"\
* Note the headings rendered with colour schemes used
* Note formatting and use of icons and colours across the application

<div align="center">

![Screenshot of the application in flight](./lib/images/screenshot1.png)

</div>

Screenshot of the application during "Delete Employee" process
* Note the formatting of salary and icons and colours used in selection options

<div align="center">

![Screenshot of the application during "Delete Employee" process](./lib/images/screenshot2.png)

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

1. Clone or fork the repository
2. Run the below in concole install necessary packages
    * MySQL2 (Major version 3),
    * Inquirer (Major version 8),    
    * dotenv (Major version 8) 
```
npm i
```
3. After NPM packages have been installed, you'll need to set up your MySQL database for the application to read and write to. Log into MySQL2:
```
myself -u root -p
```
4. Within mysql2 - create the datbase with the schema provided, run the below command in the root folder (the below is the relative path):
```
source ./db/schema.sql
```
5. Optional - you can seed some data into the database while you are in mysql2 (Skip this step if you are going to use real data)
```
source ./db/seeds.sql
```
6. Exit MySQL2:
```
quit
```
7. You can run start the server once packages have been installed and the database is created. Run the below in the CLI:
```
node server.js
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

As this is purely a backend eCommerce server, utilise an API development platform like <a href="https://insomnia.rest/">Insomnia </a> to transmit API requests

Available APIs are as followeds

| Categories                 | API                                      | 
| -------------------------- | ---------------------------------------- | 
| GET all Category:          | http://localhost:3001/api/categories/    | 
| GET one Category by ID:    | http://localhost:3001/api/categories/:id | 
| POST one Category          | http://localhost:3001/api/categories/    | 
| PUT one Category by ID:    | http://localhost:3001/api/categories/:id | 
| DELETE one Category by ID: | http://localhost:3001/api/categories/:id | 

Category POST/PUT sample JSON body:
```
{
"category_name" : "sports"
}
```


| Products                  |                                        | 
| ------------------------- | -------------------------------------- | 
| GET all Product:          | http://localhost:3001/api/products/    | 
| GET one Product by ID:    | http://localhost:3001/api/products/:id | 
| POST one Product          | http://localhost:3001/api/products/    |  
| PUT one Product by ID:    | http://localhost:3001/api/products/:id |
| DELETE one Product by ID: | http://localhost:3001/api/products/:id |

Product POST/PUT sample JSON body:
 ```
 {
	"product_name": "basketball",
	"price" : 30.00,
	"stock" : 3,
	"tagIds" : ["1", "2", "3", "4"]
 }
 ```

| Tags                  |                                    |
| --------------------- | ---------------------------------- |
| GET all Tag:          | http://localhost:3001/api/tags/    |
| GET one Tag by ID:    | http://localhost:3001/api/tags/:id |
| POST one Tag          | http://localhost:3001/api/tags/    |
| PUT one Tag by ID:    | http://localhost:3001/api/tags/:id |
| DELETE one Tag by ID: | http://localhost:3001/api/tags/:id |

Tag POST/PUT sample JSON body:
```
{
"tag_name" : "ball"
}
```


The below SQL can be used to pull table data across the 4 tables used in this server:
```
--All values from all tables
SELECT
p.id as product_id,
p.product_name,
p.price,
p.stock, 
t.id as tag_id,
t.tag_name,
pt.id as producttag_id,
c.id as category_id,
c.category_name
FROM product p
LEFT JOIN product_tag pt on pt.product_id = p.id
LEFT JOIN tag t on t.id = pt.tag_id
LEFT JOIN category c ON p.category_id = c.id;
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
    
## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application can be used in conjunction with licensing covered in  <b>MIT Lcensee</b>

(Click on the badge for details of the license)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

To contribute to this application, please reach out to me via my contact details below

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

Automated Test scripts have not been developed for this application

## Schema and Seeding
* Validate that running the schema.sql file via mysql2 does not result in errors
* Validate that running the index.js file within the seed folder does nto result in seed errors

### Categories

* Validate that GET all Category request returns all Categories and associated Products
* Validate that GET one Category by ID returns a single Category and associated Products if the category ID exists
* Validate that GET one Category by ID returns an error if the category ID does not exist
* Validate that POST a Category adds a new record to the category table
* Validate that PUT (Updating) a Category by ID  is reflected in the database for the same ID
* Validate that PUT (Updating) a Category by ID  returns an error if the category ID does not exist
* Validate that DELETING a Category by ID removes the category from the database
* Validate that DELETING a Category by ID  returns an error if the ID does not exist

### Products

* Validate that GET all Product request returns all Products and associated Category and Tags
* Validate that GET one Product by ID returns a single Products and associated Category and Tags if the Product ID exists
* Validate that GET one Product by ID returns an error if the Product ID does not exist
* Validate that POST a Product adds a new record to the product table and corresponding record entries on the ProducTag table for each tag associated 
* Validate that PUT (Updating) a Product by ID  is reflected in the database for the same ID (including updating associated tags)
* Validate that PUT (Updating) a Product by ID  returns an error if the Product ID does not exist
* Validate that DELETING a Product by ID removes the Product from the database along with tag associations on the ProductTag table
* Validate that DELETING a Product by ID  returns an error if the ID does not exist

### Tags

* Validate that GET all Tag request returns all Tags and associated Products
* Validate that GET one Tag by ID returns a single Tag and associated Products if the Tag ID exists
* Validate that GET one Tag by ID returns an error if the Tag ID does not exist
* Validate that POST a Tag adds a new record to the product table 
* Validate that PUT (Updating) a Tag by ID  is reflected in the database for the same ID
* Validate that PUT (Updating) a Tag by ID  returns an error if the Product ID does not exist
* Validate that DELETING a Tag by ID removes the Tag from the database along with tag associations on the ProductTag table
* Validate that DELETING a Tag by ID  returns an error if the ID does not exist

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies used <a ID="technologies-used"></a>

* Javascript
* Node.js
* Node Package Manager (NPM)
* MySQL2
* Express
* Sequelize
* dotenv

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Questions

- Visit my GitHub page: <a href="https://github.com/hybee234"> hybee234 </a>
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

