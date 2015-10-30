# document-management-system
The system manages documents, users and userroles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.

##DOM
The system is developed using `mongoose` an ODM for node.

###Running the Project
You'll require the `nodemon` node package which you can get by running `npm install nodemon --save` from your console. We use this module to run our `documentManager.js` file as follows `nodemon documentManager.js` on the terminal.

MongoDB needs to be installed on your local machine. Along with it, the `mongoose` node package is required. Install it by running `npm install mongoose --save` on your console. Once it is done, you'll need to run `mongod` from your console.

To run the tests, you'll require to install `jasmine-node`, as `npm install jasmine-node --save`. Once completed, the Spec file is executed by running `jasmine-node documentManagerSpec.js`.


