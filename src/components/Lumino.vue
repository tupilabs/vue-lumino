<template>
  <div>
    <div id="workflow-panel">
      <div ref="main" id="main" class="pa-4 fill-height"></div>
      <div v-show="false">
        <!-- in this hidden area, you need to create your component wrappers. The LuminoWidget will be inserted
             in the div above, but the code will `appendChild` each component to a new widget. -->
        <VueComponentWrapper
            v-for="widget of this.widgets"
            :key="widget.id"
            :widget="widget">
          <component
            :is="widget.is"
          />
        </VueComponentWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { LuminoWidget, VueComponentWrapper } from '@/components/lumino-widget'
import { BoxPanel, DockPanel, Widget } from '@lumino/widgets'

import '@lumino/default-theme/style/index.css';

/**
 * This component is the example of how the LuminoWidget and the VueComponentWrapper
 * together in your application. You can call this component whatever you like,
 * use more events, or customize more how you use Lumino in your application.
 */
export default {
  name: 'Lumino',

  components: {
    VueComponentWrapper
  },

  data () {
    return {
      // create a box panel, which holds the dock panel, and controls its layout
      main: new BoxPanel({ direction: 'left-to-right', spacing: 0 }),
      // create dock panel, which holds the widgets
      dock: new DockPanel(),
      // holds a list of widgets added to the UI
      widgets: []
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
  },

  methods: {
    /**
     * Create a widget.
     * @param {{
     *   id: string
     * }} widget - widget ID
     */
    addWidget(widget) {
      const luminoWidget = new LuminoWidget(widget.id, 'home')
      this.dock.addWidget(luminoWidget)
      this.widgets.push(widget)
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
