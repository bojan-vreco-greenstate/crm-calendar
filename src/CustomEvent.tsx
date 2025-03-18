import { Event } from 'react-big-calendar';
import { PhoneIcon } from './icons/PhoneIcon';
import { EventType } from './enums/eventType';
import { CheckSquareIcon } from './icons/CheckSquareIcon';
import { useState } from 'react';
import ReactDOM from 'react-dom';

interface CustomEventProps extends Event {
  desc?: string;
}

const Tooltip = ({
  isOpen,
  position,
  description,
}: {
  isOpen: boolean;
  position: { x: number; y: number };
  description?: string;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed bg-gray-300 p-2 rounded-xl text-black shadow-lg"
      style={{ top: position.y, left: position.x }}
    >
      {description || 'Test'}
    </div>,
    document.body
  );
};

export const CustomEvent = ({
  event: { title, resource, desc },
}: {
  event: CustomEventProps;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  return (
    <div
      className="flex items-center gap-2 relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip
        isOpen={isTooltipOpen}
        position={tooltipPosition}
        description={desc}
      />
      <div className="w-4 h-4">
        {resource === EventType.CALL ? <PhoneIcon /> : <CheckSquareIcon />}
      </div>
      <span>{title}</span>
    </div>
  );
};
