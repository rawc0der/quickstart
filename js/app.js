define([
  'jquery', 
  'underscore', 
  'backbone',
  'controllers/MyController',
  'controllers/AutocompleteController',
  'jqueryui'

], function($, _, Backbone, MyController, AutocompleteController, jqUI){
  /**
   * Main Application File Module
   * Store Components inside this object for global refs handles
   * @type {[type]}
   */
  var App = {};

  _.extend ( App, {
    /**
     * Application Entry point. It is called the first time DOM finishes loading
     * @return {[function]} 
     */
      initialize: function(){

        console.log('App::initialize', this);

        this.Controller.start();

        return this;

      },

      Controller: AutocompleteController,

      // CustomModule: MyModule

    });

  return App;
});