# Express Image Management App

This project is an **Express.js** web application that allows users to manage image folders. Users can log in, create folders, upload images, and perform CRUD operations (Create, Read, Update, Delete) on their folders and images. The app utilizes **Node.js**, **Express**, **PostgreSQL**, **Prisma ORM**, **EJS**, **Multer**, and **Cloudinary** for image storage.

## Features

- **User Authentication:**
  - Login and Sign-up functionality.
  - Users can log out.

- **Folder Management:**
  - Users can create new folders.
  - Users can view a list of folders they have created.
  - Users can rename or delete folders.

- **Image Management:**
  - Users can upload images to folders.
  - Users can delete and download images.
  - All images are stored securely on **Cloudinary**.

- **Database:**
  - Data is stored in a **PostgreSQL** database.
  - **Prisma** is used as an ORM to manage and interact with the database.

## Technologies Used

- **Node.js** – JavaScript runtime for building the server.
- **Express.js** – Web framework for Node.js to handle routing and middleware.
- **PostgreSQL** – Relational database to store user and folder data.
- **Prisma ORM** – For querying the PostgreSQL database.
- **EJS** – Templating engine for rendering dynamic HTML.
- **Multer** – Middleware for handling file uploads.
- **Cloudinary** – Cloud storage for storing images.
- **Bcrypt.js** – For hashing and comparing passwords.