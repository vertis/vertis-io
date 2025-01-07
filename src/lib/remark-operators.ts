import { visit } from 'unist-util-visit';

interface Node {
  type: string;
  value?: string;
  children?: Node[];
}

export function remarkOperators() {
  return function(tree: Node) {
    visit(tree, 'text', function(node: Node) {
      if (node.value) {
        // Replace comparison operators with HTML entities
        node.value = node.value.replace(/>=|</g, (match: string) => {
          return match === '>=' ? '&gt;=' : '&lt;';
        });
      }
    });
  };
}
