/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let min = Infinity;
    function dfs(node, depth) {
      if (node && !node.left && !node.right) {
        min = min <= depth ? min : depth;
        return min;
      } else {
        ++depth;
        if (min < depth) return min;
        if (node.left) min = dfs(node.left, depth);
        if (node.right) min = dfs(node.right, depth);
        return min;
      }
    }
    if (!this.root) return 0;
    else return dfs(this.root, 1);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let max = 0;
    function dfs(node, depth) {
      if (node && !node.left && !node.right) {
        max = max >= depth ? max : depth;
        return max;
      } else {
        ++depth;

        if (node.left) max = dfs(node.left, depth);
        if (node.right) max = dfs(node.right, depth);
        return max;
      }
    }
    if (!this.root) return 0;
    else return dfs(this.root, 1);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = 0;
    let sum = 0;

    function dfs(node) {
      if (!node) return 0;
      else {
        let ls = dfs(node.left);
        let rs = dfs(node.right);
        sum = Math.max(0, node.val + ls, node.val + rs);
        maxSum = Math.max(maxSum, node.val + ls + rs);
        return sum;
      }
    }
    dfs(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let minDiff = Infinity;
    let out = null;
    function dfs(node, lowerBound) {
      if (!node) {
        return null;
      } else {
        const diff = node.val - lowerBound;
        if (diff > 0 && diff < minDiff) {
          out = node.val;
          minDiff = diff;
        }
        dfs(node.left, lowerBound);
        dfs(node.right, lowerBound);
        return out;
      }
    }

    return dfs(this.root, lowerBound);
    // console.log (out.val);
    // return (out ? out : null);
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || this.root === node1 || this.root === node2) return false;

    function dfs(node, nodeToFind, depth, data = { depth: 0, parent: null }) {
      if (data.parent) return data;
      if (!node) return null;
      else {
        if (node.left === nodeToFind || node.right === nodeToFind) {
          data.depth = depth+1;
          data.parent = node;
          return data;
        }
        if (node.left) dfs(node.left, nodeToFind, depth + 1, data);
        if (node.right) dfs(node.right, nodeToFind, depth + 1, data);
        return data;
      }
    }
    let data1 = dfs(this.root, node1, 1);
    let data2 = dfs(this.root, node2, 1);
    //console.log ("data1 = ", data1, " data2 =", data2);
    if (data1.parent !== data2.parent && data1.depth === data2.depth)
      return true;
    else return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    let out = [];
    let toVisitQueue = [tree.root];

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      //console.log ("toVisitQueue.length = ",toVisitQueue.length, toVisitQueue)
      if (current) {
        out.push(current.val);
        toVisitQueue.push(current.left);
        toVisitQueue.push(current.right);
      }
      else
        out.push("null");
    }
    //console.log (out, out.join(' '));
    return out.join (' ');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(strTree) {
    //console.log("strTree = ", strTree);
    if (!strTree)
      return null;

    let arrTree = strTree.split (' ');
    //console.log ("arrTree = ", arrTree);
    let nodeVal = arrTree.shift ();
    if (nodeVal === "null")
      return null;

    let rootNode = new BinaryTreeNode(+nodeVal);
    let binaryTree = new BinaryTree(rootNode);

    let nodeQueue = [rootNode];
   // console.log ("nodeQueue = ", nodeQueue);

    while (arrTree.length) {
      let currentNode = nodeQueue.shift();
     
      nodeVal = arrTree.shift ();
      
      currentNode.left = (nodeVal === "null") ? null : new BinaryTreeNode (+nodeVal);

      nodeVal = arrTree.shift ();
      currentNode.right = (nodeVal === "null") ? null : new BinaryTreeNode (+nodeVal);

      if (currentNode.left)
        nodeQueue.push(currentNode.left);
      if (currentNode.right)
        nodeQueue.push(currentNode.right);
    }
    return binaryTree;
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode = this.root, found = {found1: false, found2: false, lca:null}) {

    if (!currentNode)
      return null;
    if (found.lca) {
      return found.lca;
    }
    if (found.found1 && found.found2)
      return null;
    if (currentNode === node1) {
        found.found1 = true;
        return currentNode;
    }
    else if (currentNode === node2) {
      found.found2 = true;
      return currentNode;
  }

    const left = this.lowestCommonAncestor (node1, node2, currentNode.left, found);
    const right = this.lowestCommonAncestor (node1, node2, currentNode.right, found);

    if (left && right) {
      found.lca = found.lca ? found.lca : currentNode;
      return found.lca;
    }
    return (left || right);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
