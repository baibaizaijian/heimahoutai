<template>
<div class="container">
    <img src="@/assets/404.gif" >
</div>

</template>

<script>
export default {
  name: 'notFound'

}
</script>

<style  lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh; /* 让容器占满整个视口 */
  overflow: hidden;
}

.container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 调整图像以填充容器 */
}
</style>
