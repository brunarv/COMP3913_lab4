/*module.exports = {  
    // Database connection information
    'database': 'mongodb://brunarv:comp3913A00985171@ds044917.mlab.com:44917/countrydb',
    //'database_ignore': 'countrydb',

    // Setting port for server
    'port': process.env.PORT || 3000   
};*/

(function(database) {
    var mongojs = require("mongojs");
    const MONGO_URL = "mongodb://brunarv:comp3913A00985171@ds044917.mlab.com:44917/countrydb";

    var theDb = null;

    database.getDb = function(next) {
        if (!theDb) {
            var collections = ['countries']
            var theDb = mongojs(MONGO_URL, collections);
            next(null, theDb);
        } else {
             next(null, theDb);
        }
    }
})(module.exports = {'port': process.env.PORT || 3000  });