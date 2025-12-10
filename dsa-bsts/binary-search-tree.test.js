const BinarySearchTree = require("./binary-search-tree");

describe("insert", function() {
  it("inserts a node at the correct position", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.right.val).toEqual(20);
    expect(binarySearchTree.root.left.right.val).toEqual(12);
    //console.log (binarySearchTree);
  });
  
  it("inserts a node at the root if there is nothing there", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(15);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.left).toBe(null);
    expect(binarySearchTree.root.right).toBe(null);
  });
});

// let bst = new BinarySearchTree ();
// bst.insertRecursively(15)
// .insertRecursively(20)
// .insertRecursively(10)
// .insertRecursively(12);
// console.log ("___BST___ =", bst);

describe("insertRecursively", function() {
  it("inserts a node at the correct position", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insertRecursively(15)
      .insertRecursively(20)
      .insertRecursively(10)
      .insertRecursively(12);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.right.val).toEqual(20);
    expect(binarySearchTree.root.left.right.val).toEqual(12);
    //console.log ("777777", binarySearchTree);
  });

  it("inserts a node at the root if there is nothing there", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insertRecursively(15);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.left).toBe(null);
    expect(binarySearchTree.root.right).toBe(null);
  });
});

describe("find", function() {
  it("finds a node correctly", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.find(20);
    expect(foundNode.val).toBe(20);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right).toBe(null);
   // console.log ("5555 foundeNode 20 == ", foundNode);
  });

  it("returns undefined if a node is not found", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.find(120);
    //console.log ("5555 foundeNode 120 == ", foundNode);
    expect(foundNode).toBe(undefined);
  });
});

describe("findRecursively", function() {
  it("finds a node correctly", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.findRecursively(20);
    //console.log ("5555 foundeNode recursively 20 == ", foundNode);
    expect(foundNode.val).toBe(20);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right).toBe(null);
  });

  it("returns undefined if a node is not found", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.findRecursively(120);
    //console.log ("5555 foundeNode recursively 120 == ", foundNode);
    expect(foundNode).toBe(undefined);
  });
});

describe("dfsPreOrder", function() {
  it("returns an array of values found with DFS Pre Order", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
      //console.log ("dfs preorder = ", binarySearchTree.dfsPreOrder())
    expect(binarySearchTree.dfsPreOrder()).toEqual([15, 10, 1, 5, 12, 20, 50]);
  });
});

describe("dfsInOrder", function() {
  it("returns an array of values found with DFS In Order", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
      //console.log ("dfs inorder = ",binarySearchTree.dfsInOrder());
    expect(binarySearchTree.dfsInOrder()).toEqual([1, 5, 10, 12, 15, 20, 50]);
  });
});

describe("dfsPostOrder", function() {
  it("returns an array of values found with DFS Post Order", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
      //console.log ("dfs postorder =", binarySearchTree.dfsPostOrder());
    expect(binarySearchTree.dfsPostOrder()).toEqual([5, 1, 12, 10, 50, 20, 15]);
  });
});

describe("BFS", function() {
  it("should return the correct output", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
      //console.log ("bfs tree order = ", binarySearchTree.bfs());
    expect(binarySearchTree.bfs()).toEqual([15, 10, 20, 1, 12, 50, 5]);
  });
});

describe("remove", function() {
  it("remove should correctly remove a node with no children", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
      //console.log ("9999 tree before remove 50", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(50);
    //console.log ("9999 tree after remove 50", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.right.val).toBe(20);
    expect(binarySearchTree.root.right.right).toBe(null);

    //console.log ("9999 tree before remove 5 ", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(5);
    //console.log ("9999 tree after remove 5", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.left.left.val).toBe(1);
    expect(binarySearchTree.root.left.left.right).toBe(null);
  });

  it("remove should correctly remove a node with one child", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
      //console.log ("9999 tree before remove 1", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(1);
    //console.log ("9999 tree after remove 1", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.left.left.val).toBe(5);
    expect(binarySearchTree.root.left.left.left).toBe(null);
    expect(binarySearchTree.root.left.left.right).toBe(null);

    //console.log ("9999 tree before remove 20", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(20);
    //console.log ("9999 tree after remove 20", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.right.val).toBe(50);
    expect(binarySearchTree.root.right.right).toBe(null);
    expect(binarySearchTree.root.right.left).toBe(null);
  });

  it("remove should correctly remove a node with two children", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50)
      .insert(60)
      .insert(30)
      .insert(25)
      .insert(23)
      .insert(24)
      .insert(70);
      //console.log ("9999 tree before remove 10", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(10);
    //console.log ("9999 tree after remove 10", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.left.val).toBe(12);
    expect(binarySearchTree.root.left.left.val).toBe(1);
    expect(binarySearchTree.root.left.left.right.val).toBe(5);
    //console.log ("9999 tree before remove 50", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(50);
    //console.log ("9999 tree after remove 50", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.right.val).toBe(20);
    expect(binarySearchTree.root.right.right.val).toBe(60);
    expect(binarySearchTree.root.right.right.left.val).toBe(30);
  });

  it("should remove a node with two children and handle the children of the removed node", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(22)
      .insert(49)
      .insert(85)
      .insert(66)
      .insert(95)
      .insert(90)
      .insert(100)
      .insert(88)
      .insert(93)
      .insert(89);
      //console.log ("9999 tree before remove 85", binarySearchTree.dfsPreOrder());
    binarySearchTree.remove(85);
    //console.log ("9999 tree after remove 85", binarySearchTree.dfsPreOrder());
    expect(binarySearchTree.root.right.right.val).toBe(88); // 88
    expect(binarySearchTree.root.right.right.right.left.left.val).toBe(89); // 89
  });
});

describe("isBalanced", function() {
  it("checks if it is balanced", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(15);
    binarySearchTree.insert(20);
    binarySearchTree.insert(10);
    binarySearchTree.insert(12);
    //console.log (" 999 isbalanced for 15 20 10 12 = ", binarySearchTree.isBalanced())
    expect(binarySearchTree.isBalanced()).toEqual(true);

    var binarySearchTree2 = new BinarySearchTree();
    binarySearchTree2.insert(5);
    //console.log (" 999 isbalanced for 5 = ", binarySearchTree2.isBalanced())
    expect(binarySearchTree2.isBalanced()).toEqual(true);
    binarySearchTree2.insert(6);
    //console.log (" 999 isbalanced for 5 6 = ", binarySearchTree2.isBalanced())
    expect(binarySearchTree2.isBalanced()).toEqual(true);
    binarySearchTree2.insert(7);
    //console.log (" 999 isbalanced for 5 6 7 = ", binarySearchTree2.isBalanced())
    expect(binarySearchTree2.isBalanced()).toEqual(false);
  });
});

describe("findSecondHighest", function() {
  it("finds the 2nd largest", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(15);
    binarySearchTree.insert(20);
    binarySearchTree.insert(10);
    binarySearchTree.insert(12);
    //console.log ("999 2nd highest =", binarySearchTree.findSecondHighest());
    expect(binarySearchTree.findSecondHighest()).toEqual(15);

    var binarySearchTree2 = new BinarySearchTree();
    //console.log ("999 2nd highest =", binarySearchTree2.findSecondHighest());
    expect(binarySearchTree2.findSecondHighest()).toEqual(undefined);
  });
});
