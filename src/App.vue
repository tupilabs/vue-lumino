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

<!--
NOTE: Used for example/documentation only. Not intended to be used by users of this component.
-->

<!-- Example only. One div, with a button, and the Lumino component holder (needs a ref to use
     when the button is clicked) -->
<template>
  <div id="app">
    <button
      id="add-hello-world-widget-button"
      @click="onAddHelloWorldButtonClicked"
    >
      Add Hello World
    </button>
    <button
      id="add-colored-circle-widget-button"
      @click="onAddColoredCircleButtonClicked"
    >
      Add Colored Circle
    </button>
    <Lumino
      ref="lumino"
      :widgets="Object.keys(widgets)"
      tab-title-prop="tab-title"
      @lumino:deleted="onWidgetDeletedEvent"
      @lumino:activated="onWidgetActivatedEvent"
    >
      <!-- In this example we are adding two types of elements as tabs. The code
      of this view is using the component name plus a random number for the component
      ID, and the component name as the name to be displayed in the Lumino tab.

      Props, events, slots are all supported. The elements will be added to the
      default slot, which is wrapped in a `<div v-show=false>`. Later some
      code attaches the Vue component `$el` under the Lumino widget, and via
      events tries to keep everything in-sync (fingers-crossed).
      -->
      <HelloWorld
        v-for="id of helloWorldWidgets"
        :id="id"
        :key="id"
      />
      <ColoredCircle
        v-for="id of coloredCircleWidgets"
        :id="id"
        :key="id"
        :color="'red'"
        :tab-title="`${id}`"
      />
    </Lumino>
  </div>
</template>

<script>
// this should be your only import for this component
import Lumino from '@/components/Lumino.vue'
// importing the components we want to display within the Lumino component
import HelloWorld from '@/components/example/HelloWorld.vue'
import ColoredCircle from '@/components/example/ColoredCircle.vue'

import '@lumino/default-theme/style/index.css';

/**
 * An example view, showing how to use the Lumino component. Not exported, not for external use, for
 * documentation only.
 *
 * @since 0.1
 */
export default {
  name: 'App',

  components: {
    Lumino,
    // components used as example
    HelloWorld,
    ColoredCircle
  },

  data () {
    return {
      // the widgets added to the view
      /**
       * @type {
       *   Object.<string, string>
       * }
       */
      widgets: {}
    }
  },

  computed: {
    helloWorldWidgets () {
      const widgets = []
      for (const [id, type] of Object.entries(this.widgets)) {
        if (type === HelloWorld.name) {
          widgets.push(id)
        }
      }
      return widgets
    },
    coloredCircleWidgets () {
      const widgets = []
      for (const [id, type] of Object.entries(this.widgets)) {
        if (type === ColoredCircle.name) {
          widgets.push(id)
        }
      }
      return widgets
    }
  },

  /**
   * An example of a pre-added widget, when we want to create the component but also
   * have a widget added by default.
   *
   * You may prefer to have this at beforeRouteEnter, or somewhere else too.
   */
  mounted () {
    this.$nextTick(() => {
      this.onAddHelloWorldButtonClicked()
    })
  },

  /**
   * Example methods.
   */
  methods: {
    onAddHelloWorldButtonClicked () {
      const id = `${new Date().getTime()}`
      // eslint-disable-next-line no-console
      console.log(`Adding new widget ${HelloWorld.name}, ID ${id}`)
      this.widgets[id] = HelloWorld.name
    },
    onAddColoredCircleButtonClicked () {
      const id = `${new Date().getTime()}`
      // eslint-disable-next-line no-console
      console.log(`Adding new widget ${ColoredCircle.name}, ID ${id}`)
      this.widgets[id] = ColoredCircle.name
    },
    onWidgetActivatedEvent (event) {
      // eslint-disable-next-line no-console
      console.log(`Activated widget ${event.id}`)
    },
    onWidgetDeletedEvent (event) {
      // eslint-disable-next-line no-console
      console.log(`Deleted widget ${event.id}`)
      delete this.widgets[event.id]
    }
  }
}
</script>
