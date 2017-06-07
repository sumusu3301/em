import Utils from '../utils';

export default class View {

  /**
   * @param {HTMLDocument} document
   */
  constructor(document){
    if (typeof document !== 'object') throw new Error('MissingDocument');
    this._document = document;
    this.$memory = document.querySelector('#memory textarea');
  }

  /**
   * @param target
   * @param type
   * @param callback
   */
  static on(target, type, callback) {
    target.addEventListener(type, callback);
  }

  /**
   * @param event
   * @param handler
   * @public
   */
  bind(event, handler) {
    if (event === 'setFlag') {
      const $flags = this._document.querySelectorAll('#flags input[type="checkbox"]');
      $flags.forEach(
        ($flag) => View.on($flag, 'click', () => handler($flag.id, $flag.checked))
      );
    }
  }

  /**
   * @param {string} command
   * @param {Object} args
   */
  render(command, args) {
    if (!command) return;
    switch(command) {
      case 'memory':
        this._renderMemoryPage(args);
        break;
    }
  }

  /**
   * @param {Uint8Array} memory
   * @private
   */
  _renderMemoryPage(memory) {
    const lines = [];
    for(let i = 0; i < 0x100; i += 0x10){
      const values = [];
      for(let j = i; j < i+0x10; j++){
        values.push(Utils.toHex(memory[j]));
      }
      lines.push(`${Utils.to32hex(i)} ${values.join(' ')}`);
    }
    this.$memory.textContent = lines.join('\n');
  }
}