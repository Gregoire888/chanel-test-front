import { useMemo, useState } from "react";
import "./styles.css";
import { MenuItemType, MenuItemWithParentId } from "./types";
import { ArrowLeft, ArrowRight } from "react-feather";
import { addParentId, findNodeInTree } from "./tree.helpers";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {currentItem && (
          <MenuHeader
            slideDirection={slideDirection}
            clicked={() => {
              setSlideDirection("left");
              if (!currentItem.parentId) {
                setCurrentItem(null);
                return;
              }
              setCurrentItem(
                findNodeInTree(formattedItems, currentItem.parentId) ?? null
              );
            }}
          />
        )}
      </AnimatePresence>
      <div className="menu-items">
        {(currentItem?.children ?? formattedItems).map((item) => (
          <AnimatePresence>
            <MenuItem
              item={item}
              slideDirection={slideDirection}
              clicked={(item) => {
                setSlideDirection("right");
                setCurrentItem(item);
              }}
              key={item.id}
            />
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

const MenuHeader: React.FC<{
  slideDirection: "left" | "right";
  clicked: () => void;
}> = ({ slideDirection, clicked }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: slideDirection === "left" ? -100 : 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: slideDirection === "left" ? 100 : -100,
      }}
      className={`menu-header slide-${slideDirection}`}
      onClick={() => clicked()}
    >
      <ArrowLeft className="arrow" />
    </motion.div>
  );
};

const MenuItem: React.FC<{
  item: MenuItemWithParentId;
  slideDirection: "left" | "right";
  clicked: (item: MenuItemWithParentId) => void;
}> = ({ item, slideDirection, clicked }) => {
  return (
    <motion.div
      className={`menu-item slide-${slideDirection}`}
      initial={{
        opacity: 0,
        x: slideDirection === "left" ? -100 : 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: slideDirection === "left" ? 100 : -100,
        height: 0,
      }}
      onClick={() => {
        if (item.children?.length) {
          clicked(item);
        }
      }}
    >
      {item.label}
      {item.children?.length && <ArrowRight className="arrow" />}
    </motion.div>
  );
};
