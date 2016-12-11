//create variables for jquery objects
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');

//add photo to overlay
$overlay.append($image);

//add overlay to the body
$("body").append($overlay);

//capture the click event on the link to an image
$(".gallery a").click(function(event){
    //prevent click from following link
    event.preventDefault();
    //use href of link as src of img in overlay
    var imageLocation = $(this).attr("href");
    $image.attr("src", imageLocation);
    //show overlay
    $overlay.show();
});

//hide overlay when clicked
$overlay.click(function (){
    $(this).hide();
});



