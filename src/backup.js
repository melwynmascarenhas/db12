/* eslint-disable */
import { Flip as NumberFlip } from 'number-flip'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(Flip, ScrollTrigger)

import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
} from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
Swiper.use([
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
])

//NAV LINKS FLIP code…
let navLinks = document.querySelectorAll('.nav-link')
let navCorners = document.querySelector('.nav-corners')
let sectionEls = document.querySelectorAll('.section')

//removing active form all nav links and add to the actual active
function updateActiveNavLink(targetId) {
  navLinks.forEach((navLinkEl) => {
    navLinkEl.classList.remove('is--active')
    if (navLinkEl.href.includes(targetId)) {
      navLinkEl.classList.add('is--active')
    }
  })
}
///scroll on the nav starts here
function scrollNav() {
  let activeSection = null
  sectionEls.forEach((sectionEl) => {
    if (window.scrollY >= sectionEl.offsetTop - sectionEl.clientHeight / 10) {
      activeSection = sectionEl.id
    }
  })
  //for the cover section the id will be null
  if (activeSection !== null) {
    updateActiveNavLink(activeSection)
    navCorners.style.visibility = 'visible'
    const state = Flip.getState(navCorners)
    const activeLink = document.querySelector('.nav-link.is--active')
    activeLink.appendChild(navCorners)
    Flip.from(state, {
      duration: 0.1,
      ease: 'none',
    })
  } else {
    navLinks.forEach((navLinkEl) => {
      navLinkEl.classList.remove('is--active')
      navCorners.style.visibility = 'hidden'
    })
  }
}
window.addEventListener('scroll', scrollNav)
///scroll on the nav ends here

//for loop to add event listener
navLinks.forEach(function (link) {
  navCorners.style.visibility = 'hidden'
  //click event listener
  link.addEventListener('click', function (e) {
    //first remove active class from the current link
    //no need to check all the links where the active class is applied ...using loop remove all
    navLinks.forEach(function (link) {
      link.classList.remove('is--active')
    })
    //add active class to current link
    this.classList.add('is--active')
  })
})
///NAV LINKS FLIP ends here

///NUMBERS CODE
let els = document.querySelectorAll('.separate')
// Function to execute when trigger enters the view
function myFunction() {
  els.forEach((el) => {
    el.removeChild(el.firstChild)
    let value = el.getAttribute('data')
    const sepa = new NumberFlip({
      node: el,
      from: 0,
    })
    sepa.flipTo({
      to: value,
      duration: 2.5,
      easeFn: function (pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3)
        return 0.5 * (Math.pow(pos - 2, 3) + 2)
      },
    })
  })
}

// Get the trigger element
const triggerElement = document.querySelector('.box')

// Create ScrollTrigger
ScrollTrigger.create({
  trigger: triggerElement,
  start: 'top bottom',
  onEnter: function () {
    myFunction()
    ScrollTrigger.getById('myTrigger').disable() // Disable the trigger after it runs once
  },
  id: 'myTrigger', // Assign an ID to the ScrollTrigger instance
})
//// NUMBER CODE ENDS HERE

//SWIPERS CODE START HERE

function doubleDigits(num) {
  if (num < 10) {
    return '0' + num
  } else return num
}
const bgslider = new Swiper('.swiper_gallery', {
  slidePerView: 1,
  speed: 400,
  effect: 'fade',
  loop: true,
  // loopedSlides: 8,
  allowTouchMove: false, //click an drag
})

const isIntro = new Swiper('.swiper.is-intro', {
  slidePerView: 1,
  speed: 800,
  effect: 'fade',
  loop: true,
  allowTouchMove: true,
  grabCursor: true, //just changes the icon
  followFinger: true, //drag on touchpad/mobile
  keyboard: true,
  mousewheel: {
    forceToAxis: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
    // disabledClass: "is-disabled",
  },

  pagination: {
    el: '.swiper-pagination-progressbar',
    type: 'progressbar',
    clickable: true,
    progressbarFillClass: 'swiper-pagination-progressbar-fill',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
})

const modalContents = document.querySelectorAll('.interior-modal-item')

const modalScroller = document.querySelector('.modal-content')

modalContents.forEach((modalContent) => {
  modalContent.style.display = 'none'
})

var Modal = document.querySelector('.modal-container')
const CloseButton = Modal.querySelector('.close-button')

const swipers = document.querySelectorAll('.swiper.is-slider-main')
swipers.forEach((slider) => {
  //common slide code
  const swiper = new Swiper(slider, {
    slidesPerView: 3,
    loop: true,
    speed: 700,
    keyboard: true,
    mousewheel: {
      forceToAxis: true,
    },
    followFinger: true,
    spaceBetween: '5%',
    //this will push the slides outside the container so specify brpoints in slidesPer as below
  })
  //common slide code ENDS

  //ITERATE SLIDES FOR CLICK EVENT
  const slides = slider.querySelectorAll('.swiper-slide')
  slides.forEach((slide) => {
    const button = slide.querySelector('.feature-slide-content')
    const location = 0
    // slide.querySelector('.feature_id').textContent

    button.addEventListener('click', () => {
      console.log(button)
      console.log(location)
      let modalContent = modalContents[location]
      modalContent.style.display = 'flex'
      Modal.classList.add('two')
      document.body.style.overflow = 'hidden'

      //dont use query selector since we want in array of class format.
      const details = modalContent.querySelectorAll(
        '.feature-detail-wrap:not(:first-child)'
      )
      const allPhotos = modalContent.querySelectorAll('.feature-image-wrap')
      let photos = [...allPhotos].slice(1)
      photos.forEach((photo) => {
        photo.style.opacity = 0

        gsap.to(photo, {
          opacity: 0.5,
          scrollTrigger: {
            trigger: photo,
            start: 'top 80%',
            end: 'top top%',
            scrub: true,
            scroller: modalContent,
            markers: true,
          },
        })
      })
    })

    CloseButton.addEventListener('click', () => {
      Modal.classList.remove('two')
      document.body.style.overflow = 'auto'
      console.log('Clicked slide index:', location)
      modalContents.forEach((modalContent) => {
        modalContent.style.display = 'block'
      })
    })
  })
})
