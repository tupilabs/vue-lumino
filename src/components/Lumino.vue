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

import '@lumino/default-theme/style/index.css';

class LuminoWidget extends Widget {
  /**
   * @param {string} id - widget id
   * @param {string} name - widget name (displayed in the tab bar)
   */
  constructor (id, name) {
    super();
    this.id = id
    // classes and flags
    this.setFlag(Widget.Flag.DisallowLayout)
    this.addClass('content')
    // tab title
    this.title.label = name
    this.title.closable = true
  }
  /**
   * Return a dummy div to be used as parent for the Vue component element.
   * @param {string} id - widget id
   * @return HTMLElement
   */
  static createNode (id) {
    const div = document.createElement('div')
    div.setAttribute('id', id)
    div.setAttribute('class', 'fill-height')
    return div
  }
  onCloseRequest (msg) {
    // remove the Vue component
    const event = new Event('delete:widgetcomponent')
    document.getElementById(this.id).dispatchEvent(event)
    // close widget
    super.onCloseRequest(msg)
  }
  // eslint-disable-next-line no-unused-vars
  onActivateRequest (msg) {
    // Offer an opportunity for components to act when the widget is activated
    const event = new Event('activate:widgetcomponent')
    document.getElementById(this.id).dispatchEvent(event)
  }
}

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
    const luminoWidget = new LuminoWidget('lumino-widget-1', 'home')
    this.dock.addWidget(luminoWidget)
  }
}
</script>
