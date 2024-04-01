/**
 * Copyright 2020 Bruno P. Kinoshita
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {beforeEach, describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import Lumino from '@/components/Lumino.vue'

/**
 * @vitest-environment happy-dom
 */
describe('Lumino component', () => {
  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }

      unobserve() {
        // do nothing
      }

      disconnect() {
        // do nothing
      }
    }
  })
  it('should be created correctly', () => {
    // We need to have the mounted Lumino component bound
    // to the DOM, as Lumino checks for `.isConnected`, which
    // verifies if an HTML node is attached to a DOM.
    document.body.innerHTML = `
    <div>
      <h1>Non Vue app</h1>
      <div id="app"></div>
    </div>
  `
    /**
     * Note: We are defining this type as:
     *   a) We know that these variables exist;
     *   b) These variables are not in the Vue.js data;
     *   c) These variables are non-reactive for a reason;
     *   d) It is hard to play with types "elegantly", so duck quacks it will be!
     * @type {{
     *   main: Object,
     *   dock: Object
     * }}
     */
    const lumino = mount(Lumino, {
      attachTo: document.getElementById('app'),
      shallow: true,
      props: {
        widgets: ['abc']
      }
    })
    expect(lumino.main).not.toEqual(null)
    expect(lumino.dock).not.toEqual(null)
  })
})
