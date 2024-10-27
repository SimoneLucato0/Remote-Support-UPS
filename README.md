# Remote Support UPS

![image](https://github.com/user-attachments/assets/48d6926d-bfe2-4944-8589-1d2d1763d616)

This project was conducted as the final assignment for the 2021/2022 Software Engineering course, led by Prof. Tullio Vardanega at the University of Padova, in collaboration with Socomec.

## Overview

An Uninterruptible Power Supply (UPS) provides immediate backup power during outages, ensuring electronic devices remain operational without interruption. UPS systems are essential in data centers, healthcare, telecommunications, and home offices, preventing data loss and maintaining critical operations.

## Purpose

The primary goal was the creation of a **VIRTUAL DISPLAY**, the human-machine interface, showcasing data and the overall status of a UPS device to clients using Flutter.
The aim included the creation of a **REMOTE SUPPORT**, a service that connects a client and a remote technician, allowing to provide immediate assistance and support to the client.

The **REMOTE SUPPORT** module consists of two main sub-modules:

- **Authentication and signaling server**, which enabled authentication of both the client and the technician and allowed the flow of information about the UPS from the client to the technician;
- **Technician web application**, which enabled the technician to log-in, deal with incoming calls, see UPS information during a call with the client and edit personal information.

This repository contains the latter part of the **REMOTE SUPPORT** and is the upload of a part of the original repository that can be found at the following [link](https://gitlab.com/byteapplesweunipd/swe-project) (Italian only). The original repository contains the documentation (requirements analysis, definition of technologies and software architecture, user manual, maintenance manual, etc.) and the code for both the **VIRTUAL DISPLAY** and the server.

## Key features

- **MVVM Architecture**: The project is built using the Model-View-ViewModel (MVVM) pattern, promoting a clear separation of concerns. This architecture enhances maintainability and testability, allowing developers to focus on individual components without intertwining logic.

- **WebRTC Middleware**: This project features a dynamic middleware that handles WebRTC signaling using Socket.IO for real-time communication. It initializes peer connections, captures media streams from users, and creates a data channel for transmitting additional information, such as UPS connection status and measurements. It integrates with Redux for efficient state management, dispatching updates for call states and client information.

- **Responsive Design**: The user interface is designed to be responsive, providing a seamless experience across various devices and screen sizes.

- **Unit Testing**: The project includes unit tests for critical components, ensuring that the code behaves as expected and reducing the likelihood of bugs during future development.

## Getting started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SimoneLucato0/Virtual-Display-UPS.git
   cd Virtual-Display-UPS
   ```
2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the servers**

   For the sake of semplicity, I'll assume both servers (authentication and signaling) are running. Their respective code can be found [here](https://gitlab.com/byteapplesweunipd/swe-project/-/tree/main/prodotto/backend/server-auth?ref_type=heads) and [here](https://gitlab.com/byteapplesweunipd/swe-project/-/tree/main/prodotto/backend/server-signaling?ref_type=heads).

4. **Run the application**
   ```bash
   npm start
   ```
   Then, open your web browser and go to `http://localhost:3000` to access the technician's application.
