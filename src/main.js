import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
Swiper.use([Navigation, Pagination])

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
  slideToClickedSlide: true,
  centeredSlides: true,
  allowTouchMove: true,
  followFinger: true,
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
// eslint-disable-next-line no-unused-vars
const gallerySlider = new Swiper('.swiper.is-gallery', {
  loop: true,
  slidesPerView: 2,
  centeredSlides: true,
  //match the transition speed from webflow
  speed: 800,
  grabCursor: true,
  keyboard: true,
  slideToClickedSlide: true,
  allowTouchMove: true,
  parallax: true,
  followFinger: true,
})

// eslint-disable-next-line no-unused-vars
const isIntro = new Swiper('.swiper.is-intro', {
  loop: true,
  //slideActiveClass: "is-active",
  centeredSlides: true,
  slidesPerView: 1,
  grabCursor: true, //drag
  followFinger: true, //drag on touchpad/mobile
  keyboard: true,
  effect: 'fade',
  allowTouchMove: true,
  speed: 700,
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
