<template>
    <div class="sidebar-widget-wrapper">
     
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title mb-2">Autres articles</h3>
            <div class="sidebar-widget-content">
                <ul class="sidebar-widget-list-post">
                    <li v-for="(article, index) in selected" :key="index" >
                        <span class="cate">{{article.createdAt}}</span>
                        <router-link :to="'/Article/' + article._id"> {{article.title}}</router-link>
                    </li>
                   
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
export default {
      props: ["news"],
      computed: {
          selected(){
              let autres = [];
              for (let index = 0; index < 4; index++) {
                  const random = Math.floor(Math.random() * this.news.length); // ici on genere un index 
                  const trouver = autres.filter(element=> element == this.news[random] )
                      if (trouver.length < 1) {
                          autres.push(this.news[random]);
                      }
                                    
              }
              return autres;
          }
      },
        methods: {
    goTo(id) {
      this.$router.push({ path: "/Article/" + id });
    },
  },

}
</script>