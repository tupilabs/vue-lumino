<template>
  <div>
    <button @click="buttonClicked">Add</button>
    <Lumino ref="lumino" />
  </div>
</template>

<script>
import Lumino from '@/components/Lumino'
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'Home',

  components: {
    Lumino,
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
        vm.$refs.lumino.addWidget({
          id: 'hello-world-1',
          is: HelloWorld
        })
      })
    })
  },

  methods: {
    buttonClicked () {
      const id = `new-widget-${Math.random()}`
      const widget = {
        id,
        is: HelloWorld
      }
      this.$refs.lumino.addWidget(widget)
    }
  }
}
</script>
