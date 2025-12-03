/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  findVal(val) {
    if (!this.root) return false;

    return dfs(this.root, val);
    function dfs(node, val) {
      // console.log (node.val, val);
      if (node.val === val) return true;
      else {
        for (let child of node.children) {
          if (dfs(child, val))
            return true;
        }
        return false;
      }
    }
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    let sum = 0;

    function dfs(node) {
      if (!node) return sum;
      else {
        sum += node.val;

        for (let child of node.children) {
          sum = dfs(child);
        }
        return sum;
      }
    }
    return dfs(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let count = 0;
    function dfs(node) {
      if (!node) return count;
      else {
        if (node.val % 2 === 0) ++count;
        for (let child of node.children) {
          count = dfs(child);
        }
        return count;
      }
    }
    return dfs(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let count = 0;
    function dfs(node, x) {
      if (!node) return count;
      else {
        if (node.val > x) ++count;
        // console.log (count, node.val, x);
        for (let child of node.children) {
          count = dfs(child, x);
        }
        return count;
      }
    }
    return dfs(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
