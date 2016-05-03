var currentSlide=0;
$(document).ready(function(){
	$("body").bind("touchmove",function(e){
		e.preventDefault();
	});
	$(document).on("swipeLeft", function(event) {
		/*if(currentSlide<(slides.length-1)){
			currentSlide++;
		}*/
		//alert(1);
		if(!$("#popup1, #popup2, #popup11").is(":visible"))
		document.location="veeva:nextSlide()";
	});
	$(document).on("swipeRight", function(event) {
		/*if(currentSlide>0){
			currentSlide--;
		}*/
		//alert(2);
		if(!$("#popup1, #popup2, #popup11").is(":visible"))
		document.location="veeva:prevSlide()";
	});
});
