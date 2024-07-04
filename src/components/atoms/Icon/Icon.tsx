import { MouseEventHandler, Suspense, createElement } from 'react';
import { icons } from './Icons';

type IconName = keyof typeof icons;

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  name: IconName;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const Icon: React.FC<IconProps> = ({
  name,
  color = 'black',
  width = 12,
  height = 12,
  onClick,
  ...rest
}) => {
  const handleClick: MouseEventHandler<SVGSVGElement> = (event) => { 
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Suspense fallback={null}>
      {icons?.[name] &&
        createElement(icons[name], {
          style: {
            ...rest.style,
            color,
            width: `${width}px`,
            height: `${height}px`,
          },
          onClick: handleClick,
        })}
    </Suspense>
  );
};

export default Icon;
