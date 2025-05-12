import { trackDownloadStart } from '../utils/tracking';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  platform: 'ios' | 'android';
}

export default function TrackedDownloadButton({ platform, children, onClick, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackDownloadStart(platform);
    onClick?.(e);
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
