<template>
  <div class="demo-component">{{ text }}</div>
</template>
<script name="DemoComponents" setup>
const props = defineProps({
  text: String,
});
</script>
<style lang="less" scoped>
.demo-component {
}
</style>
