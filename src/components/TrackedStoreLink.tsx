import { withUtmParams } from '../utils/utmTracker';
import { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  store: 'apple' | 'google';
}

const STORE_URLS = {
  apple: 'https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441',
  google: 'https://play.google.com/store/apps/details?id=com.yummeal'
};

export default function TrackedStoreLink({ store, ...props }: Props) {
  const handleClick = () => {
    console.log('Clic sur', store, 'URL:', STORE_URLS[store]);
    window.open(withUtmParams(STORE_URLS[store]), '_blank');
  };

  return (
    <a 
      {...props}
      onClick={handleClick}
      style={{ ...props.style, cursor: 'pointer' }}
    />
  );
}
