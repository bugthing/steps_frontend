Steps Frontend
==============

This is a EmberJS frontend to a toy project currently in development

Running the App
---------------

To run the app, open the index.html in an up to date browser.

The app uses either Ember's Fixtures or it can speak to a REST backend.

The plan is to build a very simple Rack based backend that can the bridge between ember-data and MongoDB.

To get the required REST API up and running:

    $ echo "SOME HOW START MONGODB ON: localhost:27017"
    $ bundle install

.. then to run the server

    $ rackup

Now visit: [http://0:9292/](http://0:9292/)

Tests
-----

You can see is the tests pass by visiting the [test.html](http://0:9292/test.html) page in an up to date browser.

.. or you can run the specs for the Rack app, like so:

    bundle exec rspec
