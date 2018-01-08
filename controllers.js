var passport = require('passport');

module.exports = function(db) {
    var controllers = {
        adminLoginPage: function(req, res) {
            res.sendFile('./public/admin/templates/login.html', { root: __dirname });
        },

        adminPage: function(req, res) {
            console.log('req.user', req.user, req.sessionID);
            res.sendFile('./public/admin/templates/index.html', { root: __dirname });
        },

        adminLogout: function(req, res) {
            req.logOut();
            res.status(200);
            res.send();
        },

        adminLogin: function(req, res, next) {
            console.log('controllers.adminLogin body', req.body);

            passport.authenticate('local-username-n-password', authSuccessCallback)(req, res, next);

            function authSuccessCallback(err, user) {
                if (err) {
                    res.status(400);
                    return res.send(err);

                }
                if (!user) {
                    res.status(400);
                    return res.send({ err: 'User not found' });
                }

                req.logIn(user, function(err) {
                    if (err) {
                        res.status(400);
                        return res.send(err);
                    }
                    res.status(200);
                    res.send({ user: user });
                });
            }
        },

        adminPageGetData: function(req, res) {


            var SQL_text = "Select p.*, e.event from Persons p, Event e where p.Event_id = e.id and e.id ="+ req.params.eventid + " order by p.ordr asc";


            db.query(SQL_text).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results});
            });
        },

        adminPageGetEvents: function (req, res) {

            db.query("Select e.* from Event e order by e.id asc" ).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results});
            });

        },

        adminChangeOrder: function (req, res) {
             db.query("CALL ChangeOrder("+req.params.order+", "+req.params.event+", '"+req.params.direction+"');") 
             .then(function() {
                 res.status(200);
                 res.send();
             })
             .catch(function(err) {
                 res.status(500);
                 res.send(err);
             })
        },

         removeItem: function (req, res) {
             db.query("CALL removeItem("+req.params.order+", "+req.params.event+");") 
             .then(function() {
                 res.status(200);
                 res.send();
             })
             .catch(function(err) {
                 res.status(500);
                 res.send(err);
             })
        },

         createEvent: function (req, res) {
             db.query("CALL createEvent("+req.params.name+");") 
             .then(function() {
                 res.status(200);
                 res.send();
             })
             .catch(function(err) {
                 res.status(500);
                 res.send(err);
             })
        },

        EditEvent: function (req, res) {
             db.query("CALL EditEvent("+req.params.name+","+req.params.num+");") 
             .then(function() {
                 res.status(200);
                 res.send();
             })
             .catch(function(err) {
                console.log(err)
                 res.status(500);
                 res.send(err);
             })
        },

        DeleteEvent: function (req, res) {
             db.query("CALL DeleteEvent("+req.params.num+");") 
             .then(function() {
                 res.status(200);
                 res.send();
             })
             .catch(function(err) {
                 res.status(500);
                 res.send(err);
             })
        },

        AddNewClient: function (req, res) {
             db.query("CALL AddNewClient("+req.params.name+","+req.params.num+");") 
             .then(function() {
                 res.status(200);
                 res.send();
             })
             .catch(function(err) {
                 res.status(500);
                 res.send(err);
             })
        },

        waitlistPage: function(req, res) {
            res.sendFile('./public/client/templates/index.html', { root: __dirname });
        },

        GetWaitlist: function(req,res) {
            var SQL_text = "Select p.*, e.event from Persons p, Event e where p.Event_id = e.id and e.id ="+ req.params.eventid + " order by p.ordr asc";

            db.query(SQL_text).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results});
            });

        },

        GetIDlist: function(req,res) {
            var SQL_text = "Select id from Event order by id";

            db.query(SQL_text).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results});
            });
        },

        GetLeftID: function(req,res) {

            var SQL_text = "Select GetLeftID(" + req.params.id + ")"; 

            db.query(SQL_text).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results[0]});
            });
        },

        GetRightID: function(req,res) {

            var SQL_text = "Select GetRightID(" + req.params.id + ")"; 

            db.query(SQL_text).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results[0]});
            });
        },

        Geteventnamebyid: function(req,res) {

            var SQL_text = "Select Geteventnamebyid(" + req.params.id + ")"; 

            db.query(SQL_text).then(function(myTableRows) {
               var results = myTableRows[0];
                res.status(200);
                res.send({result: results[0]});
            });
        }





    };


    return controllers;
};