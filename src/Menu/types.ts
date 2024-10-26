export type MenuItemType = {
  label: string;
  id: string;
  children?: MenuItemType[];
};

export type MenuItemWithParentId = MenuItemType & {
  parentId?: string;
  children?: MenuItemWithParentId[];
};
