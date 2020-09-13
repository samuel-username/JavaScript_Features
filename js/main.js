
const root = document.documentElement;

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
  const x = (pos.x + e.clientX) / e.target.clientWidth * 100 + '%'
  const y = (e.clientY - pos.y) / e.target.clientHeight * 100 + '%'
  // console.log(x, y)
  root.style.setProperty('--ripple-left', x)
  root.style.setProperty('--ripple-top', y)
  
  const keyframes = [
    {
      width: '0',
      height: '0',
    },
    {
      width: '250%',
      height: '250%',
    }
  ];
  
  ripple.animate(keyframes, {duration: 200})
  // wait for animation to finish
  await delay(250)
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
