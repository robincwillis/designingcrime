var slides = [
'slides/01.jpg',
'slides/02.jpg',
'slides/03.jpg',
'slides/04.jpg',
'slides/05.jpg',
'slides/06.jpg',
'slides/07.jpg',
'slides/08.jpg',
'slides/09.jpg',
'slides/10.jpg',
'slides/11.jpg',
'slides/12.jpg',
'slides/13.jpg',
'slides/14.jpg',
'slides/15.jpg',
'slides/16.jpg',
'slides/17.jpg',
'slides/18.jpg',
'slides/19.jpg',
'slides/20.jpg',
'slides/21.jpg',
'slides/22.jpg',
'slides/23.jpg',
'slides/24.jpg',
'slides/25.jpg',
'slides/26.jpg',
'slides/27.jpg',
'slides/28.jpg',
'slides/29.jpg',
'slides/30.jpg',
'slides/31.jpg',
'slides/32.jpg'
];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function init(){

	shuffle(slides);
	var html = "";
	for(var i = 0; i < slides.length; i++){
		 html += '<div><div class="image"><img data-lazy="'+slides[i]+'"/></div></div>'
	}
	$('#slides').append(html);
}

init();

var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

	$('#slides').slick({
			lazyLoad : 'progressive',
      //dots: true,
      infinite: true,
      speed: 500,
     //  slide: '> div',
		  // cssEase: 'linear',
     	//adaptiveHeight: true,
     	//autoplay: true,
		  autoplaySpeed: 5000,
     	prevArrow : '<div class="prev"></div>',
     	nextArrow : '<div class="next"></div>',
  });

	//need to center images on resize
document.addEventListener("touchmove", function(e){e.preventDefault();}, false);

var screen = document.querySelector(".slides");

var ticking = false;
var transform;
var timer;

var el = document.querySelector("#slides");


var START_X = Math.round((screen.offsetWidth - el.offsetWidth) / 2);
var START_Y = Math.round((screen.offsetHeight - el.offsetHeight) / 2);

var mc = new Hammer.Manager(el);

mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));


mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

mc.on("panstart panmove", onPan);
mc.on("rotatestart rotatemove", onRotate);
mc.on("pinchstart pinchmove", onPinch);

	mc.on("hammer.input", function(ev) {
    if(ev.isFinal) {
        resetElement();
    }
});


function resetElement() {
    //el.className = 'animate';
  $(el).removeClass('animating');

    transform = {
        translate: { x: START_X, y: START_Y },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
    requestElementUpdate();
}

function updateElementTransform() {

    var value = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
        'scale(' + transform.scale + ', ' + transform.scale + ')',
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
    ];

    value = value.join(" ");
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
    ticking = false;
}

function requestElementUpdate() {
    if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
    }
}

function onPan(ev) {
    //el.className = '';
    transform.translate = {
        x: START_X + ev.deltaX,
        y: START_Y + ev.deltaY
    };

    //logEvent(ev);
    //requestElementUpdate();
}


var initScale = 1;
function onPinch(ev) {
    if(ev.type == 'pinchstart') {
        initScale = transform.scale || 1;
    }
    $(el).addClass('animating');

    //el.className = '';
    if(ev.scale > transform.scale){


    transform.scale = initScale * ev.scale;
    }
    //logEvent(ev);
    requestElementUpdate();
}



var initAngle = 0;
function onRotate(ev) {
    if(ev.type == 'rotatestart') {
        initAngle = transform.angle || 0;
    }
    $(el).addClass('animating');
    //el.className = '';
    //transform.rz = 1;
    //transform.angle = initAngle + ev.rotation;

    //logEvent(ev);
    //requestElementUpdate();
}

resetElement();

var mobile = (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){return true;}else{return false}})(navigator.userAgent||navigator.vendor||window.opera);

if(mobile){
	$('.next').remove();
	$('.prev').remove();
}
