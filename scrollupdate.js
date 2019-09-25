function resizeHeaderOnScroll() {
  // Was trying to ensure the scrolltop value works on all devices, didn't seem to work on iOS Safari though

  let distanceY = Math.max(document.body.scrollTop, mainContainer.scrollTop, window.screenTop)

  // Calculate screen multiplier percentage using scrolltop value

  const percentage = clamp(distanceY / (clamp(screen.width, 350, 450)), 0, 1);
      

  // Set css opacity/filter styles based on percentage
  document.getElementsByClassName("ParallaxContainer")[0].style.setProperty('opacity', 1 - (clamp((Math.min(percentage, 80)), 0, 1)));
  document.getElementsByClassName("invert")[0].style.setProperty('filter', `invert(${100 * (clamp((Math.min(percentage, 100)), 0, 1))}%)`);

  // Set width of nav bar containers, (4 for desktop, and 2 for mobile as it collapses one on each side to a column instead of row)
  for(var i = 0; i < headerEls.length; i++){
    headerEls[i].style.width = `${parseInt(widths[i] * (percentage * 1.31))}px`
  }

  
  
}

// Clamp value to required min and max values 

var clamp = (number, min, max) => {
  return Math.min(Math.max(number, min), max)
}

var headerEls = document.getElementsByClassName('navbar_linkbox');
var mainContainer;
var widths = [];
var paddingsLeft = [];
var paddingsRight = [];

for(var i = 0; i < headerEls.length; i++){
  headerEls[i].style.width = `${0}px`
}

// Waits for loaded content to continue

document.addEventListener("DOMContentLoaded", function(event) {
  headerEls = document.getElementsByClassName('nav-link')
  headerEls = document.getElementsByClassName('navbar_linkbox')
  for(var i = 0; i < headerEls.length; i++){
    var width = window.getComputedStyle(headerEls[i], null).getPropertyValue('width')
    widths.push(parseInt(width.slice(0, width.length - 2)))

    var paddingLeft = window.getComputedStyle(headerEls[i], null).getPropertyValue('padding-left')
    paddingsLeft.push(parseInt(paddingLeft.slice(0, paddingLeft.length - 2)))

    var paddingRight = window.getComputedStyle(headerEls[i], null).getPropertyValue('padding-right')
    paddingsRight.push(parseInt(paddingRight.slice(0, paddingRight.length - 2)))

    headerEls[i].style.width = "0"
    headerEls[i].style.paddingLeft = "0"
    headerEls[i].style.paddingRight = "0"
  }

  document.getElementsByClassName("ParallaxContainer")[0].style.setProperty('opacity', 1);
  document.getElementsByClassName("invert")[0].style.setProperty('filter', `invert(0%)`);
  mainContainer = document.getElementsByClassName("MainContainer")[0];
  // parallaxopacity = document.getElementsByClassName("ParallaxContainer")[0]
  mainContainer.addEventListener('scroll', resizeHeaderOnScroll, {passive: true})
  // $(document.body).on('touchmove', resizeHeaderonScroll); 
  mainContainer.addEventListener('touchmove', resizeHeaderOnScroll, {passive: true})
  document.body.addEventListener('touchmove', resizeHeaderOnScroll, {passive: true})
});