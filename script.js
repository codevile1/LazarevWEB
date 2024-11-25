gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function navanimation(){
    let nav=document.querySelector("nav")
nav.addEventListener("mouseenter",function(){
    let tl=gsap.timeline();

    tl.to(".nav-bottom",{
        height:"21vh"
    })
    tl.to(".nav2 h5",{
        display:"block"
    })
    tl.to(".nav2 h5 span",{
        y:0,
        stagger:{
            amount:0.6
        }
    })
})
nav.addEventListener("mouseleave",function(){
    let tl=gsap.timeline()
    tl.to(".nav2 h5 span",{
        y:25,
        stagger:
        {
            amount:0.2
        }
    })
    tl.to(".nav2 h5 ",{
        display:"none",
        duration:0.1
    })
    

    tl.to(".nav-bottom",{
        height:0,
        duration:0.2
    })
    
})
}
navanimation();
function page2animation(){
    let rightElem=document.querySelectorAll(".right-elem");
rightElem.forEach(function(elem){
    elem.addEventListener("mouseenter",()=>{
        gsap.to(elem.childNodes[3],{
            opacity:1,
            scale:1  
    })
})
    elem.addEventListener("mouseleave",()=>{
        gsap.to(elem.childNodes[3],{
            opacity:0,
            // scale:onafterprint
    })
    })
    elem.addEventListener("mousemove",(dets)=>{
        gsap.to(elem.childNodes[3],{
            x:dets.x-elem.getBoundingClientRect().x-50,
            y:dets.y-elem.getBoundingClientRect().y-150

    })

})
})
}
page2animation();

function page3videoanimation(){
    let page3=document.querySelector(".page3-container");
let video=document.querySelector("#page3 video");
page3.addEventListener("click",function(){
    video.play()
    gsap.to(video,{
        transform:"scaleX(1) scaleY(1)",
        opacity: 1,
        borderRadius:0
    })
    video.addEventListener("click",function(){
        video.pause()
        gsap.to(video,{
            transform:"scaleX(0) scaleY(0)",
            opacity: 0,
            borderRadius:"30px"
        })

    })
})
}
page3videoanimation();

function videoanimation(){
    let center = document.querySelectorAll(".page5right")
center.forEach(function(elem){
    elem.addEventListener("mouseenter",() => {
            elem.childNodes[3].style.opacity = 1;
            elem.childNodes[3].play();

        })
    elem.addEventListener("mouseleave",()=>{
        elem.childNodes[3].style.opacity=0
        elem.childNodes[3].load();

    })


})
}
videoanimation();
gsap.from(".bottom8-commonpart h4", { 
    x: 0,
    duration: 1.5,
    delay: 0.5,  // Delay of 0.5 seconds before the animation starts
    ease: "power2.out",  // Added easing for smooth acceleration and deceleration
    stagger: {
        amount: -0.5  // Positive stagger amount for smoother animation
    },
    scrollTrigger: {
        trigger: ".bottom8-commonpart",
        scroller: "#main",
        // markers: true,
        start: "top 80%",
        end: "top 10%",
        scrub: true
    }
});

function loadingAnimation() {
    let tl=gsap.timeline();
    tl.from("#page1", {
        scaleX: 0.7,    // Scale on the X-axis
        scaleY: 0.2,      // Scale on the Y-axis
        delay:1,
        opacity:0,
        duration: 1,    // Duration of the animation in seconds
        ease: "power2.out", // Easing for a smoother animation
        borderRadius:"100px",
    });
    tl.from( "#page1 h1 , #page1 p , #page1 div",{
        opacity:0,
        stagger:0.5,
        duration:1,
        ease:"power2.out"
    })
    tl.from("nav",{
        opacity:0,
        // duration:0.5,
        delay:0.2
    })
}
loadingAnimation();