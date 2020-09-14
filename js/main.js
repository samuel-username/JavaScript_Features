
const root = document.documentElement;
const body = document.body;

// pop delay
const popTexts = document.querySelectorAll('.pop-text');

for (let i = 0; i < popTexts.length; i++) {
  let delay = Math.floor(Math.random() * (90 - i)) + i;
  popTexts[i].style.animationDelay = `.${delay}s`;
}

// creating the ripple effect
const buttons = document.querySelectorAll('.button')
for (let button of buttons) {
  button.addEventListener('click', positionRipple)
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))

async function positionRipple(e) {
  const ripple = document.createElement('span')
  ripple.classList.add('ripple')
  e.target.appendChild(ripple)
  
  const pos = getPosition(e.target)
  // console.log(pos)
  const x = (e.clientX - pos.x) / e.target.clientWidth * 100 + '%'
  const y = (e.clientY - pos.y) / e.target.clientHeight * 100 + '%'
  // console.log(x, y)
  ripple.style.left = x;
  ripple.style.top = y;
  
  const keyframes = [
    {
      width: '0',
      height: '0',
      borderRadius: '50%'
    },
    {
      width: '250%',
      height: '250%',
      borderRadius: 'inherit'
    }
  ];
  
  ripple.animate(keyframes, {duration: 350})
  // wait for animation to finish
  await delay(400)
  ripple.remove()
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

// Handling the form
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('happy')
})

// Determining page progress
addEventListener('scroll', (e) => {
  const progress = root.scrollTop / (body.clientHeight - root.clientHeight) * 100;
  root.style.setProperty('--page-progress', progress+'%')
})

// Handling the sidebar
const toggleSidebar = document.querySelector('.top-bar .button')
const sidebar = document.querySelector('.sidebar')
toggleSidebar.addEventListener('click', () => {
  
})

