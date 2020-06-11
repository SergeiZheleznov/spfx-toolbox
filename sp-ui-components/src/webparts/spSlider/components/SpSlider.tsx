import * as React from 'react';
import styles from './SpSlider.module.scss';
import { ISpSliderProps } from './ISpSliderProps';
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
        delay:5500
      },
      loop: true
    });
  });

  return(
    <div className={styles.spSlider}>
      <div className={ styles["swiper-container"] }>
        <div className={styles["swiper-wrapper"]}>
          {props.images.map(src=>(
            <div className={styles["swiper-slide"]}>
              <img className={styles.image} src={src} alt=""/>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-scrollbar"></div>
      </div>
    </div>
  );
};

