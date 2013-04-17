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
			

			$('body').append( $('<div id="todo_container">') );

			var todoWidget = new Widget({
                config: {
                  time: true  
                },
                template: {
                    templateString: '<div id="matrix"> <button id="addRow">add todo</button> <input size="33"> <table id="matrix-table"> </table> </div>',
                    templateDataObject: {}
                },
                events:{
                	"click #addRow": function(evt){
                		this.addRow().addCell(this.$el.find('input').val())
                	}
                },
                initialize: function(){
                	var self = this;
                	$(this.$el.find('input')).keypress(function(event) {
					  if ( event.which == 13 ) {
					     event.preventDefault();
					     self.addRow().addCell(self.$el.find('input').val())
					   }
					 });
                },
                viewOptions: ['addRow', 'removeRow'],
                subviews: [],
                subviewsContainer: '#matrix-table',
                addRow: function(){
                    var row = new Widget({ 
                        template: {
                            templateString: '<tr class="matrix-row"> <td class="rmRow">X</td> </tr>',
                            templateDataObject: {}
                        },
                        events:{
			            	"click .rmRow": function(evt){
			            		this.trigger( 'remove:row', this.$el.index() )
			            	}
			            },
                        viewOptions: ['addCell','removeCell'],
                        subviews:[],
                        subviewsContainer: '.matrix-row',
                        addCell: function(data){
                            var cell = new Widget({
                                template: {
                                    templateString: '<td class="cell"> <input size="33" value="<%= cell_data %>"/>  <button class="trigger"> Mark complete </button></td> ',
                                    templateDataObject: {
                                        cell_data: data
                                    }
                                },
                                events: {
                                	"click .trigger": function(){
                                		 if(this.$el.find('input').val() !== '') this.trigger('fire:data', this.$el.find('input').val());
                                		if(this.$el.find('input').val() !== '') this.trigger('remove:this:row', this.$el.parent().index() )
                                	}
                                }                                
                            });
                            cell.on('fire:data', function(data){
                            	if (data !== '') this.trigger('completed:task', data);
                            }, this);
                            cell.on('remove:this:row', function(idx){
                            	this.trigger('remove:row', idx);
                            }, this);
                            this.addSubview( cell );
                            this.renderSubviews();
                            // console.log('Added a cell', this.$el);
                            return this;
                        },
                        removeCell: function(idx){
                            this.getSubview(idx).remove();
                            this.removeSubview(idx);
                        }
                    });
					row.on('remove:row', function(idx){
						this.removeRow(idx)
					}, this);
					row.on('completed:task', function(data){
						if (data !== '') completedWidget.addTodo(data)	 
						//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   <<<<<<<<<<============ reference here
					}, this);
                    this.addSubview( row );
                    this.renderSubviews();
                    // console.log('Added a row', this.$el);
                    return row;
                },
                removeRow: function(idx){
                    this.getSubview(idx).remove();
                    this.removeSubview(idx);
                    
                }
             });


			todoWidget.renderTo( $('#todo_container'), true )

			var completedWidget = new Widget({
				template: {
					templateString: '<div id="completed_todos"> <table id="todo_list"> <tr class="todo_item"> <td> Completed Todos </td> <td id="no_todos"> </td> </tr> </table> </div>',
					templateDataObject: {}
				},
				subviewsContainer: '#todo_list',
				subviews: [],
				viewOptions: ['addTodo', 'removeTodo', 'refreshTodoNumber', 'sendToUnmarked'],
				addTodo: function(data){
					var todo = new Widget({
						template: {
							templateString: '<tr class="todo_item"> <td class="todo_data"> <%= todo_data %> </td> <td> <button class="unmark"> Unmark </button> </td> </tr>',
							templateDataObject: {
								todo_data: data
							}
						},
						events: {
							"click .unmark": function(){
								this.trigger('unmark:todo', this.$el.index());
							}
						}
					})
					todo.on('unmark:todo', function(idx){
						this.removeTodo(idx);
					}, this);
					this.addSubview(todo)
					this.renderSubviews()
					this.refreshTodoNumber();
				},
				refreshTodoNumber: function(){
					this.$el.find('#no_todos').html( this._subviews.length )
				},
				removeTodo: function(idx){
					this.sendToUnmarked( this.getSubview( idx - 1 ).$el.find('td.todo_data').text()  )
					this.removeSubview(idx - 1);
					this.renderSubviews();
					this.refreshTodoNumber();
				},
				sendToUnmarked: function(data){
					// console.log(data)
					todoWidget.addRow().addCell(data);
				}
			});

			$('body').append( $('<br><div id="completed_wrapper">') )

			completedWidget.renderTo( $('#completed_wrapper'), true )
			
		} // end start

	});

	return MyController;

});