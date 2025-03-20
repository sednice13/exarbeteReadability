import Queue from '../../../data-structures/queue/Queue';

/**
 * @typedef {Object} Callbacks
 * @property {function(node: BinaryTreeNode, child: BinaryTreeNode): boolean} allowTraversal - 
 *   Determines whether DFS should traverse from the node to its child.
 * @property {function(node: BinaryTreeNode)} enterNode - Called when DFS enters the node.
 * @property {function(node: BinaryTreeNode)} leaveNode - Called when DFS leaves the node.
 */

/**
 * Initializes default callbacks if they are not provided.
 *
 * @param {Callbacks} [callbacks={}]
 * @returns {Callbacks}
 */
function initCallbacks(callbacks = {}) {
  return {
    allowTraversal: callbacks.allowTraversal || (() => true),
    enterNode: callbacks.enterNode || (() => {}),
    leaveNode: callbacks.leaveNode || (() => {}),
  };
}

/**
 * Performs a breadth-first search (BFS) on a binary tree.
 *
 * @param {BinaryTreeNode} rootNode - The starting node of the BFS traversal.
 * @param {Callbacks} [originalCallbacks] - Optional callbacks for traversal behavior.
 */
export default function breadthFirstSearch(rootNode, originalCallbacks) {
  if (!rootNode) return;

  const callbacks = initCallbacks(originalCallbacks);
  const queue = new Queue();

  queue.enqueue(rootNode);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    callbacks.enterNode(node);

    /**
     * Enqueues a child node if it exists and traversal is allowed.
     * @param {BinaryTreeNode} childNode
     */
    const enqueueChild = (childNode) => {
      if (childNode && callbacks.allowTraversal(node, childNode)) {
        queue.enqueue(childNode);
      }
    };

    enqueueChild(node.left);
    enqueueChild(node.right);

    callbacks.leaveNode(node);
  }
}
