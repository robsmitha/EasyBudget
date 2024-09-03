<template>
  <v-parallax 
      :src="props.src" 
      :height="props.height"
      class="mt-n16"
  >
      <v-overlay v-model="display" contained class="align-center justify-center text-white" persistent>
          <div>
              <span v-if="$vuetify.display.mobile" class="text-h4 d-flex text-center">{{ props.text }}</span>
              <span v-else class="text-h3 d-flex text-center">{{ props.text }}</span>
              <br />
              <div class="text-center">
                <v-btn v-for="b in actions" :key="b.text" variant="text" :to="b.to" :href="b.href" :prepend-icon="b.icon">{{ b.text }}</v-btn>
              </div>
          </div>
      </v-overlay>
  </v-parallax>
</template>

<script setup lang="ts">
type HeroAction = {
  text: string,
  to: string | undefined,
  href: string | undefined,
  icon: string | undefined
}

let display = true
const props = defineProps({
  src: { type: String, default: 'https://smitha-cdn.s3.us-east-2.amazonaws.com/EasyBudget/background-2731953_1280.png' },
  height: { type: Number, default: 400 },
  text: { type: String, required: true },
  actions: { type: Array<HeroAction>, default: [] }
})
</script>
