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
	var TweetsApp = _.extend( {}, Backbone.Events );
	/**
	 * Define application logic here, by extending the Controller
	 */
	_.extend( TweetsApp, {
		/**
		 * Function called immediately after App Initialize 
		 */
		start: function(){

			console.log('Controller::Start  --> define logic');

var resp = {results: [{
				"from_user_id_str":"33001383", 
				"profile_image_url":"http://a1.twimg.com/profile_images/347035711/me_normal.jpg", 
				"created_at":"Fri, 13 May 2011 15:43:18 +0000",
				"from_user":"jreid01",
				"id_str":"69065189441544192",
				"metadata":{"result_type":"recent"},
				"to_user_id":null,
				"text":"Anatidaephobia: the fear that somewhere, somehow,a duck is watching you. #lesserknownphobias", 
				"id":69065189441544192, "from_user_id":33001383,
				"geo":null,
				"iso_language_code":"en",
				"to_user_id_str":null,
				"source":"&lt;a href=&quot;http://www.tweetdeck.com&quot;rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;"
			}]};

var updateTwitterFeed =  function() {
var $page = $("#pageTweetList");
// Build the URL we need using the data stored on the main view page 
var strUrl = "http://search.twitter.com/search.json?callback=?&rpp="; strUrl += $page.data("rpp");
strUrl += "&q=from:" + $page.data("twitterUser");
 	var data = resp;

	$page.find(".content").empty();

	$page.find(".content").html("<ul></ul>"); $list = $page.find(".content ul");
	for (var i = 0; i < data.results.length; i++) {

	var strHtml = '<li><a href="#pageTweetDetail">';
	strHtml += '<img src="'+data.results[i].profile_image_url+'">'; strHtml += data.results[i].text;
	strHtml += '</a></li>\n';
	 
	var tweet = $(strHtml);

	$list.append(tweet);

	$list.find("a:last").data("tweetJSON", JSON.stringify(data.results[i]));
	}

	$list.listview();

	$list.find("a").click(function() {
	var $this = $(this);

	$("#pageTweetDetail").data("tweetJSON", $this.data("tweetJSON"));
	}) 
	
}

var trigError = function(){

	var $page = $("#pageError .content");
// Build an error message
var strHtml = "<h3>Update failed</h3>";
strHtml += "<p>We were unable to update the twitter feed. Please try again.</p>"
// Place the message in the error dialog 
$page.html(strHtml);
// Show the dialog
// $("#show-error-page").click();
}
			
$('#show-error-page').click(function(){
trigError();
});

			var methods = {
				initMainPage : function() {
					var $page = $("#pageTweetList");
					
					$page.data("rpp", 20); $page.data("twitterUser", "jreid01"); $page.data("boolUpdate", false);
					
					updateTwitterFeed();
					
					$page.bind("pageshow", function(event, ui) {
					if ($page.data("boolUpdate")) { updateTwitterFeed();
					
					$page.data("boolUpdate", false); }
					})
				 },
				initDetailPage : function() {
					var $page = $("#pageTweetDetail");
					// Every time this page shows, we need to display a tweet detail 
					$page.bind("pageshow", function(event, ui) {
					var objTweet = JSON.parse($page.data("tweetJSON"));
					var strHtml = '<p><img src="'+objTweet.profile_image_url+'">'; strHtml += objTweet.text + '</p>'; $page.find(".container-tweet").html(strHtml);
					});
				 },
				initSettingsPage : function() { 
					// Current page
					var $page = $("#pageSettings");
					// Page where data is stored
					var $datapage = $("#pageTweetList");
					// If the user changes the username we need // to update the data stored in 
					$page.find("#username").change(function() {
					var newVal = $(this).val(); $datapage.data("twitterUser", newVal); // Set the refresh boolean 
					$datapage.data("boolUpdate", true);
					});
					// TRICK: jQuery Mobile doesn't have a change() event // for the slider yet, so we need to check it
					// when the user leaves this page 
					$page.bind("pagebeforehide", function(event, ui) {
					var sliderValue = $page.find("#slider").val();
					// Has the value changed?
					if (parseInt(sliderValue, 10) != parseInt($datapage.data("rpp"), 10)) {
					// Yes it has, so update the data and set for refresh 
					$datapage.data("rpp", sliderValue); $datapage.data("boolUpdate", true);
					} })
					// On page show we need to update the elements on
					// this page to reflect current data 
					$page.bind("pageshow", function(event, ui) {
					$page.find("#slider").val($datapage.data("rpp")).slider("refresh");
					$page.find("#username").val($datapage.data("twitterUser")); })
				},
				initAll : function() { $().initApp("initMainPage"); $().initApp("initDetailPage"); $().initApp("initSettingsPage");
				} 
			}
			$.fn.initApp = function(method) { // Method calling logic
				if ( methods[method] ) {
					return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
				} else if ( typeof method === 'object' || ! method ) {
					return methods.initAll.apply( this, arguments );
				} else {
					$.error( 'Method ' + method + ' does not exist' ); }
			}

			$().initApp();

			
		} // end start

	});

	return TweetsApp;

});