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

import { Widget } from "@lumino/widgets";

/**
 * This is a valid Lumino widget, that contains only a dummy div
 * element.
 *
 * It will be created and added to the Lumino panel, then a Vue component
 * will be created elsewhere, and attached to the div.
 *
 * Events in the widget will be propagated to the Vue component. Event
 * listeners much be attached to the DOM element with the widget ID.
 */
export default class LuminoWidget extends Widget {

  /**
   * Create a LuminoWidget object.
   * @param id {string} unique ID of the widget
   * @param name {string} text displayed in the widget tab
   * @param closable {boolean} flag that controls whether the tab can be closed or not
   */
  constructor (id, name, closable = true) {
    super({ node: LuminoWidget.createNode(id) })
    this.id = id
    this.name = name
    this.closable = closable
    // classes and flags
    this.setFlag(Widget.Flag.DisallowLayout)
    this.addClass('content')
    // tab title
    this.title.label = name
    this.title.closable = closable
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

  onActivateRequest (msg) {
    // Emit an event so that the Vue component knows that it was activated
    const event = new CustomEvent('lumino:activated', this._getEventDetails())
    document.getElementById(this.id).dispatchEvent(event)
    // call super method
    super.onActivateRequest(msg)
  }

  onCloseRequest (msg) {
    // Emit an event so that the Vue component knows that it needs to be removed too
    const event = new CustomEvent('lumino:deleted', this._getEventDetails())
    document.getElementById(this.id).dispatchEvent(event)
    // call super method
    super.onCloseRequest(msg)
  }

  /**
   * Event details returned for a `CustomEvent`.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
   * @returns {{closable: boolean, name: string, id: string}}
   * @private
   */
  _getEventDetails () {
    return {
      detail: {
        id: this.id,
        name: this.name,
        closable: this.closable
      }
    }
  }
}
