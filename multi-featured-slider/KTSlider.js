/**
 * KTree Multi Featured Slider Jquery Plugin
 *
 * This slider will give ability to present more information in your slider without effecting performance as each slide will load data from ajax request, each and everything element is configurable. Using this plugin we can have tabs inside slider where we can accommodate more content.
 *
 * @author KTree Computer Solutions India (P) Ltd.,.
 * @version 1.0.0
 **/
$.fn.KTSlider = function(options) {
	KTSlider = this;
	ele = $(this);
	KTcontain = '.ktslide-container';
	KTSlider.options = $.extend({
		selector : 'null',
		interval:5000,
		toggleSlideContainer:'toggle-slides',
		autorotate:true,
		slidedata:[],
		afterSlideSwitch:function(data){}
	},options);
	KTSlider.init = function(){
		ele.attr({'class':'KTslider-holder'});
		ele.css({'background':'url("'+KTSlider.options.bg+'") no-repeat scroll 0 80% / cover rgba(0, 0, 0, 0)'});
		ele.append($('<div/>').addClass('ktslide-container'));
		elecont = $(KTcontain,ele);
		elecont.append(KTSlider.toggleSlideOptions());
		if(KTSlider.options.autorotate){
			elecont.append(KTSlider.playControls());
			KTSlider.autorotate();
		}
		if(window.location.hash) {
			hash	=   window.location.hash.replace(/^.*?#\//, '');
		}
		position = (typeof hash=='undefined'||typeof KTSlider.options.slideUrl[hash]=='undefined')?Object.keys(KTSlider.options.slideUrl)[0]:hash;
		KTSlider.slideTO(position);
		KTSlider.bindEvents();
	};
	KTSlider.bindEvents = function(){
		$('.switch-input',KTcontain).change(function(){
			if($(this).is(':checked')){
					if (window['KTtimer'])
						KTSlider.autorotate();
			}else{
				KTSlider.cancelautorotate();
			}
		});
		$('.toggle-slides a',KTcontain).click(function(e){
			KTSlider.cancelautorotate();
			KTSlider.slideTO($(this).attr('data-rel'));
			KTSlider.autorotate();
		});
		$(KTcontain).on('click','.sections .nav-tabs a',function(e){
			e.preventDefault();
				section = $(this).attr('data-toggle').replace(window.currentSlide+'-', "");
				KTSlider.sectionTO(section);
		});
		$(KTcontain).on('mouseover','.tab-content, .nav.nav-tabs li',function(e){
				if($('.switch-input',KTcontain).is(':checked')){
					$('.switch-input',KTcontain).trigger('click');
				}
		});
		$(KTcontain).on('mouseout','.tab-content, .nav.nav-tabs li',function(e){
						$('.switch-input',KTcontain).trigger('click');
		});
	}
	KTSlider.sectionTO = function(section){
		sectionContainer = $('#'+window.currentSlide+' .sections',KTcontain);
	  id= window.currentSlide+'-'+section
		$('.tab-pane',sectionContainer).removeClass('in active');
		$('#'+id,sectionContainer).addClass('in active');
		$('ul.nav-tabs li',sectionContainer).removeClass('active');
		$('ul.nav-tabs li.'+id,sectionContainer).addClass('active');
	};
	KTSlider.slideTO = function(position){
		currentPos = (typeof position=='undefined')?Object.keys(KTSlider.options.slideUrl)[0]:position;
		window.currentSlide = currentPos;
		window.currentSlideData = 'currentPos';
		if($('.KTslider#'+currentPos,ele).length==0){
			$.ajax({
				type:'get',
				url:KTSlider.options.slideUrl[currentPos]['url'],
				dataType:'json',
				success:function(data){
					KTSlider.options.slidedata[currentPos]=data;
					var finalData  = data;
						KTSlider.prepareSlide(currentPos,data);
						KTSlider.activateToggle(currentPos);
						$('.KTslider',ele).fadeOut();
						$('.KTslider#'+currentPos,ele).fadeIn();
						$('.KTslider#'+currentPos+' .sections .nav-tabs li:first a',ele).trigger('click');
						KTSlider.options.afterSlideSwitch.call(KTSlider,data);
				},error:function(){
							KTSlider.prepareSlide(currentPos,'error');
				}
			});
		}else{
			KTSlider.activateToggle(currentPos);
			$('.KTslider',ele).fadeOut();
			ele.css({'background':'url("'+$('.KTslider#'+currentPos,ele).attr('bg-src')+'") no-repeat scroll 0 80% / cover rgba(0, 0, 0, 0)'});
			$('.KTslider#'+currentPos,ele).fadeIn();
			$('.KTslider#'+currentPos+' .sections .nav-tabs li:first a',ele).trigger('click');
			KTSlider.options.afterSlideSwitch.call(KTSlider,KTSlider.options.slidedata[currentPos]);
		}

	};
	KTSlider.currentSlide = function(){
		return $('.KTslider:visible',ele).attr('data-pos');
	};
	KTSlider.currentSection = function(){
		currentslide = $('.KTslider:visible',ele);
		return $('.sections .nav-tabs li.active a',currentslide).attr('data-toggle');
	};
	KTSlider.prepareSlide= function(position,data){
		$sliderContainer = $('<div/>').attr({'data-pos':currentPos,'id':currentPos,class:'KTslider '+currentPos,style:'display:none;'});
		if(typeof data.background !="undefined"){
			ele.css({'background':'url("'+data.background+'") no-repeat scroll 0 80% / cover rgba(0, 0, 0, 0)'});
			$sliderContainer.attr('bg-src',data.background);
		}else {
			ele.css({'background':'url("'+KTSlider.options.bg+'") no-repeat scroll 0 80% / cover rgba(0, 0, 0, 0)'});
			$sliderContainer.attr('bg-src',KTSlider.options.bg);
		}
		if(data=="error"){
				$right = $('<div/>').addClass('right-cont').html('Oops! Something went wrong finding service..');
		}else{
			$right = $('<div/>').addClass('right-cont').html(data.content);
			$sliderContainer.append($right);
			$sliderContainer.append(KTSlider.prepareTabs(data,position));
		}
		$(KTcontain,ele).append($sliderContainer);
	};
	KTSlider.prepareTabs= function(data,position){
		$left = $('<div/>').addClass('left-cont sections header-left-services');
		$tabsActions = $('<ul/>').addClass('nav nav-tabs');
		$tabsContent= $('<div/>').addClass('tab-content');
		$i = 0;
		$.each(data.subblocks,function(k,v){
			if(v.type!="Gallery"){
					$class = ($i==0)?'active in':'';
					id= position+'-'+k
					$actionElement  = $('<li/>').attr({'class':$class+' '+id}).append($('<a/>').attr({'href':'javascript:void(0)','data-toggle':id}).append(v.label));
					$tabsActions.append($actionElement);
					$contentElement = $('<div/>').attr('id',id).addClass('tab-pane fade '+$class).append(v.data);
					$tabsContent.append($contentElement);
					$i++;
				}
		});
		$left.append($tabsActions);
		$left.append($tabsContent);
		return $left;
	};
	KTSlider.nextSectionAvailable = function(){
		activeTab = $('.sections ul li.active',$("#"+window.currentSlide));
		return activeTab.next('li')
	};
	KTSlider.nextSlide=function(){
		currentpos = Object.keys(KTSlider.options.slideUrl).indexOf(KTSlider.currentSlide());
		nextpos = Object.keys(KTSlider.options.slideUrl)[currentpos+1]
		KTSlider.slideTO(nextpos);
	}
	KTSlider.autorotate=function(config){
		if($('.switch-input',KTcontain).is(':checked')&&!window.forceStop){
			window['KTtimer'] = setInterval(function(){
				nextAvailable = KTSlider.nextSectionAvailable();
				if(nextAvailable.length!=0){
						KTSlider.sectionTO(nextAvailable.find('a').attr('data-toggle').replace(window.currentSlide+'-',''));
				}else{
						KTSlider.nextSlide();
				}
			},KTSlider.options.interval)
		}
	};

	KTSlider.cancelautorotate=function(togglerid){
		if (window['KTtimer'])
			clearInterval(window['KTtimer'])
	};
	KTSlider.activateToggle= function(position){
		$('.'+KTSlider.options.toggleSlideContainer,ele).find('i').attr('class','fa fa-circle');
		$('.'+KTSlider.options.toggleSlideContainer,ele).find('a.'+position).find('i').attr('class','fa fa-circle-o');
	};
	KTSlider.toggleSlideOptions = function(){
		$toggleSlide = $('<div>').addClass(KTSlider.options.toggleSlideContainer);
		$.each(KTSlider.options.slideUrl,function(k,item){
				$anchor = $('<a/>').attr({'data-rel':k,href:'#/'+k,'data-toggle':'tooltip','class':k,'title':item['name']});
				$anchor.append($('<i>').addClass('fa fa-circle'));
				$toggleSlide.append($anchor);
		})
		return $toggleSlide;
	};
	KTSlider.playControls = function(){
		$return = '<div class="switch-container">\
		<p class="switch-autoplay">Auto Play :</p>\
    <label class="switch">\
      <input type="checkbox" class="switch-input" checked="">\
      <span class="switch-label" data-on="On" data-off="Off"></span>\
      <span class="switch-handle"></span>\
    </label>\
    </div>';
		return $return;
	};

	KTSlider.init();
};
