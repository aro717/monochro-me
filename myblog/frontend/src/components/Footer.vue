<template>
  <footer>
  <!--
    <p>Copyright 2020 Narito Takizawa.</p>
    <ul>
      <li><a href="https://twitter.com/toritoritorina">Twitter</a></li>
      <li><a href="mailto:toritoritorina@gmail.com">Mail</a></li>
      <li><a href="https://www.amazon.co.jp/hz/wishlist/ls/2ZCE9KHVM7FRA?&sort=default">WishList</a></li>
      <li><a href="https://github.com/naritotakizawa/django-narito-blog3">Github</a></li>
    </ul>
  -->
  </footer>
</template>

<script>
export default {
  name: 'site-footer'
}
</script>

<style scoped>
footer {
  background-color: #f8f8f2;
  color: #272822;
  padding: 0 20px;
  margin-top: 160px;
}

ul > li {
  display: inline-block;
  margin-right: 2em;
}

ul a {
  color: #f8f8f2;
  text-decoration: none;
}

@media (min-width: 768px) {
  footer {
    padding: 0;
    height: 50px;
    display: grid;
    grid-template-columns: 1fr 700px 1fr;
    grid-template-rows: 1fr;
  }

  footer > * {
    grid-column: 2;
    grid-row: 1;
  }
  p {
    justify-self: start;
    align-self: center;
  }
  ul {
    justify-self: end;
    align-self: center;
  }
}

@media (min-width: 1024px) {
  footer {
    grid-template-columns: 1fr 980px 1fr;
  }
}
</style>
