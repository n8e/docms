var User = require('/model/users');
function saveUser() {
    //Lets create a new user
    var newUser = new User({
        name: {
            first: document.getElementById('firstName').html,
            last: document.getElementById('lastName').html
        },
        username: document.getElementById('userName').html,
        email: document.getElementById('email').html,
        password: document.getElementById('password').html
    });

    //Some modifications in user object
    // newUser.email = newUser.email.toUpperCase();

    //Lets try to print and see it. You will see _id is assigned.
    // console.log(newUser);

    //Lets save it
    newUser.save(function(err, userObj) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', userObj);
        }
    });
}

function getUsers() {
    User.find(function(err, users) {
        if (err) return console.error(err);
        document.getElementById('usersContainer').html(users);
        console.log(users);
    });
}
