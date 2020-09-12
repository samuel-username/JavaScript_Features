
// pop delay
const popTexts = document.querySelectorAll('.pop-text')
for (let i = 0; i < popTexts.length; i++) {
  popTexts[i].style.animationDelay = `${i}`;
}

