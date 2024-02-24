/* eslint-disable */
import { Flip } from 'number-flip'
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

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

const textslider = new Swiper('.swiper_titles', {
  slideActiveClass: 'is-active',
  slideDuplicateActiveClass: 'is-active',
  slidesPerView: 'auto',
  speed: 400,
  loop: true,
  // loopedSlides: 8,
  keyboard: true,
  mousewheel: {
    forceToAxis: true,
  },
  slideToClickedSlide: true,
  centeredSlides: true,
  allowTouchMove: true, //click and drag to change
  followFinger: true, //move with click and drag
  thumbs: {
    swiper: bgslider,
  },
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
})

//***use pagination/navigation on the swiper i.e the main controller for accurate realIndex
textslider.on('slideChange', function (e) {
  document.querySelector('.swiper-number-current').innerText = doubleDigits(
    e.realIndex + 1
  )
})

const slidesCount =
  document.querySelectorAll('.swiper_gallery .swiper-slide').length - 2

document.querySelector('.swiper-number-total').innerText =
  doubleDigits(slidesCount)

//interior and exterior swiper
const gallerySlider = new Swiper('.swiper.is-gallery', {
  loop: true,
  slidesPerView: 2,
  centeredSlides: true,
  //match the transition speed from webflow
  speed: 800,
  grabCursor: true,
  keyboard: true,
  mousewheel: {
    forceToAxis: true,
  },
  //slideToClickedSlide: true,
  allowTouchMove: true,
  parallax: true,
  followFinger: true,
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

// let el = document.querySelector('.separate')
// const sepa = new Flip({
//   node: el,
//   from: 0,
// })
// document.querySelector('.btn1').onclick = () => {
//   el.removeChild(el.firstChild)
//   sepa.flipTo({
//     to: 9,
//     duration: 2,
//     easeFn: function (pos) {
//       if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3)
//       return 0.5 * (Math.pow(pos - 2, 3) + 2)
//     },
//   })
// }

// let els = document.querySelectorAll('.separate')
// document.querySelector('.btn1').onclick = () => {
//   els.forEach((el) => {
//     el.removeChild(el.firstChild)
//     let value = el.getAttribute('data')
//     console.log(value)
//     const sepa = new Flip({
//       node: el,
//       from: 0,
//     })
//     sepa.flipTo({
//       to: value,
//       duration: 2,
//       easeFn: function (pos) {
//         if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3)
//         return 0.5 * (Math.pow(pos - 2, 3) + 2)
//       },
//     })
//   })
// }

let els = document.querySelectorAll('.separate')
// Function to execute when trigger enters the view
function myFunction() {
  els.forEach((el) => {
    el.removeChild(el.firstChild)
    let value = el.getAttribute('data')
    console.log(value)
    const sepa = new Flip({
      node: el,
      from: 0,
    })
    sepa.flipTo({
      to: value,
      duration: 3,
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
  start: 'top bottom', // Start the animation when the top of the trigger element reaches the bottom of the viewport
  onEnter: myFunction, // Execute myFunction when the trigger enters the view
})
