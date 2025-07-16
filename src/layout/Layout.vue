<script>
import Header from '@/layout/Header.vue';
import Footer from '@/layout/Footer.vue';
import { RouterView } from 'vue-router'

export default {
  name: 'AppLayout',
  components: {
    Header,
    RouterView,
    Footer
  }
}
</script>

<template>
  <div class="font-poppins min-h-screen bg-white">
    <Header />
    <main class="">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>