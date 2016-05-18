import element from 'magic-virtual-element';
import autosize from 'autosize';

export default {
  render: ({props}) => {
    return <textarea {...props}>{props.children}</textarea>;
  },
  afterMount: (component, el) => {
    autosize(el);
  },
  afterRender: (component, el) => {
    autosize.update(el);
  },
  beforeUnmount: (component, el) => {
    autosize.destroy(el);
  }
};
