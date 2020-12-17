# Interview Scheduler
The Intervieew Scheduler is a single page app that allows viewing, adding, editing and cancelling appointments with interviewers. Interviewees have the choice of 5 interviewers to choose from.

For each day, there are 5 interview slots to choose from with a total of 25 slots available for the week.

1. Interviews can be booked between Monday and Friday.
2. A user can switch between weekdays.
3. A user can book an interview in an empty appointment slot.
4. Interviews are booked by typing in a student name and clicking on an 
5. interviewer from a list of available interviewers.
6. A user can cancel an existing interview.
7. A user can edit the details of an existing interview.
8. The list of days informs the user how many slots are available for each day.
9. The expected day updates the number of spots available when an interview is booked or canceled.
10. A user is presented with a confirmation when they attempt to cancel an interview.
11. A user is shown an error if an interview cannot be saved or deleted.
12. A user is shown a status indicator while asynchronous operations are in progress.
13. When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
14. The application makes API requests to load and persist data. We do not lose data after a browser refresh.


## Setup

Install dependencies with `npm install`.

The app has the following dependencies.

Axios
React
Webpack, Babel
Sass
Nodejs
Express
Postgresql
Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
