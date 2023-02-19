<template>
  <div class="hero-wrap-3 section-space-sm-b">
    <div class="container">
      <div
          class="row align-items-center flex-md-row-reverse g-0"
          ref="height"
      >
        <div
            class="col-lg-6 col-sm-9 col-md-6 player"
            ref="width"
        >
          <!--          <Nova-->
          <!--              name="Player"-->
          <!--              :data="{width, height, fileSource}"-->
          <!--          />-->

          <div class="hero-image hero-image-mobile">
            <img
                :src="SectionData.heroData.img"
                alt=""
                class="w-100"
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="hero-content">
            <!-- <h5 class="mb-3 text-uppercase hero-text">{{ SectionData.heroData.subTitle }}</h5> -->
            <!-- <div class="countdown-timer d-flex align-items-center" id="counter"
                 :data-exp-time="SectionData.heroData.time"></div> -->
            <h1 class="hero-title mb-4">{{ SectionData.heroData.title }}</h1>
            <!-- <h6 class="mb-2 text-uppercase hero-text hero-text-s1 text-dark-gray">{{
                SectionData.heroData.subTitleTwo
              }}</h6> -->
            <!-- <div class="d-flex align-items-center mb-4">
              <h2 class="fs-7 me-3">{{ SectionData.heroData.heroPrice }}</h2>
              <span class="fw-semibold">{{ SectionData.heroData.heroPriceTwo }}</span>
            </div> -->
            <ButtonGroup
                :btns="SectionData.btnDataTwo"
                classname="hero-btns"
            ></ButtonGroup>
          </div><!-- hero-content -->
        </div><!-- col-lg-6 -->
      </div>
    </div><!-- .container-->
  </div><!-- end hero-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import sequences from '@/assets/js/sequences';
// import Nova from 'nova-vue-bridge';

// import v4dv from '@/plugins/v4dv';
// import HelloWorld from 'host/HelloWorld';
// import {vue2ToVue3} from '@/utils/vue2ToVue3';

export default {
  name: 'Hero',
  components: {
    // v4dvs: vue2ToVue3(v4dv, 'v4dvs'),
    // Nova
  },
  data() {
    return {
      SectionData,
      handlers: {
        play: null,
        pause: null,
        preload: null,
        init: null,
        destroy: null,
      },
      resizeObserver: null,
      sequences,
      width: 0,
      height: 0,
      playing: null,
      playerVisible: true,
      fileSource: null,
    };
  },
  mounted() {
    this.init();

    /*  =====================================
        Countdown
    ======================================= */
    function countDownTimer(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach(item => {
          let itemid = item.id;
          let exptime = item.dataset.expTime;
          let expMessage = item.dataset.expMessage ? item.dataset.expMessage : 'Countdown Ended';
          // eslint-disable-next-line no-unused-vars
          const year = new Date().getFullYear();
          const choosenDate = new Date(exptime).getTime();

          // eslint-disable-next-line no-unused-vars
          let countdown = setInterval(function () {
            const today = new Date().getTime();
            const diff = choosenDate - today;
            let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (choosenDate >= today) {
              if (document.getElementById(itemid) != null) {
                document.getElementById(itemid).innerHTML =
                    `<div class="countdown-item"><span class="countdown-amount">${hours}</span><span class="countdown-text"> Hours</span></div>
                   <div class="countdown-item"><span class="countdown-amount">${minutes}</span><span class="countdown-text"> Minutes</span></div>
                   <div class="countdown-item"><span class="countdown-amount">${seconds}</span><span class="countdown-text"> Seconds</span></div>`;
              }
            } else {
              document.getElementById(itemid).innerHTML = `<div class="countdown-note">${expMessage}</div>`;
            }
          }, 1000);
        });
      }
    }

    countDownTimer('.countdown-timer');
  },
  beforeUnmount() {
    this.destroyAll();
  },

  methods: {
    initHandlers(handlers) {
      this.handlers = handlers;
    },
    startVideo() {
      this.handlers.preload();
    },
    continueVideo() {
      this.playing = true;
      this.handlers.play();
    },
    pauseVideo() {
      this.playing = false;
      this.handlers.pause();
    },
    destroyAll() {
      if (typeof this.handlers.destroy == 'function') this.handlers.destroy();
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
      this.playerVisible = false;
      this.playing = null;
    },
    init() {
      this.width = this.$refs.width.clientWidth;
      this.height = this.$refs.height.clientHeight;
      const filesAmount = Object.keys(this.sequences).length;
      const sequencesKeys = Object.keys(this.sequences);
      const randomSequenceKey = sequencesKeys[Math.floor(Math.random() * filesAmount)];
      this.fileSource = this.sequences[randomSequenceKey];

      this.resizeObserver = new ResizeObserver((entries) => {
        const { target } = entries[0];
        this.width = target.clientWidth;
        this.height = target.clientHeight;
      });
      this.resizeObserver.observe(this.$refs.width);
      this.playerVisible = true;
      if (this.handlers.init) this.handlers.init();
    },
  },
};
</script>

<style
    scoped
    lang="sass"
>
.player
  flex-basis: unset
  overflow: hidden
  border-radius: 16px
  min-height: 595px
  max-height: 1130px

  &__actions
    position: absolute
    padding: 10px
    width: 100%
    bottom: 0

    span.ni.icon
      font-size: 40px
</style>
