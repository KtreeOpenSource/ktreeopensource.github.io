# KTree Multi Featured Slider Jquery Plugin #

*Description:* This slider will give ability to present more information in your slider without effecting performance as each slide will load data from ajax request, each and everything element is configurable. Using this plugin we can have tabs inside slider where we can accommodate more content.

## Directions ##

*Step 1:* This script uses the following external files:

+ jQuery 1.7 or above (served via Google CDN)
+ KTSlider.js
+ KTSlider.css
+ css/font-aswesome.css or css/font-aswesome.min.css
+ fonts/*

*Step 2:* Add the below code to the HEAD section of your page:

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
	<link rel="stylesheet" type="text/css" href="KTSlider.css" />

	<script type="text/javascript" src="KTSlider.js">

	/***********************************************
	* Featured Content KTSlider script- (c) KTree.com (www.KTree.com)
	* Visit http://www.KTree.com for more information.
	***********************************************/

	</script>


*Step 3:* Then, add the below sample markup to your page:

	<script type="text/javascript">

	$(document).ready(function(){
		$(< your selector >).KTSlider({
			bg:'<default Background Path>',
			interval:2000,
			autorotate:true,
			slideUrl:{
				'position1':{
					'name':'Slide One',
					'url':'data/slide1.json'
				},
				'position2':{
					'name':'Slide Two',
					'url':'data/slide2.json'
				},
				'position3':{
						'name':'Slide Three',
						'url':'data/slide3.json'
				}
			},
			afterSlideSwitch:function(data){

			}// Call Back Function after each slide switch.
		})
	});

	</script>
	/*Sample Data for each slide..
	{
		"background":"<Path For Image>",
		"content":"<h1>Next Service In queue</h1><p>lorem ipsum copy in various charsets and languages for layouts.lorem ipsum copy in various charsets and languages for layouts.lorem ipsum copy in various charsets and languages for layouts.</p>",
		"subblocks":{
				"Section1":{
					"label":"Section1",
					"data":"<h1>Section 1sadsdasda</h2>"
				},
				"Section2":{
					"label":"Section2",
					"data":"<h1>Section 2sadsdasda</h2>"
				},
				"Section3":{
					"label":"Section3",
					"data":"<h1>Section 2sadsdasda</h2>"
				}
			}
		}*/

	<div id="<your selector>">
	</div>

## Featured Content KTSlider set up ##

See script project page for additional details on setup and documentation: <http://www.ktree.com/blog/ KTree-Multi-Featured-Slider-jquery-Plugin.html>
