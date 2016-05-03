/// <reference path="jquery.js" />
/// <reference path="jquery.tinyscrollbar.js" />
/// <reference path="jquery.multiswipe.js" />
/// <reference path="json2.js" />
var isiScroll; 
$.ajaxSetup({ dataType: 'text' });

$.fn.attachScrollbar = function (options) {
    var $this = $(this);
    var $scrollview = $('.scrollview', $this);
    if ($scrollview.length == 0 && $this.hasClass('scrollview')) {
        $scrollview = $this;
    }
    if ($('.viewport', $scrollview).iScroll) {
        $('.viewport', $scrollview).iScroll(options);
        $scrollview.addClass('native');
    } else {
        $scrollview.tinyscrollbar({ sizethumb: $('.thumb', $scrollview).height(), size: $('.scrollbar', $scrollview).height() });
        setTimeout(function () {
            $scrollview.tinyscrollbar_update();
        }, 10);
    }
    return this;
}

$.fn.resetClass = function (className) {
    var $this = $(this)
    $(this).removeClass(className);
    setTimeout(function () {
        $this.addClass(className);
    }, 1);
}
$.fn.setState = function (newState) {
    $(this).removeClass(function (index, css) {
        return (css.match(/\bstate-\S+/g) || []).join(' ');
    }).resetClass('state-' + newState);
}

$.fn.tabs = function (o) {
    var $tab_pages = o.pages || $('>.tab-pages', this);
    var $tab_links = o.links || $('>.tab-links', this);
    var $tab_titles = o.titles || $('>.tab-titles', this);
    var $tab_container = $(this);
    $tab_container.addClass('tab-container');
    var that=this;
    this.removeTab = function(index){
        $('>li:nth-child(' + (index + 1) + ")", $tab_links).remove();
        $('>ul>li:nth-child(' + (index + 1) + ")", $tab_titles).remove();
        $('>div:nth-child(' + (index + 1) + ')', $tab_pages).remove();
    }

    this.selectTab = function (index, animate) {
        if(animate)
            $tab_pages.css('-webkit-transition', 'top .5s');
        else
            $tab_pages.css('-webkit-transition', '');
   
        function removeClasses() {
            $tab_container.removeClass(function (index, css) {
                return (css.match(/\bactive-tab-\S+/g) || []).join(' ');
            })
            $('>div', $tab_pages).removeClass('active');
            $('>li', $tab_links).removeClass('active');
            $('>ul>li', $tab_titles).removeClass('active');
        }
        function addClasses() {
            $tab_container.addClass('active-tab-' + index);
            $('>li:nth-child(' + (index + 1) + ")", $tab_links).addClass('active');
            $('>ul>li:nth-child(' + (index + 1) + ")", $tab_titles).addClass('active');
            $('>div:nth-child(' + (index + 1) + ')', $tab_pages).addClass('active');
        }
        if (o.animatable) {
            $tab_container.addClass('animatable');
            setTimeout(function () {
                removeClasses()
                setTimeout(addClasses, 0);
            }, 0);
        } else {
            removeClasses()
            addClasses();
        }
        if (o && o.tabchange)
            o.tabchange.call($('>div:nth-child(' + (index + 1) + ')', $tab_pages).get(0), index);
        if ($tab_container.parents('.popup').length == 0) {
            popups.closeAll();
            $('.sign_off_layer .page_number').text(app.slides.currentSlideId);

            veeva.saveFeedback(app.slides.currentAssetId);
            app.footer.buttons.refresh();
        }
		
			if(index == 0){
			   $('#cnc_button1, #cnc_button2').css("display","block");
			}else{
			   $('#cnc_button1, #cnc_button2').css("display","none");
			}
			
			if(index == 1){
			   $('#cnc_button3').css("display","block");
			}else{
			   $('#cnc_button3').css("display","none");
			}
			
			
		
    }
    if (!o.disableSwipe && $tab_pages.swipe) {
   //var tabCount = $('>li', $tab_links).length;
    $(".tab-page").swipe({
			swipe:function(event,direction){
					if(!$(".small.popup.visible, .popup.large.visible, #POPUP1, #POPUP2, #POPUP3, #Study-Popup, .tab1_content, .tab2_content, .tab3_content, .tab8_content ").is(":visible"))
					{
						
						if(direction == "left")
						{
							 document.location="veeva:nextSlide()";
						}
						else if(direction == "right")
						{
							 document.location="veeva:prevSlide()";
						}
					}
					
				
				}

        });
    }
    $('>li>a', $tab_links).click(function () {
        that.selectTab($(this).parent().index(), false);
    });
    return this;
}


var popups = {
    settings: { template: "", template2: "", max_index: 5000 },
    add: function (id, options) {
        function popup(id, options) {
            var loaded = false;
            var me = this;
            this.create = function (callback) {
                var $popup = $('<div class="popup" id=' + id + '/>');
                this.popups_element = $('.body');
                if (this.popups_element.length == 0) {
                    this.popups_element = $('<div id="popups"/>').appendTo('.body');
                }
                if (options.class) $popup.addClass(options.class);

                $popup.appendTo(this.popups_element).prop('obj', this);

                function afterLoad(data) {
                    $popup.html(data);
                    if (options.title) {
                        if (!options.title.image) {
                            $('<h1 class="title"/>').html(options.title).insertBefore($('.content', $popup));
                        } else {
                            $('<img class="title"/>').attr('src', options.title.image).width(options.title.width).height(options.title.height).insertBefore($('.content', $popup));
                        }
                    }
                    var smallPopup = $popup.hasClass('small');
                    var largePopup = $popup.hasClass('large');
                    var closeButton = '.close';
                    if (options.scrollable && largePopup)      // !smallPoup changed to largePopup as only largePopup only need to be disabled.
                        $('.close', $popup).addClass('disabled');
                    if ((!smallPopup && !largePopup) && !options.dontCloseOnClick) {
                        closeButton += ", .content";
                    }
                    $(closeButton, $popup).bind('touchend',function (e) {
						
						 $('.page_number').html('');
						if($('.tab1_content').is(':visible')){
						  $('.page_number').html('60.00_1');
						}
						else if($('.tab2_content').is(':visible')){
							
						  $('.page_number').html('60.00_2');
						}
						else if($('.tab3_content').is(':visible')){
						  $('.page_number').html('60.00_3');
						}
						else if($('.tab8_content').is(':visible')){
						  $('.page_number').html('60.00_4');
						}else{
						  $('.page_number').html('60.00');
						}
						
                        if (e.target.tagName.toLowerCase() == "a" && $('.close', $popup).get(0) != e.target)
                            return;
                        if(!$('.close', $('.body>#' + id)).hasClass('disabled')) me.close();
                    });
                    $('.pi', $popup).bind('touchend',function () { veeva.gotoPISlide(); });
                    var afterLoad3 = function () {
                        options.buttons = $.extend({ pi: largePopup, logo: smallPopup || largePopup }, options.buttons || {});
                        if (!options.buttons.pi) $('.pi', $popup).remove();
                       // if (!options.buttons.logo) $('.logo', $popup).remove();
                        if (callback) callback();
                        if (options.onload)
                            options.onload.call($popup);
                    }

                    var scrollMoveCallback = function () {
                        if(this.y - this.maxScrollY < 50)
                            $('.close', $popup).removeClass('disabled');
                    }

                    var scrollOptions = {
                        useTransform: false,
                        onRefresh: scrollMoveCallback,
                        onScrollMove: scrollMoveCallback,
                        onScrollEnd: scrollMoveCallback,
                    }
                    if (options.type == "image") {
                        var $img;
                        if (options.url)
                            $img = $('<img/>').prop('src', options.url);
                        else
                            $img = $('<div class=img/>');
                        if (options.width)
                            $img.width(options.width);
                        if (options.height)
                            $img.height(options.height);
                        $(options.scrollable ? '.overview' : '.content', $popup).empty().append($img);
                        if (options.scrollable) {
                            $popup.attachScrollbar(scrollOptions);
                        }

                        afterLoad3();
                    } else {
                        var afterLoad2 = function () {
                            if (!options.title) {
                                var $h1 = $('h1', $popup);
                                if ($h1.length > 0) {
                                    var title = $('h1', $popup).remove().html();
                                    $('<h1 class="title"/>').html(title).insertBefore($('.content', $popup));
                                }
                            }

                            if (options.scrollable) {
                                $popup.attachScrollbar(scrollOptions);
                            }
                            afterLoad3();
                        }
                        if (options.url) {
                            $(options.scrollable ? '.overview' : '.content', $popup).load(options.url, afterLoad2);
                        } else if (options.element) {
                            var elem = $(options.element);
                            $(options.scrollable ? '.overview' : '.content', $popup).html(elem.html());
                            elem.remove();
                            afterLoad2();
                        } else if ($('#main_data #' + id).length > 0) {
                            $(options.scrollable ? '.overview' : '.content', $popup).html($('#main_data #' + id).html());
                            $('#main_data #' + id).remove();
                            afterLoad2();
                        }
                    }

                }
                if (!popups.settings.template) {
                    $.get('popup.html').done(afterLoad);
                } else {
                    afterLoad(popups.settings.template);
                }
            }
            this.show = function () {
                var $popup = $('.body>#' + id);
                var show = function () {
                    $popup = $('.body>#' + id);
                    var $popup_overlay = $('.body>#' + id + '_overlay');
                    popups.closeAll();
                    $('.body').addClass('active-popup-' + options.class);
                    $('.body').addClass('active-popup-id-' + id);
                    $popup.css('z-index', popups.settings.max_index + 1);
                    popups.settings.max_index += 1;
                    $popup.addClass('visible');
                    if (options.scrollable)
                    {
                        if($('.scrollview', $popup).tinyscrollbar_update)
                            $('.scrollview', $popup).tinyscrollbar_update(0);
                        if ($('.viewport', $popup).iScroll)
                            $('.viewport', $popup).iScroll().scrollTo(0,0);
                    }
//setTimeout(function(){$('#main_data>.tab-pages').hide();},10);
                    if (options.onopen) options.onopen.call($popup);
                }
                if ($popup.length == 0) {
                    this.create(function () { show(); });
                } else {
                    show();
                }
            }
            this.close = function () {
                $('.body>#' + id).removeClass('visible');
                $('.body>#' + id + '_overlay').removeClass('visible');
                $('.body').removeClass('active-popup-' + options.class);
                $('.body').removeClass('active-popup-id-' + id);
setTimeout(function(){$('#main_data>.tab-pages').show();},10);
                if (options.onclose) {
                    options.onclose();
                }
            }
        }
        var $popup = this[id];
        if (!$popup) {
            $popup = $('.body>#' + id);
            $popup = $popup.prop('obj') || new popup(id, options);
            this[id] = $popup;
        }
        return $popup;
    },
    closeAll: function () {
        $('.body>.popup').each(function () {
            var $popup = $(this);
            var obj = $popup.prop('obj');
            if (obj) obj.close();
        });
    }
}


$.fn.resetClass = function (className) {
    var $this = $(this)
    $(this).removeClass(className);
    setTimeout(function () {
        $this.addClass(className);
    }, 10);
}

$.fn.safeEval = function (code, onError) {
    try {
        (new Function(code)).call(this);
    } catch (ex) {
        if (console && console.error) {
            console.error(ex.stack);
        }
        if (onError) {
            onError(ex);
        }
    }
    return this;
}

veeva = {
    gotoSlide: function (slide) {
		pageUnload(); //To disable the hardware isolation to remove the flickring
        //document.location = "../" + slide + "/" + slide + ".html"; // "veeva:gotoSlide(" + slide + ".zip)";
        document.location = "veeva:gotoSlide(" + slide + ".zip)";
    },
    saveObject: function (objectName, value, callback) {
        this.callbackIndex = this.callbackIndex || 0;
        this.callbackIndex++;
        var callbackName = "objectSavedCallback_" + this.callbackIndex;
        window[callbackName] = callback;
        if (!(typeof value == 'string' || value instanceof String))
            value = JSON.stringify(value);
        document.location = "veeva:saveObject(" + objectName + "),value(" + value + "),callback(" + callbackName + ")";
    },
    saveClickstreamObject: function (value, callback) {
        this.saveObject("Call_Clickstream_vod__c", value, callback);
    },
    trackSlide: function (o, callback) {
		//app.tracking.trackSlideVisit(o);
        this.saveClickstreamObject({Track_Element_Id_vod__c:o.id, Track_Element_Description_vod__c :o.isChild?"ChildSlide":"ParentSlide", Popup_Opened_vod__c: !!o.isChild}, callback);
    },
    saveFeedback: function (assetId) {
        var clickStream = '{"Survey_Type_vod__c":"Tab", "Question_vod__c":"' + assetId + '", "Answer_vod__c":"Visited"}';
        //this.saveObject("Call_Clickstream_vod__c", clickStream, function (result) {
        //var rs = JSON.stringify(result);
        //alert(rs);
        //});

    },
    gotoPISlide: function () {
        window.open("pdf/PI.pdf");
        //document.location = "veeva:gotoSlide(LYRICA_PI.zip, LYRICA_PI_hidden)";
    }
}
var app = {
    showSignOff: false,
    slides: {
        summarySlideId: "",
        currentSlideId: "",
        load: function () { }
    },
    footer: {
        ssi: {
            scrollable: function () {
                $('#footer #ssi').attachScrollbar({useTransform:false});
            }
        },
        initialized_buttons: {},
        buttons: {
            refresh: function () {
                var me = this;
                var $footer = $('.body #footer');
                var bind = function (button, elem) {
                    if (!elem) elem = $('.' + button, $footer);
                    if (me[button] && me[button].click) {
                        if (!app.footer.initialized_buttons[button]) {
                            elem.bind('touchstart',function () {
                                if (elem.hasClass('disabled')) return;
                                 console.log(button);
                               if(button=='isi' || button=='sd' || button=='reference'){
                                    me[button].click();
								  }
                            });
                            app.footer.initialized_buttons[button] = true;
                        }
                        elem.removeClass('disabled');
                    }
                    else {
                        elem.addClass('disabled');
                    }
                }
                for (var btn in this) {
                    if (btn != "refresh" && btn != "ssi_section") {
                        bind(btn);
                    }
                }
                bind('ssi_section', $('#footer #ssi .overview'));
            },
            reference: undefined,
            isi: undefined,
            sd: undefined
        }
    }
}

function pageUnload() {
    $('.enable_gpu').removeClass('enable_gpu');
}

app.footer.buttons.ssi_section = {
    click: function () {
        popups.ssi_popup.show();
        
    }
}


app.footer.buttons.isi = {
    click: function () {
        popups.isi_popup.show();
		$('#logo').addClass('noLink');
    }
}

if ('ontouchmove' in document)
    document.addEventListener('touchmove', function (e) { e.preventDefault(); });

$(document).ready(function () {
    $('body').addClass('enable_gpu');
    
   
   
});

$(window).load(function () {
    $('<a href="veeva:gotoSlide" class="logo"></a>').click(function () { veeva.gotoSlide(app.slides.summarySlideId); }).appendTo('#title_bar');
    var $footer = $('.body #footer');
    $('a.pi, li.pi a', $footer).bind('touchend',function () { veeva.gotoPISlide(); });
    //app.footer.ssi.scrollable();
    app.slides.load();
    $('.sign_off_layer .page_number').text(app.slides.currentSlideId);

    veeva.saveFeedback(app.slides.currentAssetId);
    app.footer.buttons.refresh();
    //$('.tab-pages').addClass('enable_gpu');
});

window.onerror = function (errorMsg, url, lineNumber) {
    try {
        console.error(errorMsg + "\n" + url + ": " + lineNumber);
    } catch (ex) {
    }
    return false;
}