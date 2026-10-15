// src/data/constants.js
export const COLLECTIONS = [
  { id: 'all', label: 'Everything', description: 'Small things, thoughtfully made.' },
  { id: 'bloom', label: 'Bloom', description: 'Flowers that never need watering.' },
  { id: 'accessories', label: 'Accessories', description: 'Handmade details for everyday life.' },
  { id: 'home-living', label: 'Home & Living', description: 'Thoughtful pieces for the spaces you love.' },
];

export const FILTERS = {
  all: [{ id: 'all', label: 'All pieces' }],
  bloom: [
    { id: 'all', label: 'All flowers' },
    { id: 'single-stem', label: 'Single stems' },
    { id: 'pot', label: 'Pots' },
    { id: 'bouquet', label: 'Bouquets' },
    { id: 'keychain', label: 'Keychains' },
  ],
  accessories: [
    { id: 'all', label: 'All accessories' },
    { id: 'keychain', label: 'Keychains' },
    { id: 'bag', label: 'Bags' },
    { id: 'hair-accessory', label: 'Hair accessories' },
    { id: 'wearable', label: 'Wearables' },
  ],
  'home-living': [
    { id: 'all', label: 'All home pieces' },
    { id: 'wall-decor', label: 'Wall décor' },
    { id: 'coaster', label: 'Coasters' },
    { id: 'pot', label: 'Pots & planters' },
    { id: 'decorative', label: 'Decorative pieces' },
  ],
};

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/_.dhaagaa/';
export const INSTAGRAM_DM_URL = 'https://ig.me/m/_.dhaagaa/';