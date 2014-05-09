Joe Installer
=============

Simple PC app store for oragnizations



Requirements
-------------
* [node.js](http://nodejs.org/download/) - for running the server
* [MongoDB](http://www.mongodb.org/downloads) - as the database
* [.NET 4](http://www.microsoft.com/en-us/download/details.aspx?id=17851) with [.NET 4.5 update](http://www.microsoft.com/en-us/download/details.aspx?id=30653) - for the windows service

Installing
----------
    git clone https://github.com/arieljannai/joeInstaller.git
    cd joeInstaller && npm install && bower install

Initialize DB with dummy data
-----------------------------
    node initialize-db.js

Running
-------
    npm start
