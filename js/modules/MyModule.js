define([
  'underscore'

], function(_){
	/**
	 * Custom Module that holds references to utility classes and custom attributes
	 * @type {Object}
	 */
	var MyModule = {};

	(function(module){
		/**
		 * Extend the module with any utility functions from external sources
		 */
		_.extend( module, {

			strAttribute: 'Custom String Data',

			arrAttribute: [1, 2, 3, {} ],

			functAttribute: function(){

				console.log('Module::accessing this.strAttribute ', this.strAttribute);

			}

		});

	})(MyModule);	

	return MyModule;

});