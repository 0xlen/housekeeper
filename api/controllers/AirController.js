/**
 * AirController
 *
 * @description :: Server-side logic for managing airs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(requset, response) {
        Air.find({}, function(err, data) {

            if (err) return response.forbidden(err);
            return response.json(data);
        });
    },
};

