import { visit } from 'unist-util-visit';

export function remarkOperators() {
  return function(tree) {
    visit(tree, 'text', function(node) {
      if (node.value) {
        // Replace comparison operators with HTML entities
        node.value = node.value.replace(/>=|</g, match => {
          return match === '>=' ? '&gt;=' : '&lt;';
        });
      }
    });
  };
}
