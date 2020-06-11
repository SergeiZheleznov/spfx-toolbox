import * as React from 'react';
import styles from './SpSlider.module.scss';
import { ISpSliderProps } from './ISpSliderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Swiper from 'swiper';

export const SpSlider: React.FunctionComponent<ISpSliderProps> = (props) => {

  React.useEffect(()=>{
    const slider = new Swiper(`.${styles["swiper-container"]}`,{
      direction: 'horizontal',
      containerModifierClass: `${styles["swiper-container"]}-`,
      slideClass: styles["swiper-slide"],
      slideActiveClass: styles["swiper-slide-active"],
      slideDuplicateActiveClass: styles["swiper-slide-duplicate-active"],
      slideVisibleClass: styles["swiper-slide-visible"],
      slideDuplicateClass: styles["swiper-slide-duplicate"],
      slideNextClass: styles["swiper-slide-next"],
      slideDuplicateNextClass: styles["swiper-slide-duplicate-next"],
      slidePrevClass: styles["swiper-slide-prev"],
      slideDuplicatePrevClass: styles["swiper-slide-duplicate-prev"],
      wrapperClass: styles["swiper-wrapper"],
      autoplay: {
        delay:1500
      },
      loop: true
    });
  });

  return(
    <div className={styles.spSlider}>
      <div className={ styles["swiper-container"] }>
        <div className={styles["swiper-wrapper"]}>
            <div className={styles["swiper-slide"]}>Slide 1</div>
            <div className={styles["swiper-slide"]}>Slide 2</div>
            <div className={styles["swiper-slide"]}>Slide 3</div>
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-scrollbar"></div>
      </div>
    </div>
  );
};

