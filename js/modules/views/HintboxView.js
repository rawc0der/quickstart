define([
 'underscore',
 'backbone',
 'widget',
 'views/HintboxResultsView'

], function(_, Backbone, Widget, HintboxResults){
	
	var HintBox = Widget.extend({

		events: {
			"click li a" : function(evt){
				evt.preventDefault();

					$.mobile.loading('show', {
						text: 'Loading ' + $(evt.currentTarget).text(),
						textVisible: true,
					})
					$('.ui-loader').on('click',  function(){
						 $.mobile.loading( "hide" );
					})
			}
		},

		initialize: function(){
			Widget.prototype.initialize.call(this);
			this.$el.find('#searchbox').textinput();
			console.log('%c Hintbox:: init', 'color:#41a');
			var self = this;
			this.addSubview(new HintboxResults({}));
			this.renderSubviews();
			// setTimeout(function(){
			// 	$('#results_box').listview();
			// }, 0)
			this.$el.find('#searchbox').on('keyup', function(evt){
				var newVal = $(evt.currentTarget).val();
				// if( newVal.length > 1 ) {   ///  limit the query for only >2 character words
					self.showResultsList(  self.getQueryResults(newVal) );
				// }
			});

			$('li').live("mouseover", function () {
	            $(this).addClass('over')
	        });
	        $('li').live("mouseleave", function () {
	            $(this).removeClass('over')
	        });

		},

		template:{
			templateString: '<div id="search_container" data-role="fieldcontain"> \
	            <label for="searchbox">HintBox Widget test:</label> \
	            <input type="search" name="search" id="searchbox" placeholder="search.." /> \
	        	<div id="results_container"></div> \
	        </div>'
		},

		subviews: [],

		subviewsContainer: '#results_container',

		showResultsList: function(results){	
			// console.log( '%c Results::: recieved ', 'color:#41e',results )
			// this._subviews[0].empty();
			var result_html = this._subviews[0].processTemplate( {results: results} );
			$(this.subviewsContainer).html(result_html)
			// this.renderSubviews(true);
			$('#results_box').listview();
		},

		getQueryResults: function(val){
			var matches = [];
			if(val.length > 1) {
				var results = this.dataSource.get();
				_.map(results, function(result){
					if (result.indexOf(val) !== -1){
						result = result.replace(new RegExp('('+val+')',"g" ), "<span class='highlight'>$1</span>");
						console.log(result)
						matches.push( result )
					}
				})
			console.log( '%c Query::: recieved ', 'color:#41e',matches )
			}
			return matches;
		},

		dataSource: {
			get: function(){
				return [ 'hello world','template', 'queens of the stone age','autopilot','aavalanche','templar', 'templier', 'working hard', 'sosete', 'testing', 'workcreaft', 'casting', 'dancing', 'aaron', 'blondy'  ];
			}
		}



	});

	return HintBox;

});