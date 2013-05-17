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
				viewID: 'greenCell',
			 	template: {
			 		templateString: '<div class="bs-docs-example"><ul class="media-list"><li class="media"><a class="pull-left"href="#"><img class="media-object"data-src="holder.js/64x64"alt="64x64"style="width: 64px; height: 64px;"></a><div class="media-body"><h4 class="media-heading">Media heading</h4><p>Cras sit amet nibh libero,in gravida nulla.Nulla vel metus scelerisque ante sollicitudin commodo.Cras purus odio,vestibulum in vulputate at,tempus viverra turpis.</p><!--Nested media object--><div class="media"><a class="pull-left"href="#"><img class="media-object"data-src="holder.js/64x64"alt="64x64"style="width: 64px; height: 64px;"></a><div class="media-body"><h4 class="media-heading">Nested media heading</h4>Cras sit amet nibh libero,in gravida nulla.Nulla vel metus scelerisque ante sollicitudin commodo.Cras purus odio,vestibulum in vulputate at,tempus viverra turpis.<!--Nested media object--><div class="media"><a class="pull-left"href="#"><img class="media-object"data-src="holder.js/64x64"alt="64x64"style="width: 64px; height: 64px;"></a><div class="media-body"><h4 class="media-heading">Nested media heading</h4>Cras sit amet nibh libero,in gravida nulla.Nulla vel metus scelerisque ante sollicitudin commodo.Cras purus odio,vestibulum in vulputate at,tempus viverra turpis.</div></div></div></div><!--Nested media object--><div class="media"><a class="pull-left"href="#"><img class="media-object"data-src="holder.js/64x64"alt="64x64"style="width: 64px; height: 64px;"></a><div class="media-body"><h4 class="media-heading">Nested media heading</h4>Cras sit amet nibh libero,in gravida nulla.Nulla vel metus scelerisque ante sollicitudin commodo.Cras purus odio,vestibulum in vulputate at,tempus viverra turpis.</div></div></div></li><li class="media"><a class="pull-right"href="#"><img class="media-object"data-src="holder.js/64x64"alt="64x64"style="width: 64px; height: 64px;"></a><div class="media-body"><h4 class="media-heading">Media heading</h4>Cras sit amet nibh libero,in gravida nulla.Nulla vel metus scelerisque ante sollicitudin commodo.Cras purus odio,vestibulum in vulputate at,tempus viverra turpis.</div></li></ul></div>'
			 		// templateString: '<div class="cell" id="greenCell">  <img src="res/image1.jpg"> </div>'
			 	},
			 	initialize: function(){
			 		this.$el.css({
			 			width: '800px',
			 			padding: '20px'
			 		})
			 	},
			 	viewOptions: ['viewID']
			 })

			 var redCell = new Widget({
			 	viewID: 'redCell',
			 	template: {
			 		templateString: '<div class="cell" id="redCell">  <img src="res/image2.jpg"> </div>'
			 	},
			 	initialize: function(){
			 		this.$el.css({
			 			width: '800px',
			 			padding: '20px'
			 		})
			 	},
			 	viewOptions: ['viewID']
			 })

			 var blueCell = new Widget({
			 	viewID: 'blueCell',
			 	template: {
			 		// templateString: '<div class="cell" id="blueCell">  <img src="res/image3.jpg"> </div>'
			 		templateString: '<div class="span4"><div class="thumbnail"><img src="res/image3.jpg" alt="300x200" style="width: 300px; height: 200px;"><div class="caption"><h3>Thumbnail label</h3><p>Cras justo odio,dapibus ac facilisis in,egestas eget quam.Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultricies vehicula ut id elit.</p><p><a href="#"class="btn btn-primary">Action</a><a href="#"class="btn">Action</a></p></div></div></div>'
			 	},
			 	initialize: function(){
			 		this.$el.css({
			 			width: '800px',
			 			padding: '20px'
			 		})
			 	},
			 	viewOptions: ['viewID']
			 })



			 $('#page_wrapper').append( $('<div id="slider_container"> </div>') )

			/**
			 * Navigation widget / proof of concept for subview transitions/
			 */


			 var NavWidget = Widget.extend({

			 	_activeView: null,

			 	_containerWidth: null,

			 	template: {
			 		templateString: '<div id="NavWidgetContainer"> <div id="MenuContainer"> <h4> < navigation menu ></h4> <ul id="MenuItemsList"> <li> <a class="red" href="#"> <img src="res/image2.jpg"> </a> </li> <li> <a class="blue" href="#"> <img src="res/image3.jpg"> </a> </li> <li> <a class="green" href="#"> <img src="res/image1.jpg"> </a> </li> </ul>  </ul> </div> <div id="SubviewsContainer"> </div> </div>'
			 	},

			 	subviewsContainer: '#SubviewsContainer',

			 	subviews: [ ],

			 	prepareContainerConfig: function(){
			 		this._containerWidth = this.options.width;
			 		this.$el.css({
			 			width: this._containerWidth,
			 			overflow: 'hidden',
			 			position: 'relative',
			 			'margin-left': '100px'
			 		})
			 		// this.$el.find('#SubviewsContainer').css({
			 		// 	height: '100px'
			 		// })
			 	},

			 	prepareTransitionView: function(widget){
			 		widget.$el.transit({ 
			 			x: this._containerWidth+'px', 
			 		}).css({
			 			position: 'absolute'
			 		});
			 		this.renderSubviews();
			 	},

			 	switchViews: function(){
			 		if(this._subviews.length > 1){
			 			this.getSubview(1).$el.transit({ 
			 				x: '0px', 
			 				duration: 700
			 			})
			 			outViewWidth = this.getSubview(0).$el.width()
			 			this.getSubview(0).$el.transit({ 
			 				x: -outViewWidth-20+'px', 
			 				duration: 800,
			 				delay: 200
			 			}, 'ease');
			 			this.endAnimation();
			 			
			 		} else {
			 			this.getSubview(0).$el.transit({ 
			 				x: '0px', 
			 				duration: 700
			 			}, 'ease')
			 			this.setReadyState( this.getSubview(0) )
			 		}

			 	},

			 	endAnimation: function(){
			 		var self = this;
			 		setTimeout(function(){
			 			self.removeSubview(0);
			 			self.setReadyState( self.getSubview(0) )
			 		}, 1000)
			 		
			 	},

			 	addTransitionView: function(widget){
			 		this.setBusyState();
			 		this.addSubview( widget );
			 		this.prepareTransitionView( widget );
			 		this.switchViews();
			 	},

			 	addClickListeners: function(){
			 		var self = this;
			 		$('a.red').live('click', function(e){
			 			e.preventDefault();
			 			if (self._activeView !== redCell.viewID &&
			 				self._activeView !== null ){
			 					self.addTransitionView( redCell )
			 			}
			 		})
			 		$('a.blue').live('click', function(e){
			 			e.preventDefault();
			 			if (self._activeView !== blueCell.viewID &&
			 				self._activeView !== null ){
			 					self.addTransitionView( blueCell )
			 			}
			 		})
			 		$('a.green').live('click', function(e){
			 			e.preventDefault();
			 			if (self._activeView !== greenCell.viewID &&
			 				self._activeView !== null ){
			 					self.addTransitionView( greenCell )
			 			}
			 		})
			 	},

			 	setBusyState: function(){
			 		delete this._activeView;
			 	},

			 	setReadyState: function(widget){
			 		this._activeView = widget.viewID;
			 	},

			 	initialize: function(){
			 		Widget.prototype.initialize.call(this);
			 		this.prepareContainerConfig();
			 		this.addClickListeners();
			 		this._activeView = 0;
			 	}



			 });

			 var myNavWidget = new NavWidget({ width: '800' });
			 myNavWidget.renderTo( $('#slider_container'), true );

		} // end start

	});

	return MyController;

});