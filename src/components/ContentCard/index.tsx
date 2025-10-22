import React from 'react';
import { PricingOption } from 'types/index';

import './index.scss';

interface ContentCardProps {
  title: string;
  creator: string;
  imagePath: string;
  onClick: () => void;
  price: number;
  pricingOption: PricingOption;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  creator,
  pricingOption,
  imagePath,
  onClick,
  price,
}) => {
  const priceInfo = React.useMemo(() => {
    if (pricingOption === PricingOption.VIEW_ONLY) {
      return { label: 'View Only', variant: 'variant--view-only' };
    }
    if (pricingOption === PricingOption.PAID) {
      return { label: `$${price}`, variant: 'variant--paid' };
    }
    return { label: 'Free', variant: 'variant--free' };
  }, [pricingOption, price]);

  return (
    <div className="content-card" onClick={onClick}>
      <img src={imagePath} alt={title} className="content-card-image" />
      <div className="content-card-body">
        <div className="content-card-left">
          <h3 className="content-card-title">{title}</h3>
          <p className="content-card-description">{creator}</p>
        </div>

        <div className="content-card-right">
          <span className="content-card-price">{priceInfo.label}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
