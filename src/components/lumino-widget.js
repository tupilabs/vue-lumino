import { Widget } from "@lumino/widgets";
import Vue from 'vue'

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

/**
 * This component wraps the actual component shown within a widget.
 *
 * The widget required a DOM element. So we create one with the Vue component
 * hidden.
 */
const VueComponentWrapper = Vue.component('VueComponentWrapper', {
  name: 'VueComponentWrapper',

  /**
   * Any other props passed to this component, will be passed down
   * to the wrapped component.
   */
  props: {
    /**
     * Widget object. Must have at least a valid id.
     *
     * @type {{
     *   id: string
     * }}
     */
    widget: {
      type: Object,
      required: true
    }
  },

  /**
   * When this component is mounted, we want to transfer/attach it to the
   * Lumino widget.
   */
  mounted () {
    const widgetElement = document.getElementById(this.widget.id)
    widgetElement.appendChild(this.$refs[this.widget.id])
    document.getElementById(this.widget.id).addEventListener('component:delete', this.delete)
  },

  beforeDestroy () {
    document.getElementById(this.widget.id).removeEventListener('component:delete', this.delete)
  },

  methods: {
    delete () {
      // You can also emit an event here, to tell other Vue components that this component is going away...
      this.$emit('lumino:delete', { widget: this.widget })
      this.$destroy()
    }
  },

  /**
   * Creates a div which has the widget ID as the ref
   *
   * Calls the default slot, showing whatever was rendered by the wrapped component.
   *
   * Any other slot added will be passed down to the wrapped component.
   */
  template: `
    <div :ref="widget.id">
      <slot></slot>
    </div>
  `
})

export {
  LuminoWidget,
  VueComponentWrapper
}
