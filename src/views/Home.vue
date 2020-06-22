<!-- Example only. One div, with a button, and the Lumino component holder (needs a ref to use
     when the button is clicked) -->
<template>
  <div>
    <button @click="onAddButtonClicked">Add</button>
    <Lumino ref="lumino" />
  </div>
</template>

<script>
// this should be your only import for this component
import Lumino from '@/components/Lumino'
// importing the components we want to display within the Lumino component
import HelloWorld from '@/components/HelloWorld'

/**
 * An example view, showing how to use the Lumino component. Not exported, not for external use, for
 * documentation only.
 *
 * @since 0.1
 */
export default {
  name: 'Home',

  components: {
    Lumino,
    // It is important to declare the components here, or globally, so that when the Lumino component declares
    // <component :is=widget.is />, it is loaded correctly.
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld
  },

  /**
   * An example of a pre-added widget, when we want to create the component but also
   * have a widget added by default.
   *
   * You may prefer to have this at beforeRouteEnter, or somewhere else too.
   */
  mounted () {
    this.$nextTick(() => {
      const id = 'hello-world-pre-added-component-1'
      this.$refs.lumino.addWidget({
        // unique ID
        id,
        name: id,
        is: HelloWorld
      })
    })
  },

  /**
   * Only method implemented is one to handle a button clicked.
   */
  methods: {
    /**
     * Showing how one can add widgets reacting to events such as a button click.
     */
    onAddButtonClicked () {
      const id = `${Math.random()}`
      const widget = {
        id,
        name: `hello-${id}`,
        is: HelloWorld
      }
      this.$refs.lumino.addWidget(widget)
    }
  }
}
</script>
