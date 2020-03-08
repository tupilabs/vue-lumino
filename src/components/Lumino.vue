<template>
  <div>
    <button @click="buttonClicked">Add</button>
    <div id="workflow-panel">
      <div ref="main" id="main" class="pa-4 fill-height"></div>
      <div v-show="false">
        <!-- in this hidden area, you need to create your component wrappers. The LuminoWidget will be inserted
             in the div above, but the code will `appendChild` each component to a new widget. -->
        <VueComponentWrapper
            v-for="widgetId of this.widgetIds"
            :key="widgetId"
            :widgetId="widgetId">
          <HelloWorld msg="Hello World Lumino!" />
        </VueComponentWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import { BoxPanel, DockPanel, Widget } from '@lumino/widgets'
import Vue from 'vue'

import '@lumino/default-theme/style/index.css';

/**
 * This is a valid Lumino widget, that contains only a dummy div
 * element.
 *
 * It will be created and added to the Lumino panel, then a Vue component
 * will be created elsewhere, and attached to the div.
 *
 * Events of Lumino widgets are intercepted in this object by overriding
 * functions, and emitting events expected by the Vue component.
 *
 * Since a Vue component needs to follow a certain signature, to
 * receive events, and use the ID to attach the element, we use a
 * Vue component wrapper (see below). An alternative approach could
 * be the use of mixins, or HOC.
 */
class LuminoWidget extends Widget {
  /**
   * @param {string} id - widget id
   * @param {string} name - widget name (displayed in the tab bar)
   */
  constructor (id, name) {
    super({ node: LuminoWidget.createNode(id) })
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
    // Emit an event so that the Vue component knows that it needs to be removed too
    const event = new Event('component:delete')
    document.getElementById(this.id).dispatchEvent(event)
    // call super method
    super.onCloseRequest(msg)
  }
  onActivateRequest (msg) {
    // Emit an event so that the Vue component knows that it was activated
    const event = new Event('component:activate')
    document.getElementById(this.id).dispatchEvent(event)
    // call super method
    super.onActivateRequest(msg)
  }
}

const VueComponentWrapper = Vue.component('VueComponentWrapper', {
  name: 'VueComponentWrapper',
  props: {
    widgetId: {
      type: String,
      required: true
    }
  },
  /**
   * When this component is mounted, we want to transfer/attach it to the
   * Lumino widget.
   */
  mounted () {
    const widgetElement = document.getElementById(this.widgetId)
    widgetElement.appendChild(this.$refs[this.widgetId])
    document.getElementById(this.widgetId).addEventListener('component:delete', this.delete)
  },
  beforeDestroy () {
    document.getElementById(this.widgetId).removeEventListener('component:delete', this.delete)
  },
  methods: {
    delete () {
      // You can also emit an event here, to tell other Vue components that this component is going away...
      this.$destroy()
    }
  },
  template: `
    <div :ref="widgetId">
      <slot></slot>
    </div>
  `
})

/**
 * This component is the example of how the LuminoWidget and the VueComponentWrapper
 * together in your application. You can call this component whatever you like,
 * use more events, or customize more how you use Lumino in your application.
 */
export default {
  name: 'Lumino',
  components: {
    HelloWorld,
    VueComponentWrapper
  },
  data () {
    return {
      // create a box panel, which holds the dock panel, and controls its layout
      main: new BoxPanel({ direction: 'left-to-right', spacing: 0 }),
      // create dock panel, which holds the widgets
      dock: new DockPanel(),
      // holds a list of widgets added to the UI
      widgetIds: []
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
      vm.addWidget('hello-world-1')
    })
  },
  methods: {
    /**
     * Create a widget.
     * @param {string} id - widget ID
     */
    addWidget(id) {
      const luminoWidget = new LuminoWidget(id, 'home')
      this.dock.addWidget(luminoWidget)
      this.widgetIds.push(id)
    },
    buttonClicked () {
      const id = `new-widget-${Math.random()}`
      this.addWidget(id)
    }
  }
}
</script>

<style lang="scss">
$body-font-family: 'Roboto, Ubuntu, Arial, Verdana, sans-serif';
$font-size-root: 14px;
#workflow-panel {
  #main {
    display: flex;
    min-height: calc(100vh - 48px);
    .content {
      min-width: 300px;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      padding: 0;
      border: 1px solid #C0C0C0;
      border-top: none;
      background: white;
      position: relative;
      overflow: auto;
    }

    .p-BoxPanel {
      flex: 1 1 auto;
      .p-TabBar-content {
        padding-left: 0;

        .p-TabBar-tab {
          border-bottom: 1px solid #C0C0C0;
        }

        .p-TabBar-tabLabel {
          font-family: $body-font-family;
          font-size: $font-size-root;
        }

        .p-TabBar-tabCloseIcon {
          color: inherit;
        }

        .p-TabBar-tabCloseIcon:before {
          content: 'X';
        }
      }
    }
  }
}
</style>
