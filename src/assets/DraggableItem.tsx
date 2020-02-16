import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

type DraggableItemPropsType = {
  el: any;
  classes: any;
  children: React.ReactChild;
};

function DraggableItem({ el, classes, children }: DraggableItemPropsType) {
  return (
    <Draggable draggableId={"item-" + el.id} index={el.id}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes ? classes.drag : ""}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
