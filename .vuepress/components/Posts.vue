<template>
  <b-container class="posts" v-if="posts.length">
    <b-row class="post" v-for="post in posts">
      <b-col sm="auto"><img height="100" v-if="post.frontmatter.feed.image" :src="$withBase(post.frontmatter.feed.image)" alt=""></b-col>
      <b-col>
      <router-link :to="post.path">
        <h2>{{post.frontmatter.feed.date.slice(0, 10)}}   {{post.frontmatter.feed.title}}</h2>
      </router-link>
      <p>{{post.frontmatter.feed.description}}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ["page"],
  computed: {
    posts() {
      let currentPage = this.page ? this.page : this.$page.path;
      let posts = this.$site.pages
        .filter(x => {
          return x.path.match(new RegExp(`(${currentPage})(?=.*html)`));
        })
        .sort((a, b) => {
          return new Date(b.frontmatter.feed.date) - new Date(a.frontmatter.feed.date);
        });
      return posts;
    }
  }
};
</script>
