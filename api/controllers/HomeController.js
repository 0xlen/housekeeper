/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(requset, response) {

        Location.find({}, function(err, data) {

            if (err) return response.forbidden(err);

            // return response.json( data[0] );
            response.locals.scripts = [
                sails.getBaseurl() + '/js/zipcode/underscore-min.jsx',
                sails.getBaseurl() + '/js/zipcode/finder.jsx',
                sails.getBaseurl() + '/js/zipcode/include.jsx',
            ];
            return response.view('home',
                {
                    zip: (data[0]) ? data[0].zip : '',
                    address: (data[0]) ? data[0].address : '',
                }
            );
        });

    },

    change: function(requset, response) {

        Location.find({}, function(err, fetch) {
            if (err) return false;
            data = fetch[0];


            if (data) {
                Location.update(data, requset.params.all(), function(err, updata) {

                    if (err) return response.forbidden(err);

                    return response.json( updata );
                });
            } else {
                Location.create(requset.params.all(), function(err, updata) {
                    if (err) return response.forbidden(err);

                    return response.json( updata );
                });
            }

        });

    },

};

