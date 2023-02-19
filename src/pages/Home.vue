<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main bg-gradient">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- hero -->
    <Hero></Hero>
    <!--    &lt;!&ndash; product  &ndash;&gt;-->
    <!--    <section class="section-space trending-section">-->
    <!--      <div class="container">-->
    <!--        &lt;!&ndash; section heading &ndash;&gt;-->
    <!--        <SectionHeading classname="text-center" :text="SectionData.productData.title"-->
    <!--                        :content="SectionData.productData.content" isMargin="mb-3"></SectionHeading>-->
    <!--        &lt;!&ndash; product &ndash;&gt;-->
    <!--        <ProductsContainer></ProductsContainer>-->
    <!--        <div class="text-center mt-5">-->
    <!--          <ButtonLink :text="SectionData.productData.btnText" :link="SectionData.productData.btnLink"-->
    <!--                      classname="btn-link btn-link-s1"></ButtonLink>-->
    <!--        </div>-->
    <!--      </div>&lt;!&ndash; .container &ndash;&gt;-->
    <!--    </section>&lt;!&ndash; trending-section &ndash;&gt;-->
    <!--    &lt;!&ndash; FeaturedCreators  &ndash;&gt;-->
    <!--    <FeaturedCreators></FeaturedCreators>-->
    <!--    &lt;!&ndash; Blog  &ndash;&gt;-->
    <!--    <section class="section-space-b blog-section">-->
    <!--      <div class="container">-->
    <!--        &lt;!&ndash; section heading &ndash;&gt;-->
    <!--        <SectionHeading classname="text-center" :text="SectionData.blogData.title"-->
    <!--                        :content="SectionData.blogData.content" isMargin="mb-3"></SectionHeading>-->
    <!--        &lt;!&ndash; blog section &ndash;&gt;-->
    <!--        <BlogSectionSlider></BlogSectionSlider>-->
    <!--        <div class="text-center mt-5">-->
    <!--          <ButtonLink :text="SectionData.blogData.btnText" link="/blog" classname="btn-link btn-link-s1"></ButtonLink>-->
    <!--        </div>-->
    <!--      </div>&lt;!&ndash; .container &ndash;&gt;-->
    <!--    </section>&lt;!&ndash; end blog-section &ndash;&gt;-->
    <!--    &lt;!&ndash; Cta  &ndash;&gt;-->
    <!--    <Cta class="section-space-b bg-pattern" :title="SectionData.ctaData.title" :content="SectionData.ctaData.content"-->
    <!--         :btntext="SectionData.ctaData.btnText" :btnlink="SectionData.ctaData.btnLink"></Cta>-->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div><!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import Hero from '@/components/section/Hero.vue';

export default {
  name: 'Home-v3',
  components: {
    Hero
  },
  data() {
    return {
      SectionData
    };
  },
  created() {
    this.$emitter.on('disconnect', () => {
      window.location.reload();
    });
  }
};
</script>
