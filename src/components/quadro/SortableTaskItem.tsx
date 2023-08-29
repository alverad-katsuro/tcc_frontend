import React from 'react';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableTaskItemProps = {
  children: React.ReactNode;
  id: string;
};

function customAnimateLayoutChanges(args: any) {
  if (args.isSorting || args.wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }
  return true;
}

const SortableItems = ({ children, id }: SortableTaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: customAnimateLayoutChanges
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItems;
