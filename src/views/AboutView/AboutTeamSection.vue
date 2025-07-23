<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SectionSubTitle from '@/components/SectionSubTitle.vue'
import TeamCard from '@/components/TeamCard.vue'
// Import team member images (you'll need to add the actual image files)
// import ferImage from '@/assets/img/team/fer.jpg'

export default {
  name: 'AboutTeamSection',
  components: {
    SectionTitle,
    SectionSubTitle,
    TeamCard
  },
  data() {
    return {
      sectionTitle: 'Creamos soluciones atractivas, funcionales e intuitivas',
      sectionSubtitle: 'Los detalles marcan la diferencia. Contar con sitios de calidad o aplicaciones que faciliten el acceso a tus servicios potencia la fidelización e impulsa el crecimiento de tu negocio.',
      highlightedWord: 'soluciones',
      // Team members data
      teamMembers: [
        {
          id: 1,
          name: 'Fer',
          role: 'Project Manager / Psicóloga',
          image: '/src/assets/img/team/fer.jpg', // You'll need to add this image
          gradientFrom: 'from-purple-500',
          gradientVia: 'via-pink-500',
          gradientTo: 'to-orange-400'
        },
        {
          id: 2,
          name: 'Xavi',
          role: 'Desarrollador / Ing. Comercial',
          image: '/src/assets/img/team/xavi.jpg', // You'll need to add this image
          gradientFrom: 'from-purple-500',
          gradientVia: 'via-pink-500',
          gradientTo: 'to-orange-400'
        }
        // Add more team members here as needed
      ]
    }
  }
}

</script>

<template>
  <section id="team" class="min-h-screen  flex flex-col justify-center items-center py-20">
     <!-- Título principal -->
     <div class="text-center mb-10 flex flex-col gap-5">
        <SectionTitle 
          :title="sectionTitle"
          :highlighted-word="highlightedWord"
          alignment="center"

        />
        <div class="hidden xl:block">
          <SectionSubTitle
          :subtitle="sectionSubtitle"
          alignment="center"
          subtitle-color="text-gray-600"
          subtitle-size="text-lg"
          max-width="max-w-3xl"
        />
        </div>
        
       </div>

       <!-- Team Cards Section -->
        <div class="flex flex-col xl:flex-row items-center  justify-between gap-20 lg:gap-16">
            <div class="flex flex-wrap justify-center gap-8 mt-16">
         <TeamCard 
           v-for="member in teamMembers"
           :key="member.id"
           :name="member.name"
           :role="member.role"
           :image="member.image"
           :gradient-from="member.gradientFrom"
           :gradient-via="member.gradientVia"
           :gradient-to="member.gradientTo"
         />
       </div>
       
        </div>
      
        
    </section>
</template>
