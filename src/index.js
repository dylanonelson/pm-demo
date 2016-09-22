import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';

const state = EditorState.create({ schema });

const view = new EditorView(document.getElementById('root'), {
  state,
  onAction: (action) => {
    console.log(action);
    view.updateState(view.state.applyAction(action))
    console.log(view.state);
  }
});

