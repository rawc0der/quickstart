define([
 'underscore', 
 'backbone',
 'views/MyView',
 'widget',
 'jquerym'

], function(_, Backbone, MyView, Widget, $m){
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


			var MobileWidget = Widget.extend({
				subviews: [],
				subviewsContainer: '#betList',

				addBet: function(  ){
					var self = this;
					var newBet = $('<li> bet number '+self._subviews.length+'</li>');
					this.addSubview(newBet);
					console.log('add subviews')
					if (this._subviews.length) {
						// self.$el.empty()
						_.map(self._subviews, function(subv){
							self.$el.append( subv ).listview('refresh')
							console.log('adding subview', subv)
						})
					}
					console.log(this._subviews)
				},

				template: {
					templateString: '<ul data-role="listview" data-inset="true" id="betList" data-split-icon="gear"> <li data-role="list-divider">Placed bets</li><li><a href="#page-one">Check out</a></li> </ul>'
				},

				createComponents: function(){
					var self = this;
					$('#add').bind('vclick', function(evt){
						self.addBet();
					})
				},

				enhanceComponents: function(){
					
				},

				initialize: function(){
					Widget.prototype.initialize.call(this);
					console.log('MobileWidget::: init', this)
					this.createComponents();


					
				},

			});

			// $('#foo').append( $('<div id="hd" data-role="header"> <h4>My Title</h4> </div>') )
			// $('#page_wrapper').trigger('create')



			var mobileWidget = new MobileWidget({});
			mobileWidget.renderTo( $('#betting_page') );
			mobileWidget.render(true);

			mobileWidget.enhanceComponents();





			
		} // end start

	});

	return MyController;

});