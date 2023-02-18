<template>
  <!-- <div class="md_card" v-if="news" @click="goTo(news._id)">
    <div class="header">
      <div class="header_title">{{ news.title }}</div>
      <div class="header_date">{{ news.createdAt }}</div>
    </div>

    <div class="media">
      <img :src="news.url" :alt="news.title" class="media_image" />
    </div>
  </div> -->

  <div>
    <div v-if="news && dashboard">
      <div class="single-blog-post">
        <div class="blog-image">
          <img
            class="blog-image-img"
            :src="news.url"
            :alt="news.title"
            @click="goTo(news._id)"
          />

          <div class="date">
            {{ news.createdAt }}
          </div>
        </div>

        <div class="blog-post-content">
          <h3>
            {{ news.title }}
          </h3>
        </div>
      </div>
    </div>
    <div v-else class="blog">
      <img class="blog-image" @click="goTo(news._id)" :src="news.url" alt="" />
      <div class="blog-title" @click="goTo(news._id)">
        {{ news.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {   

  props: ["news", "dashboard"],
  methods: {
    goTo(id) {
      this.$router.push({ path: "/Article/" + id });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.single-blog-post {
  -webkit-transition: 0.5s;
  transition: 0.5s;
  margin-bottom: 30px;
  position: relative;
  height: 30rem;
}
.single-blog-post .blog-image {
  position: relative;
  height: 20rem;
  overflow: hidden;
  @include respond(tablet) {
    height: 15rem;
  }
  &-img {
    width: 100%;
    cursor: pointer;
    position: absolute;
    @include centerElement;
  }
}

.single-blog-post .blog-image .date {
  position: absolute;
  left: 20px;
  bottom: 1rem;
  background: $color-primary;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 50px;
  z-index: 999;
}

.single-blog-post .blog-post-content {
  background: #f7fafd;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  padding-top: 40px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  cursor: pointer;
}
.single-blog-post .blog-post-content h3 {
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 0;
  @include respond(tablet) {
    font-size: 1rem;
    line-height: 30px;
  }
}

.single-blog-post:hover {
  -webkit-box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
}

.single-blog-post:hover .blog-post-content {
  background: #ffffff;
}

.blog {
  display: flex;
  padding: 0 2rem 0 2rem;
  margin-top: 3rem;
  align-items: center;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
  }
  &-image {
    height: 5rem;
  }
  &-title {
    padding: 0 1rem 0 1rem;
    align-items: baseline;
  }
}
</style>
