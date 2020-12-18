declare module "@tupilabs/vue-lumino" {
  import { VueConstructor } from 'vue'
  import { Message } from '@lumino/messaging/types'

  const Lumino : VueConstructor

  class LuminoWidget {
    constructor(id: string, name: string, closable: boolean);
    createNode(id: string): HTMLElement;
    onActivateRequest(msg: Message);
    onCloseRequest(msg: Message);
    _getEventDetails();
  }

  export default Lumino;
  export {
    Lumino,
    LuminoWidget
  }
}
