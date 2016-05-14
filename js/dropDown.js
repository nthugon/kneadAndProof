//Problem: Menu takes up too much space on small mobile screens
//Solution: Use JQuery to create a drop down menu for small screens

//Create a select and append it to nav
var $select = $('<select id="dropDown"></select>');
$("#mobileNav").append($select);
//Hide html nav links
$("#mobileNav ul").hide();

//Add each nav link to select as options
$("#mobileNav a").each(function(){
	var $anchor = $(this);
	//Create an option
	var $option = $("<option></option>");
	//Make current page the default selected option
	if($anchor.hasClass("current")) {
		$option.prop("selected", true);
	} 
	//Option's value is the href
	$option.val($anchor.attr("href"));
	//Option's text is the text of link
	$option.text($anchor.text());
	//Append option to select
	$select.append($option);
});
//Create button
var $button = $('<button id="navButton">Go</button>');
$("#mobileNav").append($button);
//Action taken when button is clicked
$button.click(function(){
	//Go to select's location
	window.location = $select.val();
});