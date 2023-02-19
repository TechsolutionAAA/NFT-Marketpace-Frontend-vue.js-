<template>
  <section class="about-section">
    <div class="container">
      <div
          class="row align-items-center flex"
          :class="isReverse"
          ref="height"
      >
        <div
            class="col-lg-6 mb-5 mb-lg-0 player"
            :class="isClassThree"
            ref="width"
        >
          <Nova
              v-if="isViewer"
              name="Player"
              :data="{width, height, fileSource}"
          />
          <img
              v-else
              :src="img"
              alt=""
              class="w-100"
              :class="isRound"
          >
        </div><!-- end col-lg-6 -->
        <div
            class="col-lg-6"
            :class="isClassTwo"
        >
          <div class="about-content-wrap">
            <h2 class="mb-3">{{ title }}</h2>
            <p :class="isClass">{{ content }}</p>
            <p>{{ contenttwo }}</p>
            <p>{{ contentthree }}</p>
            <p v-html="contentfour"></p>
          </div>
        </div><!-- end col-lg-6 -->
      </div><!-- end row -->
    </div><!-- end container -->
  </section><!-- end about-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import sequences from '@/assets/js/sequences';
import Nova from 'nova-vue-bridge';

export default {
  name: 'AboutSection',
  components: {
    Nova
  },
  props: ['img', 'isViewer', 'title', 'content', 'contenttwo', 'contentthree', 'contentfour', 'isRound', 'isClass', 'isClassTwo', 'isClassThree', 'isReverse'],
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
  },
  methods: {
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
    }
  }
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

