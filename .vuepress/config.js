
const feed_options = {
  canonical_base: 'https://www.alexshvid.com',
};

const autometa_options = {

  enable : true, // enables/disables everything - control per page using frontmatter
  image  : true, // regular meta image used by search engines
  twitter: true, // twitter card
  og     : true, // open graph: facebook, pinterest, google+
  schema : true, // schema.org for google

  site: {
    name   : 'Alex Shvid',
    twitter: 'AlexShvid',
  },
  canonical_base: 'https://www.alexshvid.com',

  author: {
     name   : 'Alex Shvid',
     twitter: 'AlexShvid',
   }

};

module.exports = {
  title: "Alex Shvid",
  description: "Deep Learning Blog",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Posts", link: "/posts/" }
    ]
  },

  plugins: [
    [ 'feed', feed_options ],
    [ 'autometa', autometa_options ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-101408014-2'
      }
    ]
  ]
}
