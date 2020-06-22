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
    <button @click="onAddHomeButtonClicked">Add Home</button>
    <button @click="onAddCircleButtonClicked">Add Circle</button>
    <Lumino ref="lumino" />
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
    // It is important to declare the components here, or globally, so that when the Lumino component declares
    // <component :is=widget.is />, it is loaded correctly.
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    ColoredCircle
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
   * Only methods implemented are the ones to handle the buttons being clicked.
   */
  methods: {
    /**
     * Showing how one can add widgets reacting to events such as a button click.
     */
    onAddHomeButtonClicked () {
      const id = `${Math.random()}`
      const widget = {
        id,
        name: `hello-${id}`,
        is: HelloWorld
      }
      this.$refs.lumino.addWidget(widget)
    },
    onAddCircleButtonClicked () {
      const id = `${Math.random()}`
      const colors = ['purple', 'green', 'blue', 'red']
      const color = colors[Math.floor(Math.random() * colors.length)]
      const widget = {
        id,
        name: `circle-${id}`,
        is: ColoredCircle,
        propsData: {
          color
        }
      }
      this.$refs.lumino.addWidget(widget)
    }
  }
}
</script>
