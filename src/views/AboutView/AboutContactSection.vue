<script>
import ContactCard from '@/components/ContactCard.vue'
import MobileContactCard from '@/components/MobileContactCard.vue'
import pandaAvatarFaq from '@/assets/img/faq/panda-avatar-faq.png'
import leonaAvatarFaq from '@/assets/img/animals/leona-cool.png'
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'AboutContactSection',
  components: {
    ContactCard,
    MobileContactCard,
    SectionTitle
  },
  data() {
    return {
      pandaAvatarFaq: pandaAvatarFaq,
      leonaAvatarFaq: leonaAvatarFaq,
      sectionTitle: '¿Tienes dudas o no sabes por dónde empezar?',
      highlightedWord: 'dudas'
    }
  },
  methods: {
    handleContactClick() {
      // Handle contact button click - could open a modal, redirect, etc.
      console.log('Contact button clicked')
    },
    handleEmailClick(email) {
      // Handle email click - could copy to clipboard, open email client, etc.
      console.log('Email clicked:', email)
      // Example: open email client
      window.location.href = `mailto:${email}`
    }
  }
}
</script>

<template>
  <section id="contact" class="min-h-screen  flex flex-col justify-center items-center py-20">
    <div class="">
      
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left Column: Title -->
        <div class="space-y-8">
          <SectionTitle 
            :title="sectionTitle"
            :highlighted-word="highlightedWord"
            alignment="left"
            max-width="max-w-2xl"
          />
        </div>
        
        <!-- Right Column: Contact Cards (Responsive) -->
        <div class="flex justify-center lg:justify-end">
          <!-- Desktop Contact Card -->
          <div class="hidden lg:block">
            <ContactCard 
              :avatar-image="leonaAvatarFaq"
              :gradient-direction="'diagonal'"
              gradient-from="from-green-600"
              gradient-via="via-blue-600"
              gradient-to="to-purple-600"
              
              @contact-click="handleContactClick"
              @email-click="handleEmailClick"
            />
          </div>
          
          <!-- Mobile Contact Card -->
          <div class="block lg:hidden w-full">
            <MobileContactCard 
              :avatar-image="leonaAvatarFaq"
              :gradient-direction="'diagonal'"
              gradient-from="from-green-600"
              gradient-via="via-blue-600"
              gradient-to="to-purple-600"
              
              @contact-click="handleContactClick"
              @email-click="handleEmailClick"
            />
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>