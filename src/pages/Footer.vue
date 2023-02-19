<template>
  <footer
      class="footer-section mt-auto"
      :class="classname"
  >
    <!-- footer section -->
    <FooterSection></FooterSection>
  </footer><!-- end footer-section -->
</template>

<script>
export default {
  name: 'Footer',
  props: ['classname']
};
</script>
