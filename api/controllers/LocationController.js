/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `LocationController.index()`
     */
    index: function(requset, response) {

        Location.find({}, function(err, data) {

            if (err) return response.forbidden(err);

            // return response.json( data[0] );
            return response.view('location/index',
                {
                    zip: (data[0]) ? data[0].zip : '',
                    address: (data[0]) ? data[0].address : '',
                }
            );
        });

    },

    change: function(requset, response) {

        var data = null;
        Location.find({}, function(err, fetch) {
            if (err) return false;
            return (data = (fetch[0]) ? fetch[0] : null);
        });

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
        
    },
};

