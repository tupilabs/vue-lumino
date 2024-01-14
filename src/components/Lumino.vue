<!--
  Copyright 2020 Bruno P. Kinoshita

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->

<template>
  <div id="workflow-panel">
    <div
      id="main"
      ref="main"
      class="pa-4 fill-height"
    >
      <!-- Lumino box panel gets inserted here -->
    </div>
    <div
      v-show="false"
      ref="slot"
    >
      <slot />
    </div>
    <!-- TODO: use teleport later? -->
    <!--    <template-->
    <!--      v-for="id in widgets"-->
    <!--      :key="id"-->
    <!--    >-->
    <!--      <Teleport :to="`#${id}`">-->
    <!--        <slot />-->
    <!--      </Teleport>-->
    <!--    </template>-->
  </div>
</template>

<script>
import LuminoWidget from '@/components/lumino-widget'
import { BoxPanel, DockPanel, Widget } from '@lumino/widgets'

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

  props: {
    /**
     * Prop to customize the tab title. Defaults to name.
     * If a component does not have the $component.$tabTitleProp
     * set, then we still revert to the old default $component.name.
     */
    tabTitleProp: {
      type: String,
      default: 'name'
    },
    widgets: {
      type: Array,
      required: true
    }
  },

  emits: [
    'lumino:activated',
    'lumino:deleted'
  ],

  /**
   * Every time a new child element is added to the slot, this method will
   * be called. It will iterate the children elements looking for new ones
   * to add.
   *
   * The removal is handled via event listeners from Lumino.
   */
  watch: {
    widgets: {
      deep: false,
      handler: 'syncWidgets',
      immediate: true
    }
  },

  /**
   * Here we define the ID's for the Lumino DOM elements, and add the Dock panel to the main
   * Box panel. In the next tick of Vue, the DOM element and the Vue element/ref are attached.
   */
  created () {
    // create dock panel, which holds the widgets
    this.dock = new DockPanel()
    this.dock.id = 'dock'

    // create a box panel, which holds the dock panel, and controls its layout
    this.main = new BoxPanel({ direction: 'left-to-right', spacing: 0 })
    this.main.id = 'main'
    this.main.addWidget(this.dock)
    BoxPanel.setStretch(this.dock, 1)

    const resizeObserver = new ResizeObserver(() => {
      this.main.update()
    })

    this.$nextTick(() => {
      Widget.attach(this.main, this.$refs.main)
      // Watch for resize of the main element to trigger re-layout:
      resizeObserver.observe(this.$refs.main)
    })
  },

  methods: {
    /**
     * Iterates through the component children, looking for newly created
     * components, and then creates a related Lumino Widget for this component.
     */
    syncWidgets(newVal, oldVal) {
      if (newVal instanceof Array) {
        for (const id of newVal) {
          if (oldVal !== undefined && !(oldVal.includes(id))) {
            this.$nextTick(() => {
              const tabTitleProp = this.$props.tabTitleProp
              const component = Array.isArray(this.$parent.$refs[id]) ? this.$parent.$refs[id][0] : this.$parent.$refs[id]
              const name = component.$attrs[tabTitleProp] ? component.$attrs[tabTitleProp] : component.$options.name
              this.addWidget(id, name)
            })
          }
        }
        this.$nextTick(() => {
          // We cannot use Vue 3 Teleport here yet. That's because we
          // try to make it generic so users can add as many elements
          // as they want into the default slot. We do not have a way
          // to selectively teleport each component to the target div.
          if (this.$refs.slot !== undefined && this.$refs.slot.children !== undefined) {
            [...this.$refs.slot.children]
                .forEach(child => {
                  document.getElementById(child.id).appendChild(child)
                })
          }
        })
      }
    },

    /**
     * Create a widget.
     *
     * @param id {String} - widget ID
     * @param name {String} - widget name
     * @param onTop {boolean} - whether to focus on the widget or not
     */
    addWidget(id, name, onTop = true) {
      const luminoWidget = new LuminoWidget(id, name, /* closable */ true)
      this.dock.addWidget(luminoWidget, { mode: 'tab-after' })
      // give time for Lumino's widget DOM element to be created
      const widgetEl = document.getElementById(id)
      widgetEl.addEventListener('lumino:activated', this.onWidgetActivated)
      widgetEl.addEventListener('lumino:deleted', this.onWidgetDeleted)
      if (onTop) {
        this.dock.selectWidget(luminoWidget)
      }
    },

    /**
     * React to a deleted event.
     *
     * @param customEvent {
     *   {
     *     detail: {
     *       id: string,
     *       name: string,
     *       closable: boolean
     *     }
     *   }
     * }
     */
    onWidgetActivated (customEvent) {
      this.$emit('lumino:activated', customEvent.detail)
    },

    /**
     * React to a deleted event.
     *
     * @param customEvent {
     *   {
     *     detail: {
     *       id: string,
     *       name: string,
     *       closable: boolean
     *     }
     *   }
     * }
     */
    onWidgetDeleted (customEvent) {
      const { id } = customEvent.detail
      const widgetEl = document.getElementById(id)
      widgetEl.removeEventListener('lumino:deleted', this.onWidgetDeleted)
      widgetEl.removeEventListener('lumino:activated', this.onWidgetActivated)
      this.$emit('lumino:deleted', customEvent.detail)
    }
  }
}
</script>

<style lang="scss">
$body-font-family: 'Roboto, Ubuntu, Arial, Verdana, sans-serif';
$font-size-root: 16px;
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
