"use strict";
// Selecting Elements in the DOM
const rootElement = document.documentElement,
      topbar = document.querySelector('#top-bar'),
      sidebar = document.querySelector('#sidebar'),
      barItems = document.querySelectorAll('#sidebar li'),
      btn = document.querySelector('#button'),
      overlay = document.querySelector('#overlay'),
      main = document.querySelector('#main'),
      header = document.querySelector('header'),
      hoverBtn = document.querySelector('#hovering-button'),
      comments = document.querySelectorAll('.comment'),
      footer = document.querySelector('footer');

// Some Variables
let sidebarWidth = '40%';
let overlayOp = '0.4'; // Sets overlay opacity
let media = matchMedia('(min-width: 600px)'); // This is a JavaScript media query


// Top bar and hover button Events
addEventListener('scroll', () => {
  let h = header.clientHeight - 15;
  if (rootElement.scrollTop > h) {
    topbar.style.top = '0'; // Shows topbar
    mediaQuery(media); // Call mediaQuery to show hoverBtn when media.matches is false
  } else {
    topbar.style.top = '-50px'; // Hides topbar
    hoverBtn.style.visibility = 'hidden';
    hoverBtn.style.transform = 'scale(0)';
    hoverBtn.classList.remove('.hover');
  }
});

// Button and Sidebar Event
btn.addEventListener('click', () => {
  if (btn.classList.contains('bar-button')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

function openSidebar() {
  sidebar.style.width = sidebarWidth;
  topbar.style.width = `calc(100% - ${sidebarWidth})`;
  for (let barItem of barItems) {
    barItem.style.width = '100%'; // Sets the width of every list item in the side bar 
  }
  sidebar.style.backgroundColor = '#fff';
  main.style.marginLeft = sidebarWidth;
  overlay.style.display = 'block';
  let animationValue = [
    {
      opacity: '0',
      zIndex: '-1'
    },
    {
      opacity: overlayOp,
      zIndex: '2'
    }
  ];
  overlay.animate(animationValue, {duration: 500, fill: 'forwards'});
  
  btn.classList.add('bar-button');
}

function closeSidebar() {
  sidebar.style.width = '0';
  topbar.style.width = '100%';
  for (let barItem of barItems) {
    barItem.style.width = '0'; // Sets the width of every list item in the side bar
  }
  sidebar.style.backgroundColor = '#000';
  main.style.marginLeft = '0';
  let animationValue = [
    {
      opacity: overlayOp,
      zIndex: '2'
    }, 
    {
      opacity: '0',
      zIndex: '-1'
    }
  ];
  overlay.animate(animationValue, {duration: 500, fill: 'forwards'});
  
  btn.classList.remove('bar-button');
}

overlay.addEventListener('click', closeSidebar);
hoverBtn.addEventListener('click', scrollToTop);

function scrollToTop() {
  rootElement.scrollTop = 0;
}

function mediaQuery(media) {
  if (media.matches) {
    hoverBtn.style.display = 'none';
    sidebar.style.width = `${sidebar.parentNode.clientWidth}px`;
    topbar.style.width = `${main.clientWidth}px`;
    
    for (let barItem of barItems) {
      barItem.style.backgroundColor = 'rgb(103, 221, 197)';
      barItem.style.color = '#000'
    }
    
  } else {
    // This condition is necessary to hide hoverBtn on page load and show hoverBtn when page is scrolled
    if (rootElement.scrollTop !== 0) {
      hoverBtn.style.visibility = 'visible';
      hoverBtn.style.transform = 'scale(1)';
      hoverBtn.classList.add('.hover');
    }
    
  }
}

mediaQuery(media);
media.addListener(mediaQuery);

// Commenting text in the code elements
let slash = '//';
for (let comment of comments) {
  let c = comment.textContent;
  comment.textContent = `${slash} ${c}`;
}



