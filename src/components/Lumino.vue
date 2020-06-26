<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

<template>
  <div>
    <div id="workflow-panel">
      <div ref="main" id="main" class="pa-4 fill-height"></div>
      <div v-show="false">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import LuminoWidget from '@/components/lumino-widget'
import { BoxPanel, DockPanel, Widget } from '@lumino/widgets'

import '@lumino/default-theme/style/index.css';

/**
 * A component to wrap the Lumino application.
 *
 * It will create a BoxPanel (left to right, no gutters) with a dock
 * panel. Each component created in the default slot will be added
 * to an invisible area.
 *
 * Upon creation, the component will take care to transfer the $el
 * of each children component to the Lumino widget div, creating the
 * impression that the component was created inside the tab/widget.
 *
 * Lumino uses DOM, and Vue the VDOM. So this is an approach that
 * works, but there could be alternative approaches too. Feel free
 * to adapt it to your use case as necessary.
 *
 * @since 0.2
 */
export default {
  /**
   * Show a useful name in logs/debug/vue-extension
   */
  name: 'Lumino',

  /**
   * Data for the Lumino component
   */
  data () {
    return {
      // create a box panel, which holds the dock panel, and controls its layout
      main: new BoxPanel({ direction: 'left-to-right', spacing: 0 }),
      // create dock panel, which holds the widgets
      dock: new DockPanel()
    }
  },

  /**
   * Here we define the ID's for the Lumino DOM elements, and add the Dock panel to the main
   * Box panel. In the next tick of Vue, the DOM element and the Vue element/ref are attached.
   */
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
     *
     */
    addWidget(id, name) {
      const luminoWidget = new LuminoWidget(id, name, /* closable */ true)
      this.dock.addWidget(luminoWidget)
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
