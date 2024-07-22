/* eslint-disable */
import Typewriter from 'typewriter-effect/dist/core'
import { Flip as NumberFlip } from 'number-flip'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
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

//typewriter
let badge = document.querySelector('.w-webflow-badge')

badge.style.visibility = 'hidden'
badge.style.opacity = '0'
badge.style.display = 'none'

new Typewriter('#typewriter', {
  strings: [
    'Embark on a journey of unparalleled sophistication',
    'Revolutionary design meets cutting-edge technology',
    'Redefining automotive excellence for over 67 years',
  ],
  autoStart: true,
  loop: true,
  delay: 75,
})
//typewrite ends

//NAV LINKS FLIP code…
let navLinks = document.querySelectorAll('.nav-link')
let navCorners = document.querySelector('.nav-corners')
let sectionEls = document.querySelectorAll('[is-section]')

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

//menu nav links code
let menuWrap = document.querySelector('.menu_wrap')
let menuIcon = document.querySelector('.menu')
let closeIcon = document.querySelector('.close')
let mobLinks = document.querySelectorAll('.menu-nav-link')

mobLinks.forEach((link) => {
  link.addEventListener('click', hideMenu)
})
function showMenu() {
  menuWrap.style.display = 'flex'
  setTimeout(() => {
    closeIcon.classList.add('show-icon')
    menuIcon.classList.remove('show-icon')
    menuWrap.style.opacity = '1'
  }, 100)
}

function hideMenu() {
  menuIcon.classList.add('show-icon')
  closeIcon.classList.remove('show-icon')
  menuWrap.style.opacity = '0'
  setTimeout(() => {
    menuWrap.style.display = 'none'
  }, 500)
}

menuIcon.addEventListener('click', showMenu)
closeIcon.addEventListener('click', hideMenu)
//menu nav links code ends

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
    nextEl: '.slider-next.is-intro',
    prevEl: '.slider-prev.is-intro',
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

const modalsContainer = document.querySelector('.modal')
const modals = modalsContainer.querySelectorAll('.modal-item')

modals.forEach((modal) => {
  const cards = modal.querySelectorAll('.modal-detail-item')

  // Set initial opacity for images
  const images = modal.querySelectorAll('.feature-img-wrap')
  images.forEach((image, index) => {
    if (index !== 0) {
      image.style.opacity = '0'
    }
  })

  // Initialize ScrollTriggers
  cards.forEach((card, index) => {
    if (index !== 0) {
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        onEnter: () => {
          gsap.to(card.querySelector('.feature-img-wrap'), {
            opacity: 1,
            duration: 1,
          })
        },
        onLeave: () => {
          gsap.to(card.querySelector('.feature-img-wrap'), {
            opacity: 0,
            duration: 1,
          })
        },
        onLeaveBack: () => {
          gsap.to(card.querySelector('.feature-img-wrap'), {
            opacity: 0,
            duration: 1,
          })
        },
        onEnterBack: () => {
          gsap.to(card.querySelector('.feature-img-wrap'), {
            opacity: 1,
            duration: 1,
          })
        },
        scroller: modal.querySelector('.modal-detail-list'),
        markers: true,
        invalidateOnRefresh: true,
      })
    }
  })

  const closeButton = modal.querySelector('.close-button')
  closeButton.addEventListener('click', closeModal)
})

function closeModal() {
  modalsContainer.classList.remove('two')
  document.body.style.overflow = 'auto'
  modals.forEach((modal) => {
    // lenis.start()
    setTimeout(() => {
      modal.style.display = 'none'
      ScrollTrigger.refresh()
    }, 500)
  })
}

const swiperContainers = document.querySelectorAll(
  '.section-padding.experience-features'
)
swiperContainers.forEach((container) => {
  const slider = container.querySelector('.swiper.is-slider-main')
  const bulletWrapper = container.querySelector('.swiper-bullet-wrapper')

  const swiper = new Swiper(slider, {
    slidesPerView: 4,
    loop: true,
    //centeredSlides: true,
    speed: 700,
    keyboard: true,
    navigation: {
      nextEl: '.slider-next.is-features',
      prevEl: '.slider-prev.is-features',
    },
    pagination: {
      el: bulletWrapper,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      bulletElement: 'button',
      clickable: true,
    },
    mousewheel: {
      forceToAxis: true,
    },
    followFinger: true,
    spaceBetween: '3%',
  })
  const slides = slider.querySelectorAll('.swiper-slide')
  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      //  lenis.stop()
      const location = slide.querySelector('.feature_id').textContent
      modalsContainer.classList.add('two')
      modals[location].style.display = 'flex'
      ScrollTrigger.refresh()
      document.body.style.overflow = 'hidden'
    })
  })
})

///mask split-type gsap words
let typeSplit
let heroTitle
function runSplit() {
  heroTitle = new SplitType('.cover-text', { types: 'chars' })

  typeSplit = new SplitType('.split-word', {
    types: 'lines, words',
  })
  document.querySelectorAll('.word').forEach((word) => {
    const lineMask = document.createElement('div')
    lineMask.classList.add('line-mask')
    word.appendChild(lineMask)
  })
  createAnimation()
}
runSplit()

const preloaderTL = gsap
  .timeline()
  .from(heroTitle.chars, {
    opacity: 0,
    filter: 'blur(60px)',
    y: 50,
    duration: 0.75,
    stagger: 0.075,
    ease: 'sine.out',
    //  onComplete: enableScrolling,
  })
  .from('.cover-arrow', {
    //opacity: 0,
    // filter: 'blur(60px)',
    y: '100%',
    duration: 0.75,
    ease: 'sine.out',
  })
function createAnimation() {
  const allMasks = Array.from(document.querySelectorAll('.word .line-mask'))
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.split-word',
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    },
  })

  tl.to(allMasks, {
    width: '0%',
    duration: 1,
    stagger: 0.5,
  })
}
/// Ends mask split-type gsap words

//refresh on resize
window.addEventListener('resize', () => {
  runSplit()
  ScrollTrigger.refresh()
  closeModal()
})
