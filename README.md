# URL Shortener

A URL shortener application built with **React (Vite)** for the frontend, **Spring Boot** for the backend, and **MySQL** for database management.

## Features

* Shorten long URLs
* Redirect from shortened URLs to the original URL
* Mobile-responsive design
* Persistent storage in MySQL database

## Technologies Used

* **Frontend**: React (Vite)
* **Backend**: Spring Boot (17)
* **Database**: MySQL

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (for React frontend)
* **JDK 17** (for Spring Boot backend)
* **MySQL** (for database management)

### Backend Setup (Spring Boot)

1. Clone the repository:

```bash
git clone  https://github.com/charith0901/Url_Shortener_RootCode
cd urlShortener-backend
```

2. Open the **backend** project in your IDE (e.g., IntelliJ, Eclipse).

3. Update the **MySQL database credentials** in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/url_shortener
spring.datasource.username=root
spring.datasource.password=<your-mysql-password>
```


4. Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend should now be running on `http://localhost:8085`.

### Frontend Setup (React with Vite)

1. Navigate to the **frontend** directory:

```bash
cd urlShortener-frontend
```

2. Install the dependencies:

```bash
npm install
```
3. Rename example.env to .env


4. Start the React application:

```bash
npm run dev
```

The frontend should now be available on `http://localhost:5173`.
