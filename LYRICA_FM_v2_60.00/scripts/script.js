var gb=0;
var touchendHandler = "click";
if ('ontouchstart' in document.documentElement)
    clickHandler = "touchstart";
$(document).ready(function(){
	
	$(".dosingBtn").bind('touchend',function(){
		document.location="veeva:gotoSlide(LYRICA_FM_v2_50.00.zip, BB6BECF8-4C88-4FC1-9F50-6D3E902E6C9F)";	
		//document.location="veeva:gotoSlide('LYRICA_FM_v2_30.00.zip', 'BB6BECF8-4C88-4FC1-9F50-6D3E902E6C9F')";	
	});
	$(".c_cBtn").bind('touchend',function(){
		document.location="veeva:gotoSlide(LYRICA_FM_v2_70.00.zip, BB6BECF8-4C88-4FC1-9F50-6D3E902E6C9F)";	
		//document.location="veeva:gotoSlide('LYRICA_FM_v2_30.00.zip', 'BB6BECF8-4C88-4FC1-9F50-6D3E902E6C9F')";	
	});
	
	$(".logotop").bind('touchend',function(){
		if($('.popup').hasClass('visible') || $('#pop1_Mask, #popup2, #popup3, #POPUP2, #POPUP2').is(':visible')){
		  return; 
		}else{
		document.location="veeva:gotoSlide(LYRICA_FM_v2_10.00.zip, BB6BECF8-4C88-4FC1-9F50-6D3E902E6C9F)";	
		}
		
	});
	
	$('#ssi').bind('click',function(){
	 
	 popups.ssi_popup1.show(); 
  });

/*	$("#arrow01, #arrow02, #arrow03, #arrow04").click(function () {
	$("#mask").fadeIn(300);
	});

	$("#mask").click(function () {
	$("#mask").fadeOut(300);

	});
*/
	prevAnimation();	

	function prevAnimation()
	{	
	
	}
	$('.tb-button').bind("click touchend",function(){
	  var ind=$(this).index();
	 if(ind==0){
	   $('.tb-button').addClass('disabled');
	   $(this).removeClass('disabled');
	   $('.defult-table').hide();
	   $('.tab1_content').show();
	   $('.page_number').html('60.00_1');
	   $('.tb-button-1').css("background-image", "none");
	   gb=1;
	   //$('.tb-button-8').css("background-image", "url(styles/images/plus-icn.png)");
	   
	 }else if(ind==1){
		 gb=0;
	  $('.tb-button').addClass('disabled');
	   $(this).removeClass('disabled');
	   $('.defult-table').hide();
	   $('.tab2_content').show();
	   $('.page_number').html('60.00_2');
	   $('.tb-button-2').css("background-image", "none");
	 }
	 else if(ind==2){
		 gb=0;
	  $('.tb-button').addClass('disabled');
	   $(this).removeClass('disabled');
	   $('.defult-table').hide();
	   $('.tab3_content').show();
	   $('.page_number').html('60.00_3');
	   $('.tb-button-3').css("background-image", "none");
	 }
	 else if(ind==7){
		 gb=0;
	  $('.tb-button').addClass('disabled');
	   $(this).removeClass('disabled');
	   $('.defult-table').hide();
	   $('.tab8_content').show();
	   $('.page_number').html('60.00_4');
	   $('.tb-button-8').css("background-image", "none");
	 }
	 	});

	$('.tab-close').bind("click touchend",function(){
		$('.page_number').html('60.00');
	  $('.tb-button').removeClass('disabled');
	  $('.tb-button-1, .tb-button-2, .tb-button-3, .tb-button-8').css("background-image", "url(styles/images/plus-icn.png)");
	  $('.tab1_content,.tab2_content,.tab3_content,.tab8_content').hide();
	  $('.defult-table').show();
	});
});
