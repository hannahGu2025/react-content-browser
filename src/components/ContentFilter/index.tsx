import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPricingOptions, resetFilters,PricingOption } from 'store/slices/contentSlice';

const ContentFilter: React.FC = () => {
    const dispatch = useDispatch();
     const [selected, setSelected] = useState<number[]>([]);


    const toggleOption = (opt: PricingOption) => {
        setSelected(prev => {
            const exists = prev.includes(opt);
            const next = exists ? prev.filter(v => v !== opt) : [...prev, opt];
            // dispatch to redux to filter items
            dispatch(setPricingOptions(next));
            return next;
        });
    };

    const handleReset = () => {
        setSelected([]);
        dispatch(resetFilters());
        // also ensure pricing options in store reset
        dispatch(setPricingOptions([]));
    };

    return (
         <div className="content-filter rcb-filter-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ color: '#bdbdbd', fontSize: 14 }}>Pricing Option</div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#e6e6e6' }}>
                    <input
                        type="checkbox"
                        checked={selected.includes(PricingOption.PAID)}
                        onChange={() => toggleOption(PricingOption.PAID)}
                        aria-label="Paid"
                    />
                    <span>Paid</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#e6e6e6' }}>
                    <input
                        type="checkbox"
                        checked={selected.includes(PricingOption.FREE)}
                        onChange={() => toggleOption(PricingOption.FREE)}
                        aria-label="Free"
                    />
                    <span>Free</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#e6e6e6' }}>
                    <input
                        type="checkbox"
                        checked={selected.includes(PricingOption.VIEW_ONLY)}
                        onChange={() => toggleOption(PricingOption.VIEW_ONLY)}
                        aria-label="View Only"
                    />
                    <span>View Only</span>
                </label>
            </div>

            <button
                onClick={handleReset}
                style={{ background: 'transparent', border: 'none', color: '#bdbdbd', cursor: 'pointer', fontWeight: 700 }}
                aria-label="Reset filters"
            >
                RESET
            </button>
        </div>
    );
};

export default ContentFilter;