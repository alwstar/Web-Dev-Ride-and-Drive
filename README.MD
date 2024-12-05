# Project Title: SuperCar Showcase and Booking Platform

## Overview

This project is a **Microservice-based architecture** developed for a dynamic Angular web application focused on luxury car sales, bookings, and merchandising. The system allows users to explore cars, configure purchases, book supercars for test drives, view merchandise, and track car locations. It is built for scalability, modularity, and seamless user interaction.

## Architecture Overview

### **Frontend**
- **Angular Web Application**:
  - Hosted via an **nginx server**.
  - Implements **Client-Side Rendering** for optimal performance.
  - Key features include:
    - Car listings with images, videos, and configuration options.
    - Test drive bookings at racetracks.
    - Real-time car tracking on a map.
    - Merchandise store with a shopping cart.

### **Backend Microservices**
- Developed using **Node.js Express** with individual responsibilities:
  - **Product Information Microservice**:
    - Provides merchandise data.
    - Fetches data from a **MySQL database** and stores images in **MinIO**.
  - **Shopping Cart Microservice**:
    - Manages shopping cart data stored in a **Redis Cache**.
  - **Cars Information Microservice**:
    - Offers endpoints for car details, supercar lists, and associated media.
    - Uses a **MySQL database** and **MinIO storage** for data and images.
  - **Track Information Microservice**:
    - Delivers racetrack details and images, using **MySQL** and **MinIO**.
  - **Localization Microservice**:
    - Provides real-time supercar location data stored in a **MySQL database**.
  - **Sales Microservice**:
    - Handles order submissions and stores data in a **MySQL database**.

### **Deployment**
- **AWS Elastic Beanstalk**:
  - Deployed backend microservices with automated horizontal scaling.
- **AWS App Runner**:
  - Hosts the Angular web application, ensuring secure load balancing and SSL management.

## Prerequisites

- **Docker** and **Docker Compose** installed.
- **AWS CLI** (optional for deployment).

## Running Locally with Docker Compose

The `docker-compose.yml` file simplifies setup and deployment. To run the application locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - The Angular web application is available at `http://localhost:4200`.
   - Microservices and databases are configured as per `docker-compose.yml`.

4. **Stop all services**:
   ```bash
   docker-compose down
   ```

## Docker Compose Services

The `docker-compose.yml` file defines the following services:
- **Frontend**: Angular application served by nginx.
- **Microservices**: Node.js services for products, shopping cart, cars, tracks, localization, and sales.
- **Database**: MySQL instances for each microservice requiring persistent data.
- **Cache**: Redis instance for the shopping cart microservice.
- **Storage**: MinIO instance for media management.

## Key Architectural Decisions

1. **Microservice Architecture**:
   - Modular components for flexibility and scalability.
2. **Client-Side Rendering**:
   - Reduces server load and enhances performance.
3. **Database per Microservice**:
   - Ensures data isolation and service autonomy.
4. **Elastic Scaling**:
   - Handles unpredictable workloads using AWS PaaS solutions.

## License

This project is licensed under the MIT License.

---

For more details, refer to the architectural documentation and the `docker-compose.yml` file.