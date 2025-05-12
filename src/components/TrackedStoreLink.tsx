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
  return (
    <a
      href={withUtmParams(STORE_URLS[store])}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}
