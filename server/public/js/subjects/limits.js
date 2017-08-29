$(document).ready(function() {
    var controller = new ScrollMagic.Controller();
    
    function checkDistance() {
        //show distance covered in 3 d.p. 
        var distanceCovered = this.progress().toFixed(3);
        if (distanceCovered >= 0.968) {
            return false;
        } else {
            //example1
            distanceLeft.textContent = distanceCovered;
            $('#difference').text(Number(1 - distanceCovered).toFixed(3));
            
            //example2
            if (distanceCovered > 4/5) {
                term.textContent = "4/5";
                $('#sequenceTerm').text("4/5");
                $('#sequenceRect').width(180);
            } else if (distanceCovered > 3/4) {
                term.textContent = "3/4";
                $('#sequenceTerm').text("3/4");
                $('#sequenceRect').width(168.75);
            } else if (distanceCovered > 2/3) {
                term.textContent = "2/3";
                $('#sequenceTerm').text("2/3");
                $('#sequenceRect').width(150);
            } else {
                term.textContent = "1/2";
                $('#sequenceTerm').text("1/2");
                $('#sequenceRect').width(112.5);
            }
        }
    };

    //example1
    $('#distanceSVG').hide();
    $('#example1-description').show(); //bug fixes
    configSVG($('path#arrow'));

    var tween1 = new TimelineMax();
    tween1  
        .add(TweenMax.fromTo('#example1', 1, {opacity: 0}, {opacity: 1, scale: 1.3, ease: Bounce.easeOut}))
        .add(TweenMax.fromTo('#example1-description', 0.7, {scale: 0}, {
            scale: 1, 
            opacity: 1, 
            ease: Bounce.easeOut
        }))
        .staggerTo('#lim-example-1 h4', 1.5, {
            scale: 0.7,
            transformOrigin: 'top middle',
            onComplete: function(){
                if (!$('#distanceSVG').is(':visible')) {
                    $('#distanceSVG').show('pulsate', 'slow');
                }
            }
        }, 1)
        .add('end', 2)
        .to('#distanceRect', 4, {
            width: 222, 
            left: '10vw', 
            ease: Linear.easeNone,
            onUpdate: function(){
                if (this.progress() >= 0.968) false;
            },
        }, 'end')
        .to('#differenceLine', 4, {
            scaleX: 0.025,
            svgOrigin: '235 40',
            ease: Linear.easeNone
        }, 'end')
        .staggerTo('.distance', 4, {
            x: 220,
            ease: Linear.easeOut,
            onUpdate: checkDistance,
            onComplete: function(){
                $('#arrow-ex').attr('y', $('#distanceSVG').height());
                $('#arrow-ex').attr('x', 100);
            }
        }, 0, 'end')
        .to('path#arrow', 0.5, {
            strokeDashoffset: 0,
            scale: 0.2,
            svgOrigin: "240 0",
            ease: Linear.easeOut
        })
        .fromTo('#arrow-ex', 1, {opacity: 0}, {opacity: 1, scale: 1, ease: Linear.easeOut});
    
    var scene1 = new ScrollMagic.Scene({triggerElement: '#lim-example-1', duration: '100%'})
        .setTween(tween1)
        .setPin('#lim-example-1', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);


    //example2
    var $frame = $('rect#example2-frame')
        frameWidth = $('#example2').innerWidth()
        frameHeight = $('#example2').innerHeight();
    $frame.css({
        width: `${frameWidth}px`,
        height: `${frameHeight}px` 
    });
    configSVG($frame);
    $('#sequenceSVG').hide();

    var tween2 = new TimelineMax();
    tween2
        .to('rect#example2-frame', 1, {strokeDashoffset: 0}, 0)
        .to('#example2', 0.5, {
                scale: 0.7,
                top: '-20vh',
                onComplete: function(){
                    if (!$('#sequenceSVG').is(':visible')) {
                        $('#sequenceSVG').show('pulsate', 'slow');
                    }
                }
            }, 1)
        // .add('scale', 4.4)
        .add('end', 2)
        // .to('#sequenceRect', 5, {
        //     width: 222,
        //     ease: SteppedEase.config(1),
        //     onUpdate: function(){
        //         if (this.progress() >= 0.968) false;
        //     },
        // }, 1)
        .to('#sequenceLine', 4, {
            scaleX: 0.025,
            transformOrigin: '100% top', 
            ease: Linear.easeNone
        }, 'end')
        .staggerTo('.termDistance', 4, {
            x: 220,
            ease: Linear.easeOut,
            onUpdate: checkDistance
        }, 0, 'end');
        
    var scene2 = new ScrollMagic.Scene({triggerElement: '#lim-example-2', duration: '400%'})
        .setTween(tween2)
        .setPin('#lim-example-2', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);

    //example3
    $('#example3-description').show();
    var tween3 = new TimelineMax()
        .fromTo('#example3-description', 1, {opacity: 0}, {opacity: 1, ease: SlowMo.ease.config(0.7, 0.7, false)})
        .staggerFromTo('.lim-stagger', 4, {scale: 3}, {scale: 1, ease: Power4.easeOut});

    //add offset
    var scene3 = new ScrollMagic.Scene({triggerElement: '#lim-example-3', duration: '200%'})
        .setTween(tween3)
        .setPin('#lim-example-3', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);

    var scene3_1 = new ScrollMagic.Scene({triggerElement: '#lim-example-3'})
        .setTween('#example3', 0.5, {scaleY: 1, opacity: 1})
        .triggerHook('onLeave')
        .addTo(controller);
});