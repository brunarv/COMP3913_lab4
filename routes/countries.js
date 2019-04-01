var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = require('../config');

//var db = mongojs(config.database, ['countries']);

router.get("/countries", function(req, res, err) {
    //res.send("countries API");
    db.getDb( (err, db) => {
        if (err) {
            console.log("Database Connection Failed" + err);
        } else {
                db.countries.find(function(err, data) {
                    if (err) res.send(err);
                    res.json(data);
                });
            }
    });
});

router.get("/countries/:id", function(req, res, next) {
    db.getDb( (err, db) => {
        if (err) {
            console.log("Database Connection Failed" + err);
        } else {
                db.countries.findOne({_id: mongojs.ObjectId(req.params.id)},
                function(err, data){
                    if (err) res.send(err);
                    res.json(data);
                });
            }
        });
    });

// create country
router.post("/countries", function(req, res, next) {
    db.getDb( (err, db) => {
        if (err) {
            console.log("Database Connection Failed" + err);
        } else {

                    var country = req.body;

                    console.log(country.country, country.population);

                    if (!country.StartDate) {
                        country.StartDate = new Date();
                    }

                    if (!country.country || !country.population)  {
                        res.status(400);
                        res.json(
                            {"error": "Bad data, could not be inserted into the database."}
                        )
                    } else {
                        db.countries.save(country, function(err, data) {
                            if (err) res.send(err);
                            res.json(data);
                        })
                    }
                }
}); });

// delete country
router.delete("/countries/:id", function(req, res, next) {6+
    db.getDb( (err, db) => {
        if (err) {
            console.log("Database Connection Failed" + err);
        } else {
                db.countries.remove({_id: mongojs.ObjectId(req.params.id)},
                function(err, data){
                    if (err) {
                        res.send(err);
                    }
                    res.json(data);
                });
            }
}); });

// update country
router.put("/countries/:id", function(req, res, next) {
    
    db.getDb( (err, db) => {
        if (err) {
            console.log("Database Connection Failed" + err);
        } else {
    
                    var country = req.body;
                    console.log( req.body);
                    var changedcountry = {};

                    if (country.country) {
                        changedcountry.country = country.country;
                    }

                    if (country.population) {
                        changedcountry.population = country.population;
                    }
                    if (!changedcountry) {
                        res.status(400);
                        res.json(
                            {"error": "Bad Data"}
                        )        
                    } else {
                        db.countries.update({_id: mongojs.ObjectId(req.params.id)}, changedcountry,{},
                        function(err, data){
                            if (err) {
                                res.send(err);
                            }
                            res.json(data);
                        });
                    }

        }
    }); 
});


module.exports = router;