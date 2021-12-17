<template>
  <div>
    <div class="row">
      <div class="col-12 ">
        <div class="title-box">
          <h1 class="title">Articles</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="news">
               <!-- Blog Section Start -->
        <div class="section-padding fix">
            <div class="container">
                <div class="row  mtn-50">
                    <div class="col-lg-8 col-12 order-lg-1 mt-50">
                        <div class="row row-cols-1 no-gutters">
                            <!-- Blog Start -->
                            <div class="blog-3 blog-details col" data-aos="fade-up">
                                <div class="thumbnail">
                                    <img :src="news.url" alt="Blog Image">
                                </div>
                                <div class="info">
                                    <h3 class="title">{{ news.title }}</h3>
                                    <div class="desc" v-html="news.content">
                                       </div>
                                    <ul class="meta mb-0 mt-4">
                                        <li>
                                                  <font-awesome-icon :icon="['fas', 'calendar']" />

                                          {{news.createdAt}}</li>
                                    
                                        <!-- <li class="media"><a href="#"><i class="fas fa-share-alt"></i>Share this post</a>
                                            <div class="list">
                                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                                <a href="#"><i class="fab fa-twitter"></i></a>
                                                <a href="#"><i class="fab fa-linkedin"></i></a>
                                                <a href="#"><i class="fab fa-tumblr-square"></i></a>
                                            </div>
                                        </li> -->
                                    </ul>
                                </div>
                            </div>

                           
                        </div>
                    </div>

                    <div class="col-lg-4 col-12 order-lg-2 mt-50">
                        <BlogSidebar :news="Allnews" />
                    </div>
                </div>
            </div>
        </div>
        <!-- Blog Section End -->
      </div>
    </div>
    <!-- <div class="row mt-5">
      <div class="col-12 col-md-6" v-if="prev">
        <h1 class="h5">Article precèdent</h1>
        <News :news="prev" :dashboard="false"></News>
      </div>
      <div class="col-12 col-md-6" v-if="next">
        <h1 class="h5">Article suivant</h1>
        <News :news="next" :dashboard="false"></News>
      </div>
    </div> -->
  </div>
</template>

<script>
import BlogSidebar from "../components/BlogSidebar";
export default {
  components: {
                BlogSidebar,

  },
  computed: {
    Allnews() {
      return this.$store.state.media.allNews;
    },
    news() {
      const article = this.Allnews.filter((x) => {
        return x._id === this.$route.params.id;
      });
      if (article.length === 0) {
        return article[0];
      } else {
        return article[0];
      }
    },
    prev() {
      let result = {};
      for (let index = 0; index < this.Allnews.length; index++) {
        if (this.news === this.Allnews[index]) {
          result = this.Allnews[index - 1];
        }
      }
      return result;
    },
    next() {
      let result = {};
      for (let index = 0; index < this.Allnews.length; index++) {
        if (this.news === this.Allnews[index]) {
          result = this.Allnews[index + 1];
        }
      }
      return result;
    },
  },
  methods: {
    goError() {
      this.$router.push({ name: "404" });
    },
  },
};
</script>

<style lang="scss">
@import "../sass/main.scss";
.news-box {
  width: 100%;
  &_image {
    @include respond(big-desk) {
      height: 40vh !important;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
        @include respond(desk) {
      height: 50vh !important;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    float: left;
    width: 30%;
    display: flex;
    justify-content: center;
    &_img {
      height: auto;
      width: auto;
    }

    @include respond(tablet-land) {
      height: 30vh !important;
            margin-right: 2rem;
      margin-bottom: 2rem;
    }
    @include respond(tablet) {
      float: none;
      width: 100%;
      height: 50vh;
    }
  }
  &_content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  &_title {
      @include respond(big-desk) {
    font-size: 1.5rem !important;
    margin-bottom: 2rem;
  }
        @include respond(desk) {
    font-size: 1rem !important;
    margin-bottom: 2rem;
  }
  @include respond(tablet-land) {
    font-size: 1.5rem !important;
        margin-bottom: 2rem;

  }

    @include respond(tablet) {
    font-size: 1rem !important;
        margin-bottom: 1rem;

  }
  }
}
span {
  @include respond(big-desk) {
    font-size: 2rem !important;
  }
  @include respond(tablet-land) {
    font-size: 1.5rem !important;
  }

    @include respond(tablet) {
    font-size: 1rem !important;
  }
}
.title-box {
  position: relative;
  height: 40vh;
  background-image: url("../assets/article.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .title {
    position: absolute;
    bottom: 1vh;
    left: 1vh;
    font-size: 2rem;
    text-transform: uppercase;
    color: white;
  }

  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 50vh;
    min-width: 100%;
  }
}
/* 08.03. Blog Details CSS */

.entry-author {
    & .author-info {
        display: flex;
        // Responsive
        @media #{$large-mobile}{
            flex-wrap: wrap;
        }
    }
    & .author-avatar {
        flex-shrink: 0;
        width: 170px;
        text-align: center;
        & img {
            border-radius: 50%;
        }
        // Responsive
        @media #{$large-mobile}{
            text-align: left;
            margin-bottom: 30px;
        }
        @media #{$small-mobile}{
            width: 120px;
        }
    }
    & .author-name{
        font-size: 17px;
        line-height: 24px;
        color: $primary;
        font-weight: 400;
        margin-bottom: 0;
    }
    & .designation{
        font-size: 15px;
        line-height: 24px;
    }
    & .author-biographical-info {
        margin-top: 15px;
        font-size: 15px;
        color: $body-color;
    }
}

.blog-nav-links{
    margin-top: 35px;
    .title{
        display: block;
        font-size: 24px;
        line-height: 1.3;
        font-weight: 700;
        margin-bottom: 40px;
    }
    .nav-list{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 30px;
        // Responsive
        @media #{$large-mobile}{
            grid-template-columns: auto;
        }
        .nav-item{
            .inner{
                a{
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-end;
                    padding-top: 50px;
                    border-radius: 5px;
                    overflow: hidden;
                    background: $white;
                    padding: 50px 30px 25px;
                    border: 1px solid #e7e7e7;
                    transition: $transition;
                    // Responsive
                    @media #{$desktop-device}{
                        padding: 35px 20px 25px;
                    }
                    .hover-bg{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #333;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        transition: $transition;
                        opacity: 0;
                        &::before{
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            opacity: .5;
                            background-image: linear-gradient(-180deg,rgba(51,51,51,0) 0%,#000 80%);
                            border-radius: 5px;
                        }
                    }
                    .cate{
                        position: relative;
                        display: block;
                        word-wrap: break-word;
                        width: 100%;
                    }
                    h6{
                        position: relative;
                        display: block;
                        word-wrap: break-word;
                        width: 100%;
                        font-size: 18px;
                        font-weight: 700;
                        line-height: 1.56;
                        margin: 0;
                    }
                    &:hover{
                        .hover-bg{
                            opacity: 1;
                        }
                        .cate{
                            color: $white;
                        }
                        h6{
                            color: $white;
                        }
                    }
                }
            }
        }
    }
}

.comment-list-wrapper {
    padding-top: 30px;
    margin-top: 45px;
    .title{
        display: block;
        font-size: 24px;
        line-height: 1.3;
        font-weight: 700;
        margin-bottom: 40px;
    }
}

.comment-list {
    margin: 0;
    padding: 0;
    & .comment {
        list-style-type: none;
        padding: 30px 30px;
        border: 1px solid #e7e7e7;
        margin-bottom: 30px;
        border-radius: 5px;
        // Responsive
        @media #{$extra-small-mobile}{
            padding: 15px 15px;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    & .comment-author {
        float: left;
        & img {
            border-radius: 50px;
        }
        // Responsive
        @media #{$extra-small-mobile}{
            float: none;
        }
    }
    & .comment-content {
        position: relative;
        overflow: hidden;
        margin-left: 100px;
        // Responsive
        @media #{$extra-small-mobile}{
            margin-left: 0;
            margin-top: 15px;
        }
    }
    .meta {
        margin-bottom: 12px;
        & .fn {
            font-size: 15px;
            text-transform: uppercase;
            color: $primary;
            display: inline-block;
            margin-bottom: 0;
        }
        & .comment-datetime {
            position: relative;
            display: block;
            font-size: 14px;
            color: #ababab;
        }
    }
    & .comment-actions a {
        margin-right: 20px;
        font-size: 14px;
        font-weight: 400;
        font-family: $link-font;
        color: $heading-color;
        &:hover {
            color: $primary;
        }
    }
    & .children {
        margin: 20px 0 20px 50px;
        border: 0;
        background-color: #f8faff;
        @media #{$large-mobile} {
            margin: 20px 0 20px 25px;
        }
    }
    & .children li + li {
        margin-top: 35px;
    }
    & .comment-actions {
        margin-top: 16px;
        color: $secondary;
        text-align: right;
        & .comment-reply-link {
            display: inline-block;
            margin-left: 10px;
            font-family: $link-font;
            margin-right: 10px;
            font-weight: 400;
        }
    }
}

.comment-form-wrap{
    margin-top: 60px;
    .comment-respond{
        .title{
            display: block;
            font-size: 24px;
            line-height: 1.3;
            font-weight: 700;
            margin-bottom: 20px;
        }
    }
}
/* 08.02. Blog Two CSS */

.blog-3 {
    height: 100%;
    margin-bottom: 50px;
    padding-bottom: 50px;

    transition: $transition;

    border-bottom: 1px solid $border-color;

    & .thumbnail {
        position: relative;

        overflow: hidden;

        border-radius: 5px;

        & .image {
            display: block;

            & img {
                width: 100%;

                transition: all 1.5s cubic-bezier(0, 0, 0.2, 1);
            }
        }
    }

    & .info {
        position: relative;

        padding: 30px 0 0;

        & .meta {
            font-size: 14px;
            line-height: 27px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-right: -28px;
            margin-bottom: 30px;
            padding-left: 0;

            list-style: none;

            & li {
                margin-right: 28px;

                & i {
                    color: $primary;
                    margin-right: 10px;
                }

                & .avatar {
                    width: 32px;
                    height: 32px;
                    margin-right: 8px;

                    border-radius: 50%;
                }

                & a {
                    display: flex;
                    align-items: center;
                }
            }
        }

        & .title {
            font-size: 32px;
            line-height: 44px;
            font-weight: 600;
            margin: 0;

            & a {
            }
        }

       

        & .desc {
            margin-top: 30px;
            strong{
                color: $heading-color;
                font-family: 400;
            }
            .block-quote{
                border-left: 4px solid $primary;
                padding-left: 20px;
                margin: 50px 0 44px 48px;
                font-size: 18px;
                font-weight: 500;
                line-height: 1.78;
                max-width: 660px;
                // Responsive
                @media #{$large-mobile}{
                    margin: 25px 0 20px 0px;
                }
            }
        }

        & .entry-post-tags{
            display: flex;
            .tag-label{
                margin: 0 7px 0 0;
            }
        }
    }

    &:hover {
        & .thumbnail {
            & .image {
                & img {
                    transform: scale(1.1);
                }
            }
        }
    }

    @media #{$large-mobile} {
        & .info {
            & .meta{
                margin-bottom: 15px;
            }
            & .title {
                font-size: 24px;
                line-height: 32px;
            }
            & .desc{
                margin-top: 15px;
            }
        }
    }

    @media #{$extra-small-mobile} {
        & .post-share {
            & .label {
                display: none;
            }
        }
    }
}

.media {
    position: relative;

.list {
    position: absolute;
    z-index: 999;
    left: 0;
    bottom: 100%;

    display: flex;
    visibility: hidden;

    width: auto;
    padding: 0 4px;

    user-select: none;
    transition: $transition;
    transform: translateY(0px);
    white-space: nowrap;

    opacity: 0;
    border-radius: 5px;
    background: $white;
    box-shadow: 0 2px 20px rgba($black, 0.06);

    filter: drop-shadow(0 2px 20px rgba($black, 0.06));

    &::before {
        position: absolute;
        top: 100%;
        left: 20px;

        content: "";

        border-top: 8px solid $white;
        border-right: 9px solid transparent;
        border-left: 9px solid transparent;
    }

    & a {
        display: flex;

        padding: 10px 8px;

        &:hover {
            color: $primary;
        }

        & i {
        }
    }
}

&:hover {
    & .icon {
        color: $white;
        border-color: transparent;
        background-color: $primary;
    }

    & .list {
        visibility: visible;

        transform: translateY(-10px);

        opacity: 1;
    }
}
}
/* 08.01. Blog One CSS */

.blog {
    overflow: hidden;
    height: 100%;
    transition: $transition;

    & .thumbnail {
        position: relative;
        overflow: hidden;

        & .image {
            display: block;

            & img {
                width: 100%;
                transition: all 1.5s cubic-bezier(0, 0, 0.2, 1);
            }
        }
    }

    & .info {
        position: relative;
        padding-top: 30px;

        & .title {
            font-size: 24px;
            line-height: 1.3;
            margin-bottom: 15px;
            // Responsive
            @media #{$large-mobile}{
                font-size: 18px;
                line-height: 1.3;
            }
        }

        & .desc {
            margin-top: 10px;
        }

        & .meta {
            font-size: 14px;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            padding-left: 0;
            list-style: none;

            & li {
                margin-right: 28px;

                &:last-child {
                    margin-right: 0;
                }

                & i {
                    margin-right: 10px;
                }
            }
        }
    }

    &:hover {
        & .thumbnail {
            & .image {
                & img {
                    transform: scale(1.1);
                }
            }
        }
    }
}
</style>
