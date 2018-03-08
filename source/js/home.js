import Siema from 'siema'

let changeTime
const slider = new Siema({
  selector: '.slider',
  duration: 500,
  loop: true,
  onInit () {
    changeTime = setInterval(() => slider.next(), 8000)
  },
  onChange () {
    clearInterval(changeTime)
    changeTime = setInterval(() => slider.next(), 8000)
  }
})
const prev = document.querySelector('.controls .prev')
const next = document.querySelector('.controls .next')

prev.addEventListener('click', () => slider.prev())
next.addEventListener('click', () => slider.next())
