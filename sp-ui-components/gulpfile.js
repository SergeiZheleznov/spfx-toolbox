'use strict';

const build = require('@microsoft/sp-build-web');

const cssClassesToIgnore = [
  'ms-Grid',
  'swiper-container',
  'swiper-container-vertical',
  'swiper-wrapper',
  'swiper-container-android',
  'swiper-slide',
  'swiper-container-multirow',
  'swiper-container-multirow-column',
  'swiper-container-free-mode',
  'swiper-slide-invisible-blank',
  'swiper-container-autoheight',
  'swiper-container-3d',
  'swiper-slide-shadow-left',
  'swiper-slide-shadow-right',
  'swiper-slide-shadow-top',
  'swiper-slide-shadow-bottom',
  'swiper-cube-shadow',
  'swiper-container-css-mode',
  'swiper-container-horizontal',
  'swiper-scrollbar',
  'swiper-scrollbar-drag',
  'swiper-scrollbar-cursor-drag',
  'swiper-scrollbar-lock'
];

cssClassesToIgnore.map(str=>{
  build.addSuppression(`Warning - [sass] The local CSS class '${str}' is not camelCase and will not be type-safe.`);
})

build.initialize(require('gulp'));
