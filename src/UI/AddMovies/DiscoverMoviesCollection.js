var Backbone = require('backbone');
var MovieModel = require('../Movies/MovieModel');
var _ = require('underscore');

module.exports = Backbone.Collection.extend({
    url   : function() {
      var route = this.action || "";
      return window.NzbDrone.ApiRoot + "/movies/discover/" + route;
    },
    
    model : MovieModel,

    parse : function(response) {
        var self = this;

        _.each(response, function(model) {
            model.id = undefined;

            if (self.unmappedFolderModel) {
                model.path = self.unmappedFolderModel.get('folder').path;
            }
        });

        return response;
    }
});
