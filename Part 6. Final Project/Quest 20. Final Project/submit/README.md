# Activity Tracking app

> Final project for web dev curriculum to put into practice some of the topics covered so far

## Build Setup
``` bash
# install dependencies
npm install

# build dist file for server
npm run build

# start app 
npm start
```

## App Summary

- `/Activities` used to generate a collection of activities
    * all activities have a numerical metric to track
- `/Calendar` is used to schedule activities on a weekly basis
- `/Today` page is used to log activity values for each day
- `/Progress` shows a summary of values logged so far in graphical format

## Topics explored through this project

- Build tools like `Webpack` and `Babel`
    - lazy loading and polyfill for es6 on browsers

- `Vue` (single file components) for reusability
- `Vue-router`for routing on the client with support for browser history
- `Vuex` for state management and asynchronous actions
- `Firebase` for Google OAuth authentication and database storage
- Custom calendar layout uses new `CSS Grid` Layout
- [Bootstrap](https://getbootstrap.com/) for quick columns and modals
