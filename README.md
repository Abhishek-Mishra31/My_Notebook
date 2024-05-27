# My_Notebook App

My Notebook App is a simple and secure web application that allows users to manage their notes. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on their notes. The application is built using Node.js for the backend, JWT for authentication, and bcrypt for password hashing. User data is stored in a MongoDB database.

## Features

- User authentication (register, login, logout)
- Create new notes
- Read/view existing notes
- Update/edit notes
- Delete notes
- Secure password hashing with bcrypt
- Token-based authentication with JWT

## Technologies Used

- Node.js
- React.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv
- BootStrap
- CSS

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or cloud-based)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my_notebook_app.git
   cd my_notebook_app
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory and add the following environment variables:
   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

## Running the Application

1. Start the server:
   ```bash
   npm start
2. The server will run on `http://localhost:3000`.

## API Endpoints
Authentication
* Register a new user
   * `POST /api/auth/createuser`
   * Request body:

        {
           "username": "your_username",
           "password": "your_password"
         }


* Login an existing user
   * `POST /api/auth/login`

   * Request body:

      {
          "username": "your_username",
          "password": "your_password"
      }

## Notes
* Get all notes
    * `GET /api/notes/getNotes`
    * Headers: `Authorization: Bearer <token>`

* Create a new note
    * `POST/api/notes/addnote`
    * Headers: Authorization: Bearer <token>
    * Request body:

       {
  "title": "Note title",
  "content": "Note content"
}

* Update a note by ID
    * `PUT/api/notes/updatenote/:id`
    * Headers: `Authorization: Bearer <token>`
    * Request body (optional fields):

      {
         "title": "Updated title",
         "content": "Updated content"
      }

* Delete a note by ID

    * `DELETE/api/notes//deletenotes/:id`
    *  Headers: `Authorization: Bearer <token>`

## Security
* Passwords are hashed using bcrypt before storing them in the database.
* JWT is used for authentication and ensures that only authenticated users can perform CRUD operations on their notes.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.

## Acknowledgements
  * Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* React-Js

## Contact
If you have any questions or need further assistance, please feel free to contact me:
* Name: Abhishek Mishra
* Email: abhishekbelaganj0609@gmail.com
* GitHub: Abhishek-Mishra31
* LinkedIn: Abhishek Kumar
 
