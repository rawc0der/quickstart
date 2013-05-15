define([
 'underscore', 
 'backbone',
 'views/MyView',
 'widget'

], function(_, Backbone, MyView, Widget){
	/**
	 * Controller Object responsible for View construction and application event flow
	 * @type {[Object]}
	 */
	var MyController = _.extend( {}, Backbone.Events );
	/**
	 * Define application logic here, by extending the Controller
	 */
	_.extend( MyController, {
		/**
		 * Function called immediately after App Initialize 
		 */
		start: function(){

			console.log('Controller::Start  --> define logic');
			

			/**
			 *  Left menu 
			 */

			//  var leftMenu = new Widget({
			// 	template: {
			// 		templateString: '<ul> <li> <a href="#">Option 1</a> </li> <li> <a href="#">Option 2</a> </li> <li> <a href="#">Option 3</a> </li> </ul>'
			// 	},
			// 	initialize: function(){
					
			// 		 this.$el.find('li').each(function(idx, val){ 
			// 		 	$(this).data('opt', 'value '+ idx)
			// 		 })
			// 	}

			// });

			var greenCell = new Widget({
			 	template: {
			 		templateString: '<div id="green">  Green Cell </div>'
			 	},
			 	initialize: function(){
			 		this.$el.css('color', 'green')
			 	}
			 })

			 var redCell = new Widget({
			 	template: {
			 		templateString: '<div id="red">  Red Cell </div>'
			 	},
			 	initialize: function(){
			 		this.$el.css('color', 'red')
			 	}
			 })

			 var blueCell = new Widget({
			 	template: {
			 		templateString: '<div id="blue">  Blue Cell </div>'
			 	},
			 	initialize: function(){
			 		this.$el.css('color', 'blue')
			 	}
			 })


			/**
			 * Navigation widget / proof of concept for subview transitions/
			 */

			var NavigationWidget =  Widget.extend({

				template: {
					templateString: '<div id="nav"> <div id="head"> <h3> Navigation Widget </h3> </div> <ul> <li> <a href="#">goto red</a> </li> <li> <a href="#">goto blue</a> </li> <li> <a href="#">goto green</a> </li> </ul> <div id="viewsContainer"> </div> </div>'
				},

				subviewsContainer: '#viewsContainer',

				subviews: [],


				initialize: function(){
					Widget.prototype.initialize.call(this)

					var self = this;
					this.$el.find('li').each(function(idx, val){ 
					 	$(this).data('opt', 'option '+ idx).click(function(){
					 		if(idx == 0) {
					 			// self.clearSubviews()
					 			self.addSubview(redCell)
					 			self.renderSubviews()
					 			redCell.$el.transit({x: '100px'})
					 		}
					 		if(idx == 1) {
					 			// self.clearSubviews()
					 			self.addSubview(blueCell)
					 			self.renderSubviews()
					 			blueCell.$el.transit({x: '100px'})
					 		}
					 		if(idx == 2) {
					 			// self.clearSubviews()
					 			self.addSubview(greenCell)
					 			self.renderSubviews()
					 			greenCell.$el.transit({x: '100px'})
					 		}
						})
					})
					
				},

				switchTo: function(source, target){

				},


			});

			var myNav = new NavigationWidget();
			myNav.renderTo( $('#page_wrapper'), true );




		} // end start

	});

	return MyController;

});