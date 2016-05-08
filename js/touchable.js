$(function(){
  if(Modernizr.touch){
    $(".services-box > figure").on(
      "touchstart",
      function(e){
	var self = $(this);
	if (self.attr("class") && self.attr("class").match(/\bcs-hover\b/)) {
	  self.removeClass("cs-hover");
	} else {
	  $("figure.cs-hover").removeClass("cs-hover");
	  self.addClass("cs-hover");
	}
      }
    )
  }
});
