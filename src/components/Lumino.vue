<template>
  <div>
    <div ref="main" id="main" class="pa-4 fill-height"></div>
    <div v-show="false">
      <HelloWorld/>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import { BoxPanel, DockPanel, Widget } from '@lumino/widgets'
export default {
  name: 'Lumino',
  components: {
    HelloWorld
  },
  data () {
    return {
      // create a box panel, which holds the dock panel, and controls its layout
      main: new BoxPanel({ direction: 'left-to-right', spacing: 0 }),
      // create dock panel, which holds the widgets
      dock: new DockPanel()
    }
  },
  created () {
    this.dock.id = 'dock'
    this.main.id = 'main'
    this.main.addWidget(this.dock)
    window.onresize = () => { this.main.update() }
    BoxPanel.setStretch(this.dock, 1)
    const vm = this
    this.$nextTick(() => {
      Widget.attach(vm.main, vm.$refs.main)
    })
    // Create a widget. This can go into a method, event listener, etc

  }
}
</script>
