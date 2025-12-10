class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    //console.log (this);
    //create new node with val
    let newNode = new Node (val);
    if (!this.root) { //empty tree
      this.root = newNode;
      return this;
    }
    else { //not empty tree
      let currNode = this.root;
      while (currNode) {
        if (currNode.val === val) {  //node already exists
          return this;
        }
        else { //new node is doesn't exist
          if (val < currNode.val) { //travel left
            if (currNode.left) {
              currNode = currNode.left;
            }
            else {
              currNode.left = newNode;
              return this;
            }
          }
          else {  //travel right
            if (currNode.right) {
              currNode = currNode.right;
            }
            else {
              currNode.right = newNode;
              return this;
            }
          }
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {

    function insertR(node, newNode) {
      if (newNode.val < node.val) {
        if (node.left)
          insertR(node.left, newNode);
        else
          node.left = newNode;
      } 
      else {
        if (node.right)
          insertR(node.right, newNode);
        else
          node.right = newNode;
      }
    }

    let newNode = new Node (val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    else if (this.root.val === val) {
      return this;
    }
    else {  //insert new node with val
      insertR (this.root, newNode);
    }
    // function print (x) {
    //   if (!x) return;
    //   console.log ("***print*** ", x.val, "x.left=", x.left, "x.right=", x.right);
    //   if(x.left) x = x.left;
    //   if(x.right) x = x.right;
    //   return;
    // }
    // print (this.root);

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let node = this.root;
    if (!node)
      return;

    while (node) {
      if (val === node.val) {
        return node;
      }
      else if (val < node.val){
        if (node.left)
          node = node.left;
        else
          return;
      }
      else {
        if (node.right)
          node = node.right;
        else
          return;
      }
    }
    return;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    function findR (node) {
      if (val === node.val)
        return node;
      else {
        if (val < node.val) {
          if (node.left)
            return findR(node.left);
          else
            return;
        }
        else {
          if (node.right)
            return findR (node.right);
          else
            return;
        }
      }
    }

    return findR (this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let out = [];
    function dfs (node) {
      if (!node)
        return out;
      else {
        out.push (node.val);
        if (node.left)
          dfs (node.left);
        if (node.right)
          dfs (node.right);
        return out;
      }
    }
  
    return dfs (this.root);
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let out = [];
    function dfs (node) {
      //console.log ("888 in dfs inorder");
      if (!node)
        return out;
      else {
        if (node.left)
          dfs (node.left);
        out.push (node.val);
        if (node.right)
          dfs (node.right);

        return out;
      }
    }
    return dfs (this.root);
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let out = [];
    function dfs (node) {
      //console.log ("99999 in dfs post order")
      if (!node)
        return out;
      else {
        if (node.left)
          dfs (node.left);
        if (node.right)
          dfs (node.right);

        out.push (node.val);
        return out;
      }
    }
    return dfs (this.root);
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let out = [];
    let queue = [];
    queue.push (this.root);
    
    while (queue.length > 0) {
      let node = queue.shift ();
      out.push (node.val);
      if (node.left)
        queue.push (node.left);
      if (node.right)
        queue.push (node.right);
    }
    
    return out;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    //console.log ("8888 val to remove", val, this.root);
    function findNodeAndParent (node, val, parent=null) {
      if (val === node.val)
        return {node, parent};
      else {
        if (val < node.val) {
          if (node.left)
            return findNodeAndParent (node.left, val, node);
        }
        else {
          if (node.right)
            return findNodeAndParent (node.right, val, node);
        }
      }
    }

    let {node:nodeToRemove, parent} = findNodeAndParent (this.root, val);
    
    if (!nodeToRemove.left && !nodeToRemove.right) {  //no children
      if (parent.left === nodeToRemove)
        parent.left = null;
      else
        parent.right = null;
    }
    else if (!nodeToRemove.left && nodeToRemove.right) { //right child
      if (parent.left === nodeToRemove)
        parent.left = nodeToRemove.right;
      else
        parent.right = nodeToRemove.right;
    }
    else if (nodeToRemove.left && !nodeToRemove.right) {  // left child 
      if (parent.left === nodeToRemove)
        parent.left = nodeToRemove.left;
      else
        parent.right = nodeToRemove.left;
    }
    else {  //2 children
      //find inorderSuccesor node and move it in place of node to be removed
      //smallest node on right side of node to be removed comes in place of removed node
      if (!nodeToRemove.right.left) {  //nodeToRemove.right is inorderSuccessor
        if (parent.left === nodeToRemove)
          parent.left = nodeToRemove.right;
        else
          parent.right = nodeToRemove.right;

        nodeToRemove.right.left = nodeToRemove.left;
      }
      else {
        let leftNode = nodeToRemove.right.left;
        let leftNodeParent = nodeToRemove.right;
        while (leftNode.left) {
          leftNodeParent = leftNode;
          leftNode = leftNode.left
        }
        if (parent.left === nodeToRemove)
          parent.left = leftNode;
        else
          parent.right = leftNode;

        leftNodeParent.left = leftNode.right;
        leftNode.left = nodeToRemove.left;
        leftNode.right = nodeToRemove.right;
      }
    }
    //console.log ("node removed=", nodeToRemove);
    //console.log ("root node after remove =", this.root);
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
   
    function dfs (node, ht) {
      let lht = 0;
      let rht = 0;
      if (!node)
        return 0;
      else {
        if (node.left)
          lht = dfs (node.left);
        if (node.right)
          rht = dfs (node.right)

        return Math.max (lht, rht)+1;
      }
    }

    if (!this.root)
      true;

    let lheight = dfs (this.root.left);
    let rheight = dfs (this.root.right);

    //console.log ("node lht rht = ", this.root, lheight, rheight);
    if (Math.abs (lheight - rheight) > 1)
      return false;
    else
      return true;

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

    function dfs (node) {
      if (!node)
        return 0;
      else {
        //max1  = Math.max (max1, node.val);
        if (node.val < max1)
          max2 = Math.max (max2, node.val);
        else {
          max2 = max1;
          max1 = node.val;
        }

        if (node.left)
          node = node.left;
        if (node.right)
          node = node.right;
      }
    }

    if (!this.root)
      return;

      let max1 = this.root.val;
      let max2 = 0;
    dfs (this.root);
    return max2;
  }
}

module.exports = BinarySearchTree;
