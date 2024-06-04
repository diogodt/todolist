# Todo List Micro Frontend Application

# Project Overview
This project is a Todo List application developed as a Micro Frontend using React and TypeScript. The application includes features such as adding tasks, marking them as completed, filtering tasks, and removing tasks. It uses localStorage for persistence, ensuring that tasks remain even after refreshing the page.

# Installation
Clone the repository: https://github.com/diogodt/todolist
git clone https://github.com/diogodt/todolist
cd todolist

# Install the dependencies:

npm install
npm start

For the tests:
npm test

# Design Decisions
- Component-based Architecture, to be easier to reuse and import where it's needed.
- State Management: using basic built in from React.
- Using Deboucing to try to reduce the number of calls to update the state and to save data at the localStorage

# Possible actions in the project
- Add, remove, set as complete or in progress, drag and drop to reorganize and filter Tasks.
- Render tasks in an organized way in the screen, using flex layout.