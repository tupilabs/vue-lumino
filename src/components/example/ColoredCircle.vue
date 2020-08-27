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

<template>
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" :fill="color" />
  </svg>
</template>

<script>
export default {
  /**
   * This is the component name, which is normally used as the Lumino widget
   * tab title. In the example app, this actually won't be used. Instead, we
   * will display a dynamic title to demonstrate how users can do that in their
   * own code base.
   */
  name: 'ColoredCircle',

  props: {
    color: {
      type: String,
      default: 'red'
    }
  }
}
</script>
