<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>



### Overview

This project demonstrates a basic web application where passwords are hashed using SHA-256 on the front end and automatically hashed with Bcrypt on the backend using React and Laravel.

 ### Overview

This application allows users to:

    Enter a password in plain text.
    Hash the password using SHA-256 in the browser before sending it to the server.
    Attempt to reverse the hashed password back to the original string using a dictionary attack on the server side.

The backend automatically hashes passwords received from the frontend using Bcrypt before storing them in the database.

### Inspiration

This project is inspired by CrackStation, a tool for reversing hashed passwords using large databases of common passwords.

### Features

    Front End: Uses React to hash passwords using SHA-256 in the browser.
    Back End: Uses Laravel to automatically hash passwords with Bcrypt on the server before storing them.
    The project includes a database of common human passwords leaked from websites worldwide. Given the size of this database (64 million passwords), it may take a significant amount of time to process. For testing purposes, a smaller dataset (data.txt) with a few dummy passwords is also provided to ensure the functionality works as expected.

### Getting Started

To run this project locally, follow these steps:

    Clone the repository.
    Install dependencies:

npm install

Configure Laravel .env file for database connection.
Migrate the database:

php artisan migrate

Start the development server:

php artisan serve

Navigate to http://localhost:8000 in your browser.

### Dependencies

    Laravel
    React
    Axios# crackingStation
# crackingStation
# Cracking
# Cracking
# Cracking
