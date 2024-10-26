import { MenuItemType, MenuItemWithParentId } from "./types";

export function findNodeInTree(
  tree: MenuItemWithParentId[],
  id: string
): MenuItemType | undefined {
  const item = tree.find((item) => item.id === id);
  if (item) {
    return item;
  }
  for (const node of tree) {
    const found = findNodeInTree(node.children ?? [], id);
    if (found) {
      return found;
    }
  }
}

export function addParentId(
  tree: MenuItemType,
  parentId?: string
): MenuItemWithParentId {
  return {
    ...tree,
    parentId,
    children: tree.children?.map((item) => addParentId(item, tree.id)),
  };
}
