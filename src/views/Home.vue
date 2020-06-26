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

<!--
NOTE: Used for example/documentation only. Not intended to be used by users of this component.
-->

<!-- Example only. One div, with a button, and the Lumino component holder (needs a ref to use
     when the button is clicked) -->
<template>
  <div>
    <button @click="addHelloWorldWidget">Add Hello World</button>
    <button @click="addColoredCircleWidget">Add Circle</button>
    <Lumino ref="lumino">
      <HelloWorld
        v-for="helloWorldWidget of this.helloWorldWidgets"
        :key="helloWorldWidget.id"
      ></HelloWorld>
      <ColoredCircle
        v-for="coloredCircleWidget of this.coloredCircleWidgets"
        :key="coloredCircleWidget.id"
        :color="_getRandomColor()"
      ></ColoredCircle>
    </Lumino>
  </div>
</template>

<script>
// this should be your only import for this component
import Lumino from '@/components/Lumino'
// importing the components we want to display within the Lumino component
import HelloWorld from '@/components/example/HelloWorld'
import ColoredCircle from '@/components/example/ColoredCircle'

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
    // components used as example
    HelloWorld,
    ColoredCircle
  },

  data () {
    return {
      helloWorldWidgets: [],
      coloredCircleWidgets: [],
      colors: ['purple', 'green', 'blue', 'red']
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
      this.addHelloWorldWidget()
    })
  },

  /**
   * Only methods implemented are the ones to handle the buttons being clicked.
   */
  methods: {
    /**
     * Add a `HelloWorld` widget.
     */
    addHelloWorldWidget () {
      const id = `${HelloWorld.name}-${Math.random()}`
      const name = `${HelloWorld.name}`
      this.$refs.lumino.addWidget(id, name)
    },
    /**
     * Add a `ColoredCircle` widget.
     */
    addColoredCircleWidget () {
      const id = `${ColoredCircle.name}-${Math.random()}`
      const name = `${ColoredCircle.name}`
      this.$refs.lumino.addWidget(id, name)
    },
    /**
     * Get a random color to be used as prop for the `ColoredCircle` widget.
     * @returns {string} a random color member of `this.colors`
     * @private
     */
    _getRandomColor () {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  }
}
</script>
