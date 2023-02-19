<template>
    <router-link :class="classname" :to="link">{{ text }}</router-link>
</template>

<script>
import SectionData from "@/store/store.js";

export default {
  data() {
    return {
      SectionData,
    };
  },
  name: "ButtonLink",
  props: ["connectStatus", "text", "classname", "link"],
};
</script>
