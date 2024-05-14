# Log Ingestor and Query Interface

This project implements a log ingestion and querying system with role-based access and real-time capabilities.

## Features

- Log ingestion from multiple APIs
- Log storage in multiple log files
- Query interface for searching logs
- Filters based on log level, log string, timestamp, and source
- Search within specific date ranges
- Regular expression-based search
- Combination of multiple filters
- Real-time log ingestion and updates
- Role-based access control

## Prerequisites

- Node.js (version 14 or above)
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/log-ingestor.git
   cd log-ingestor

2. **Install dependencies:**

    ```bash
    npm install

3. **Set up environment variables:**

    Create a `.env` file in the project root and add the following content. Replace `your_generated_secure_random_string_here` with a securely generated secret key.

    `.env`:

    ```bash
    SECRET_KEY=your_generated_secure_random_string_here

    You can generate a secure secret key using Node.js:

    ```bash
    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

## Running the Application

1. **Start the server:**

    ```bash
    node index.js

2. **Access the application:**
    Open your browser and go to `http://localhost:3000`.


## Usage

1. **Open the login page:**

    Go to `http://localhost:3000`.

2. **Enter credentials:

    For admin access:
    Username: `admin`
    Password: `adminpass`
    For user access:
    Username: `user`
    Password: `userpass`

3. **Submit the login form:**

    Click the "Login" button. If the credentials are correct, you will be redirected to the query interface.

## Query Interface

1.    **Enter search criteria:**

    -Use the input fields to specify the log level, log string, timestamp range, and source file.

2. **Submit the query:**

    -Click the "Query Logs" button. The results will be displayed below the form.

3. **Real-Time Log Updates**
    -Logs are ingested and broadcasted in real-time using Socket.io. Open the browser console to see the real-time logs as they are ingested.


## Query Interface

1. **Enter search criteria:**

    Use the input fields to specify the log level, log string, timestamp range, and source file.

2. **Submit the query:**

    Click the "Query Logs" button. The results will be displayed below the form.

## Structure


    log-ingestor/
    ├── auth/
    │   └── authMiddleware.js
    ├── logs/
    │   ├── log1.log
    │   ├── log2.log
    │   ├── log3.log
    │   └── ...
    ├── public/
    │   ├── index.html
    │   └── app.js
    ├── src/
    │   ├── logIngestor.js
    │   └── queryInterface.js
    ├── .env
    ├── index.js
    ├── package.json
    └── README.md


## Additional Information
    `authMiddleware.js`
    -Handles authentication and token generation using JWT.

    `logIngestor.js`
    -Contains the setup for log ingestion APIs.

    `queryInterface.js`
    -Implements the query interface for searching logs.

    `index.html` and `app.js`
    -Provide the client-side code for the query interface.


##  Troubleshooting

1. **Invalid credentials:**

    -Ensure the username and password are correct.
    -Check the server logs for more information.

2. **No token provided:**

    -Ensure the client sends the token in the Authorization header.
    -Verify the login process stores the token correctly.

3. **Failed to authenticate token:**

    -Ensure the SECRET_KEY in .env matches the key used to sign the tokens.
    -Check for token expiration.

4. **Real-time updates not working:**

    -Ensure Socket.io is correctly set up and running.
    -Check the browser console for any errors.


## System Design

**Components**
1. API Log Ingestor
2. Log Storage
3. Authentication and Authorization
4. Query Interface
5. Real-time Log Updates
6. User Interface (UI)

## Architecture Diagram

        +-----------------------+                   +------------------------+
        |                       |                   |                        |
        |   User Interface      | <------HTTP------> |     Express Server     |
        |                       |                   |                        |
        +----------^------------+                   +----------^-------------+
                |                                        |
                |                                        |
                |                                        |
                |                                        |
                |                                        |
        +----------+------------+                   +-------+-----------------+
        |                       |                   |                        |
        |   Browser (Client)    |                   |    Log Ingestor API    |
        |                       | <------Socket----> |                        |
        +-----------------------+                   +----------^-------------+
                                                            |
                                                            |
                                                            |
        +-----------------------+                            |
        |                       |                            |
        |   Authentication &    |                            |
        |   Authorization       |                            |
        |                       |                            |
        +-----------------------+                            |
                                                            |
        +-----------------------+                            |
        |                       |                            |
        |   Log Storage         | <------Write Logs---------+
        |                       |
        |                       | <------Read Logs-----------+
        |                       |
        +-----------------------+


## Detailed Design

1. **API Log Ingestor**
    
    **Responsibilities:**

        -Receive logs from multiple APIs.
        -Format logs to a standardized structure.
        -Write logs to designated files.
    
    **Key Points:**

        -Ensure scalability and handle high volumes of logs efficiently.
        -Implement robust error handling to avoid disrupting the application.
    
    **Example Endpoints:**

        -POST /log


2. **Log Storage**
    
    **Responsibilities:**

        -Store logs in structured files.
        -Ensure logs are indexed for efficient querying-.
    
    **Key Points:**

        -Use a structured file naming convention (e.g., log1.log, log2.log).
        -Consider using a logging framework (like Winston or Bunyan) for structured logging.


3. **Authentication and Authorization**
    
    **Responsibilities:**

        -Secure endpoints using JWT (JSON Web Tokens).
        -Implement role-based access control.
    
    **Key Points:**

        -Store user credentials securely.
        -Generate JWT tokens on successful login.
        -Verify JWT tokens for protected routes.

    **Roles:**

        -Admin: Full access to query and ingest logs.
        -User: Limited access to query logs.


4. **Query Interface**
    
    **Responsibilities:

        -Provide endpoints to search and filter logs.
        -Allow combining multiple filters and support regex searches.

    **Key Points:**

        -Optimize search performance by indexing log files.
        -Use efficient data structures for in-memory search.
    
    **Example Endpoints:**

        GET /query


5. **Real-time Log Updates**

    **Responsibilities:**

        -Use Socket.io for real-time communication between the server and client.
        -Broadcast new logs to connected clients.

    **Key Points:**

        -Ensure the system can handle multiple concurrent connections.
        -Minimize latency for real-time updates.


6. **User Interface (UI)**

    **Responsibilities:**

        -Provide a web-based interface for users to log in and query logs.
        -Display real-time log updates.