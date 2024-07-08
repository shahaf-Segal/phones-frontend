# PhoneDB - React Phone managment App
A simple phone directory application built with React. This application allows users to add, edit, and delete contacts.
this only the client, for server either run it locally or connect to the dedicated server

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Building for Production](#building-for-production)
- [Running the Production Build](#running-the-production-build)
- [Usage](#usage)
- [Approach](#approach)

## Features

- Edit and Add new phones
- Log in and register
- Sort and filter phones

## Installation

To get started with the Phone Directory App, you need to have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository:

   ```sh
   git clone https://github.com/shahaf-Segal/phones-frontend.git
   ```

2. Navigate to the project directory:

   ```sh
   cd phone-frontend
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```
4. Add a .env file:
   ```sh
   VITE_SERVER_URL=<Server-IP>
   ```
   it should contain the Server-IP and end with '/'

## Development Setup

To start the app in development mode with hot-reloading:

1. Run the development frontend:

   ```sh
   npm run dev
   ```

   This will start the development server and open the app in your default web browser at `http://localhost:3000`.

## Building for Production

To create a production-ready build of the app:

1. Run the build script:

   ```sh
   npm run build
   ```

   This will create a `build` directory with all the optimized and minified files necessary for deployment.

## Running the Production Build

To serve the production build locally, you can use a static server such as `serve`.

1. Install `serve` globally:

   ```sh
   npm install -g serve
   ```

2. Serve the production build:

   ```sh
   serve -s dist
   ```

   a prompt will open leading you to the website

## Usage

1. Open the app in your browser.
2. Edit and Add new phones
3. Sort and Filter to view Phones differently

## Approach
My goal was to create a single-page application for the phone directory, providing a seamless user experience by keeping all functionalities on one page. This design allows users to add, view, and edit within the same interface, eliminating the need to navigate between different pages. This ensures that all data and editing features are easily accessible and intuitive to use.
