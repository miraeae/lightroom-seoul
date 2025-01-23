$(function(){
    // Header
    var lastScrollTop = 0;
    
    $(window).scroll(function(e){
        var st = $(this).scrollTop();
        
        if( Math.abs(lastScrollTop - st) <= 15 ) //Math.abs - 절대값
            return;

        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
        $(".header").css("top","-100%");

        } else {
        $(".header").css("top","0px");
        }
        lastScrollTop = st;
    });


    gsap.registerPlugin(ScrollTrigger);

    // Section BG/MENU
    gsap.utils.toArray(".sec").forEach((sec) => {
        ScrollTrigger.create({
            trigger: sec,
            start: "top center",
            end: "bottom center",
            // markers: true,
            // id: `x_${sec.getAttribute('data-menucolor')}`,
            onEnter: () => {
                document.body.setAttribute('data-bgcolor', sec.getAttribute('data-bgcolor'));
                document.body.setAttribute('data-menucolor', sec.getAttribute('data-menucolor'));
            },
            onEnterBack: () => {
                document.body.setAttribute('data-bgcolor', sec.getAttribute('data-bgcolor'));
                document.body.setAttribute('data-menucolor', sec.getAttribute('data-menucolor'));
            },
        });
    });


    // Text slide up
    gsap.utils.toArray(".sec:not(.intro) .slide-up").forEach((slideUp) => {
        gsap.to(slideUp.querySelectorAll("span"), {
            scrollTrigger: {
                trigger: slideUp,
                start: "-=200 center",
                end: "bottom center",
                //markers: true,
                //id: "slideUp",
                toggleActions: "play none none reverse",
            },
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "circ.out",
            stagger: 0.1,
        });
    });


    // First
    const first = gsap.timeline({});
        first.to(".intro .slide-up span",{y:0, autoAlpha:1, ease:'circ.out', stagger: 0.1, duration:1}, 0)
        .to(".intro", {yPercent:-100, height: 0, duration:1}, '+=1')
        .to(".intro__title",{y:0, duration:0.8}, '<')
        .to(".hero__inner", {paddingTop:0,  duration:0.8,}, '<')
        .to(".hero", {
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end:"bottom ceter",
                pin: true, 
                pinSpacing: false,
                // id: "heroPin",
                // markers: true,
            }
        }, '<')
        .to(".header", {y:0, autoAlpha:1, duration:1})


    // Hello
    let typeSplit = new SplitType(".split", {
        types: "lines, words", //chars
        tagName: "span",
    });
    
    gsap.from(".hello .split .word", {
        scrollTrigger: {
            trigger: ".hello",
            start: "-=300 center",
            end: "bottom center",
            // id: "helloSplit",
            // markers: true,
        },
        yPercent: 100, 
        autoAlpha: 1, 
        duration: 1, 
        ease: 'circ.out', 
        stagger: 0.1,
    });

    gsap.to(".hello", {
        scrollTrigger:{
            trigger:".hello",
            start:"bottom center",
            end:"top bottom",
            // markers: true,
            // id: "helloLeave",
            onLeave:()=>{
                gsap.to(".hello__inner", {autoAlpha:"0"})
            },
            onEnterBack:()=>{
                gsap.to(".hello__inner", {autoAlpha:"1"})
            }
        }
    });


    // About
    gsap.to(".about__grid", {
        scrollTrigger: {
            trigger: ".about__grid",
            start:"top top",
            endTrigger: ".about",
            end:"bottom bottom",
            pin: true,
            scrub: 1,
            // id: "aboutGrid",
            // markers: true,
        },
        scale: 4,
        autoAlpha : 0.1,
        ease: 'power1.inOut'
    });


    //Space
    const space = gsap.timeline({defaults: {duration: 300},
        scrollTrigger: {
            trigger: ".space",
            start: 'top',
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            pinSpacing: false,
            // markers: true,
            // id: "space",
        }
    })
    space.to(".fade-in__item:nth-child(1)", { autoAlpha: 0, delay: 600 })
    .to(".space__pagination-item:nth-child(1)", { autoAlpha: 0.2 }, "<")
    .to(".space__title", { yPercent:-100 }, "<")

    .from(".fade-in__item:nth-child(2)", { autoAlpha: 0 }, "<")
    .from(".space__pagination-item:nth-child(2)", { autoAlpha: 0.2 }, "<")
    .to(".fade-in__item:nth-child(2)", { autoAlpha: 0, delay: 600 })
    .to(".space__pagination-item:nth-child(2)", { autoAlpha: 0.2 }, "<")
    .to(".space__title", { yPercent:-200 }, "<")

    .from(".fade-in__item:nth-child(3)", { autoAlpha: 0 }, "<")
    .from(".space__pagination-item:nth-child(3)", { autoAlpha: 0.2 }, "<")
    .to(".fade-in__item:nth-child(3)", { autoAlpha: 0, delay: 600 })
    .to(".space__pagination-item:nth-child(3)", { autoAlpha: 0.2 }, "<")
    .to(".space__title", { yPercent:-300 }, "<")

    .from(".fade-in__item:nth-child(4)", { autoAlpha: 0 }, "<")
    .from(".space__pagination-item:nth-child(4)", { autoAlpha: 0.2 }, "<")
    .to(".fade-in__item:nth-child(4)", { autoAlpha: 1, duration: 600 })
    .to(".space__pagination-item:nth-child(4)", { autoAlpha: 1, duration: 600 }, "<")


    gsap.to(".space", {
        scrollTrigger:{
            trigger:".visit",
            start:"-15% top",
            end:"bottom top",
            markers: true,
            id: "spaceLeave",
            onEnter:()=>{
                gsap.to(".space__inner", {autoAlpha:"0"})
            },
            onLeaveBack:()=>{
                gsap.to(".space__inner", {autoAlpha:"1"})
            }
        }
    });

    //  Visit
    const card = gsap.timeline({ 
        scrollTrigger: { 
            trigger: ".visit__card-wrap",
            start: "top top",
            //anticipatePin: window.innerWidth < 768 ? 1 : 0,
            anticipatePin: 1,
            end: () => '+=' + window.innerHeight * 1,
            pin: true,
            pinSpacing: true,
            scrub:true,
            // markers: true,
            // id: "visitCard"
        } 
    })
    card.fromTo(".visit__card--anim", {y: window.innerHeight, rotateZ: -18 }, { y:0, rotateZ: 6, duration: 0.8, ease: 'power2.out' });



    // Faq
    $(".faq__question").click(function(){
        var container = $(this).parents(".faq__item");

        if (container.hasClass("expand")) {
            container.removeClass("expand");
        }else{
            container.addClass("expand");
        }
    });

    const faq = gsap.timeline({
        scrollTrigger: {
            trigger: ".faq",
            start: "-10% center",
            end: "bottom bottom",
            // markers: true,
            // id: "faq",
            toggleActions: "play none none reverse",
        }
    });
    faq.to(".faq__item",{"--active-scale":1, autoAlpha: 1, stagger:0.1, duration: 0.5})
    .to(".faq__question",{autoAlpha: 1, stagger:0.1}, "-=0.4")
   


    window.addEventListener("resize", ScrollTrigger.update);
});