module.exports.createTree = function makeTree(arr, parentId = "", cnt = 1){
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentId){
      const newItem = item;
      item.index = cnt;
      const children = makeTree(arr, item.id, ++cnt);
      if (children.length > 0){
        newItem.children = children;
      }
      cnt++;
      tree.push(newItem);
    }
  })
  return tree;
}