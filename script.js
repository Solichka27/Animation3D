const page = document.getElementById('page'),
    loading = document.getElementById('loading'),
    slider = document.querySelector('.swiper'),
    inner1 = document.getElementById('inner-1'),
    inner2 = document.getElementById('inner-2'),
    inner3 = document.getElementById('inner-3'),
    car = document.querySelector('model-viewer'),
    slideToButtons = document.querySelectorAll('[data-slide-to'),
    colorButtons = document.querySelector('[data-color]'),
    title = document.querySelectorAll('.title'),
    bgImage = document.querySelector('picture');

const innerAnimationActive = {
    duration: 1,
    delay: 0.5,
    ease: Power4.easeOut,
    autoAlpha: 1,
    yPercent: 0,
};

const innerAnimationHidden = {
    duration: 1,
    ease: Power4.easeOut,
    autoAlpha: 0,
    yPercent: -20,
};

/* VERTICAL SLIDER */
const swiper = new Swiper(slider, {
    direction: 'vertical',
    speed:1500,
    grabCursor: true,
    touchRatio: 2,
    threshold: 1,
    preventInteractionTransition: true,
    mousewheel: {
        forceToAxis: true,
    },
    keyboard: {
        enabled: true,
    },
    on: {
        /* SLIDER & TITLE FADE IN */
        init: () => {
            gsap.to(slider, {
                duration: 1,
                ease: Power4.easeOut,
                autoAlpha: 1,
            });
            gsap.to(title, innerAnimationActive);

            /* TITLE INFINITE LOOP */
            title.forEach(function (e, i){
                let row_width = e.getBoundingClientRect().width;
                let row_item_width = e.children[0].getBoundingClientRect().width;
                let offset = ((2* row_item_width) / row_width) * 100 * -1;
                let duration = 30 * (i + 1);

                gsap.set (e, {
                    xPercent: 0
                });

                gsap.set(e, {
                    duration: duration,
                    ease: "none",
                    xPercent: offset,
                    repeat: -1
                });
            });
        }
    },
});


/* ON LOAD */
car.addEventListener('load', (event) =>{
    /* FADE OUT LOADING SCREEN */
    gsap.to(loading, {
        duration: 1,
        ease: Power4.easeOut,
        autoAlpha: 0,
    });

     /* 3D CHARACTERISTICS */
    const materials = car.model.materials,
        paint = matterials[10];

    /* CHANGE CAR PAINT */
    paint.pbMetallicRoughness.setBaseColorFactor("##CBD5E1")

    /* CAR POSITION */
    const exposure1 = '1',
        orbit1 = '0deg 50deg 50%',
        exposure2 = '0.4'
        orbit2 = '-60deg 60deg 50%',
        exposure3 = '1'
        orbit3 = '44deg 83deg 50%';
    let target1, target2, target3;

    const setCarPosition = () => {
        if(window.innerWidth <= 900){
            target1 = '-9.5m -11.9m 4.2m';
            target2 = '-8.8m -12.7m 4.8m';
            target3 = '-9.8m -10m 3.8m';
        }
        else {
            target1 = '-9.5m -12.9m 2.2m';
            target2 = '-5.8m -12.5m 3.8m';
            target3 = '-12m -10.7m 1.7m';
        }
    }
    setCarPosition();

    const carPosition = (exposure, orbit, target) =>{
        return (
            {
                duration: 1.5,
                ease: Power4.easeOut,
                attr: {
                    ['exposure']: exposure,
                    ['camera-orbit']: orbit,
                    ['camera-target']: target,
                }
            }
        );
    };

  /* ANIMATION ON LOAD */
gsap.to(car, carPosition(exposure1, orbit1, target1));

  /* SLIDE CHANGE */





});