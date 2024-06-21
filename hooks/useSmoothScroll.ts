// import { clamp } from "framer-motion";
// import { useEffect } from "react";

// export function useSmoothScroll() {
//   // scroll
//   useEffect(() => {
//     const scroll = new SmoothScroll(document.body);

//     return () => {
//       scroll.destroy();
//     };
//   }, []);
// }

// class SmoothScroll {
//   private anim: AnimatedValue;
//   private container: HTMLElement;

//   constructor(container: HTMLElement) {
//     // make sure that this is the first thing that being called in initialising
//     this.container = container;

//     // handle event listeners
//     this.addAllEventListeners();

//     this.anim = new AnimatedValue({
//       responsiveness: 0.015,
//       range: { min: 0, max: container.scrollHeight - window.innerHeight },
//     });
//     this.anim.onChange(this.onUpdate.bind(this));
//   }

//   private setTargetValue(val: number) {
//     this.anim.set(val);
//   }

//   private onWheel(e: WheelEvent) {
//     e.preventDefault();

//     const speedFactor = 6;
//     const deviceWheelDeltaCutoff = 50;
//     const delta = e.deltaY;

//     const scrollDelta = clamp(
//       -deviceWheelDeltaCutoff,
//       deviceWheelDeltaCutoff,
//       delta,
//     );
//     this.setTargetValue(this.anim.get() + scrollDelta * speedFactor);
//   }

//   private onScroll(e: Event) {
//     e.preventDefault();
//     // console.log(e.target);
//   }

//   private onWindowResize(e: Event) {
//     this.refreshScrollHeight();
//   }

//   public refreshScrollHeight() {
//     this.anim.set(window.scrollY);
//     this.anim.setRange({
//       max: this.container.scrollHeight - window.innerHeight,
//     });
//   }

//   private onUpdate(latest: number) {
//     // update the dom here
//     window.scrollTo(0, latest);
//   }

//   private addAllEventListeners() {
//     window.addEventListener("wheel", this.onWheel.bind(this), {
//       passive: false,
//     });
//     window.addEventListener("scroll", this.onScroll.bind(this));
//     window.addEventListener("resize", this.onWindowResize.bind(this));
//   }

//   private removeAllEventListeners() {
//     this.container.removeEventListener("wheel", this.onWheel);
//     window.removeEventListener("scroll", this.onScroll);
//     window.removeEventListener("resize", this.onWindowResize);
//   }

//   destroy() {
//     this.removeAllEventListeners();
//   }
// }

// interface Range {
//   min: number;
//   max: number;
// }

// interface AnimatedValueConfig {
//   responsiveness?: number;
//   stopThreshold?: number;
//   range: Range;
// }

// class AnimatedValue {
//   private actualValue: number = 0;
//   private delta: number = 0;
//   private targetValue: number = 0;

//   // config
//   private responsiveness = 0.015;
//   private stopThreshold: number = 0.1;

//   private isAnimating: boolean = false;
//   private changeHandler = (latest: number) => {};

//   private range = { max: 0, min: 0 };

//   constructor(config: AnimatedValueConfig) {
//     this.actualValue = 0;
//     this.setRange(config.range);
//   }

//   public setRange(range: Partial<Range>) {
//     this.range.max = range.max || this.range.min;
//     this.range.min = range.min || this.range.min;
//   }

//   public set(value: number) {
//     this.targetValue = clamp(this.range.min, this.range.max, value);
//     this.beginAnimation();
//   }

//   private beginAnimation() {
//     this.isAnimating = true;
//     this.nextFrame();
//   }

//   public get() {
//     return this.actualValue;
//   }

//   public onChange(changeHandler: (latest: number) => void) {
//     this.changeHandler = changeHandler;
//   }

//   private nextFrame() {
//     if (!this.isAnimating) return;

//     this.delta = (this.targetValue - this.actualValue) * this.responsiveness;

//     // end the update when it is smaller than the value
//     if (Math.abs(this.delta) < this.stopThreshold) {
//       this.actualValue = this.targetValue;
//       this.delta = 0;
//       this.isAnimating = false;
//       return;
//     }

//     // update the value
//     this.actualValue = this.actualValue + this.delta;
//     this.changeHandler(this.actualValue);

//     // continue updating the value
//     requestAnimationFrame(this.nextFrame.bind(this));
//   }
// }
// /**
//  * A hook that enables smooth scrolling on the page.
//  *
//  */
