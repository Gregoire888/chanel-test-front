import { useMemo, useState } from "react";
import "./styles.css";
import { MenuItemType, MenuItemWithParentId } from "./types";
import { ArrowLeft, ArrowRight } from "react-feather";
import { addParentId, findNodeInTree } from "./tree.helpers";

export const Menu: React.FC<{ items: MenuItemType[] }> = ({ items }) => {
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [currentItem, setCurrentItem] = useState<MenuItemWithParentId | null>(
    null
  );

  const formattedItems = useMemo(
    () => items.map((item) => addParentId(item)),
    [items]
  );

  return (
    <div className="menu">
      {currentItem && (
        <div
          className={`menu-header slide-${slideDirection}`}
          onClick={() => {
            setSlideDirection("left");
            if (!currentItem.parentId) {
              setCurrentItem(null);
              return;
            }
            setCurrentItem(
              findNodeInTree(formattedItems, currentItem.parentId) ?? null
            );
          }}
        >
          <ArrowLeft className="arrow" />
        </div>
      )}
      <div className="menu-items">
        {(currentItem?.children ?? formattedItems).map((item) => (
          <MenuItem
            item={item}
            slideDirection={slideDirection}
            clicked={(item) => {
              setSlideDirection("right");
              setCurrentItem(item);
            }}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

const MenuItem: React.FC<{
  item: MenuItemWithParentId;
  slideDirection: "left" | "right";
  clicked: (item: MenuItemWithParentId) => void;
}> = ({ item, slideDirection, clicked }) => {
  return (
    <div
      className={`menu-item slide-${slideDirection}`}
      onClick={() => {
        if (item.children?.length) {
          clicked(item);
        }
      }}
    >
      {item.label}
      {item.children?.length && <ArrowRight className="arrow" />}
    </div>
  );
};
