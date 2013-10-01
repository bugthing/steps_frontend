Steps Frontend
==============

This is a EmberJS frontend to a toy project currently in development

Running the App
---------------

The run the app, open the index.html in an up to date browser.

The app currently expects to speak to a REST backend .. and until is has been developed and defined it can communicate with [DrowsyDromedary](https://github.com/zuk/DrowsyDromedary.git) which is a free form REST front end to MongoDB.

To get the required REST API up and running:

    RUBY, BUNLDER AND MONGODB REQUIRED
    git submodule init
    git submodule update
    ln -s ./DrowsyDromedary/Gemfile ./Gemfile
    bundle

The to run the server

    rackup

Now visit: (http://0:9292/)[http://0:9292/]

Tests
-----

You can see is the tests pass by visiting the test.html page in an up to date browser.


