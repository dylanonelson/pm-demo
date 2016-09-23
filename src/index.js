import './index.css';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
//import { schema } from 'prosemirror-schema-basic';

const root = document.getElementById('root');

const schema = new Schema({
  nodes: {
    doc: {
      content: 'image head{1} paragraph{2}',
    },
    image: {
      attrs: {
        src: { default: 'http://www.freedigitalphotos.net/images/img/homepage/87357.jpg' },
        alt: { default: '' },
        title: { default: '' },
      },
      parseDOM: [{ tag: 'img[src]', getAttrs(dom) {
        return {
          src: dom.getAttribute('src'),
          title: dom.getAttribute('title'),
          alt: dom.getAttribute('alt'),
        }
      }}],
      toDOM(node) { return ['img', node.attrs] }
    },
    text: {
      toDOM(node) { return node.text },
    },
    head: {
      content: 'text*',
      parseDOM: [{ tag: 'h1' }],
      toDOM(node) { return ['h1', { class: 'template1' }, 0] },
    },
    paragraph: {
      content: 'text*',
      parseDOM: [{tag: 'p'}],
      toDOM() { return ['p', 0] }
    },
  }
});

let plugin = keymap(baseKeymap);

const state = EditorState.create({
  schema,
  plugins: [plugin]
});

const view = new EditorView(root, {
  state,
  onAction: (action) => {
    console.log(action);
    view.updateState(view.state.applyAction(action))
    console.log(view.state.toJSON());
  }
});
