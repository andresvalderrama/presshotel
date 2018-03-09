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

/* book */
let bookNow = document.querySelector('.booknow')

bookNow.addEventListener('click', event => {
  let { currentTarget } = event

  document.body.classList.toggle('booknow')
})

/* validation */
let inputs = document.querySelectorAll('input')
let form = document.querySelector('form')
function validForm (currentTarget, event) {
  if (currentTarget.disabled || currentTarget.readOnly) return

  let {
    valid,
    valueMissing,
    tooShort,
    patternMismatch,
    typeMismatch,
    tooLong,
    badInput,
    rangeOverflow,
    rangeUnderflow
  } = currentTarget.validity

  if (valid) {
    currentTarget.closest('fieldset').classList.replace('error', 'success')
  }

  if (valueMissing || tooShort || tooLong || patternMismatch || typeMismatch || badInput || rangeOverflow || rangeUnderflow) {
    currentTarget.closest('fieldset').classList.add('error')
    event.preventDefault()
  }

  valueMissing
    ? console.log('campo no puede estar vacio')
    : ''

  tooShort
    ? console.log(`el valor minimo es de ${currentTarget.getAttribute('minLength')} caracteres`)
    : ''

  tooLong
    ? console.log(`el valor maximo es de ${currentTarget.getAttribute('maxLength')} caracteres`)
    : ''

  patternMismatch
    ? console.log(`el valor debe ser ${currentTarget.getAttribute('pattern')}`)
    : ''

  typeMismatch
    ? console.log(`no es un ${currentTarget.type}`)
    : ''

  badInput
    ? console.log('no es un numero')
    : ''

  rangeUnderflow
    ? console.log(`valor min es ${currentTarget.getAttribute('min')}`)
    : ''

  rangeOverflow
    ? console.log(`valor max es ${currentTarget.getAttribute('max')}`)
    : ''
}

for (let input of inputs) {
  input.addEventListener('blur', event => {
    let { currentTarget } = event
    validForm(currentTarget, event)
  })
}

form.addEventListener('submit', event => {
  let input = event.currentTarget.querySelectorAll('input')

  for (let input of inputs) {
    validForm(input, event)
  }
})
