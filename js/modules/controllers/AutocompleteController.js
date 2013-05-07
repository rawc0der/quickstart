// autocomplete Controller

define([
 'underscore', 
 'backbone',
 'views/MyView',
 'widget',
 'jquerym',
 'views/HintboxView'

], function(_, Backbone, MyView, Widget, $m, Hintbox){
	/**
	 * Controller Object responsible for View construction and application event flow
	 * @type {[Object]}
	 */
	var Autocomplete = _.extend( {}, Backbone.Events );
	/**
	 * Define application logic here, by extending the Controller
	 */
	_.extend( Autocomplete, {
		/**
		 * Function called immediately after App Initialize 
		 */
		start: function(){

			console.log('Controller::Start  --> define logiccc');

			var hintBox = new Hintbox({});

			hintBox.renderTo( $('#display_wrapper') , true );

		} // end start

	});

	return Autocomplete;

});