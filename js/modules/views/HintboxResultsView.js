define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	var ResultsView = Widget.extend({

		initialize: function(){
			Widget.prototype.initialize.call(this);
			console.log('%c Hintbox results:: init', 'color:#41f');
		},
		template: {
			templateString: '<ul id="results_box" data-role="listview" data-inset="true" data-theme="d" class="ui-li ui-corner-top">  \
                 <% _.each(results, function(result){ %>  <li class="ui-li ui-li-static ui-btn-up-c"> <a href="#"> <%= result %> </a> </li>  <% }) %>    \
            	</ul> ',
        	templateDataObject:{
					results: []
				}
		},
		config: {
			// debug: true
		}

	});

	return ResultsView;

});


                 
