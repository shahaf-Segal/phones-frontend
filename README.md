# PhoneDB - React Phone managment App
A simple phone directory application built with React. This application allows users to add, edit, and delete contacts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Building for Production](#building-for-production)
- [Running the Production Build](#running-the-production-build)
- [Usage](#usage)

## Features

- Edit and Add new phones
- Log in and register
- Sort and filter phones

## Installation

To get started with the Phone Directory App, you need to have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/phone-directory-app.git
   ```

2. Navigate to the project directory:

   ```sh
   cd phone-directory-app
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

## Development Setup

To start the app in development mode with hot-reloading:

1. Run the development server:

   ```sh
   npm start
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
   serve -s build
   ```

   a prompt will open leading you to the website

## Usage

1. Open the app in your browser.
2. Edit and Add new phones
3. Sort and Filter to view Phones differently
