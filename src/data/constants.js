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

// =========================================================================
// 📱 WHATSAPP CONFIGURATION
// To update your WhatsApp number, change the string below:
// Format: Country code + 10-digit number without '+' or spaces (e.g. '919557501542')
// =========================================================================
export const WHATSAPP_PHONE_NUMBER = '919557501542'; // <-- 👈 CHANGE YOUR WHATSAPP NUMBER HERE

export function getWhatsAppUrl(message = '') {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/_.dhaagaa/';
export const INSTAGRAM_DM_URL = 'https://ig.me/m/_.dhaagaa/';

// =========================================================================
// 💬 CUSTOMER REVIEWS / SOCIAL PROOF
// =========================================================================
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Aanya S.",
    location: "Noida",
    rating: 5,
    text: "Ordered a sunflower pot for my best friend's birthday and she cried happy tears! The detailing in each petal and the little crochet pot is unbelievable.",
    piece: "Sunflower Pot",
    tag: "Verified Buyer"
  },
  {
    id: 2,
    name: "Meera K.",
    location: "South Delhi",
    rating: 5,
    text: "Got the lavender stems for my work desk. They bring so much quiet joy every morning and I love that they will literally never wilt or fade.",
    piece: "Lavender Stem Bundle",
    tag: "Verified Buyer"
  },
  {
    id: 3,
    name: "Rohan & Sneha",
    location: "Noida, Sector 62",
    rating: 5,
    text: "Asked for a custom wedding anniversary bouquet in pastel roses. Dhaaga was so thoughtful in helping choose colors. 100x better than real flowers!",
    piece: "Custom Rose Bouquet",
    tag: "Custom Order"
  },
  {
    id: 4,
    name: "Ishita P.",
    location: "New Delhi",
    rating: 5,
    text: "The tulip keychain is so soft and well-stitched. You can tell real love and time was put into making it. Packaging felt like a warm hug too.",
    piece: "Tulip Keychain",
    tag: "Verified Buyer"
  }
];

// =========================================================================
// 🎨 CUSTOM ORDER OPTIONS
// =========================================================================
export const CUSTOM_CATEGORIES = [
  { id: 'bouquet', label: 'Bouquet', iconName: 'bouquet', desc: 'Handcrafted floral bundle' },
  { id: 'pot', label: 'Potted Flower', iconName: 'pot', desc: 'Everlasting desk garden' },
  { id: 'single-stem', label: 'Single Stems', iconName: 'single-stem', desc: 'Minimal floral accent' },
  { id: 'keychain', label: 'Keychain / Charm', iconName: 'keychain', desc: 'Everyday pocket keepsake' },
  { id: 'coasters', label: 'Coasters & Decor', iconName: 'coasters', desc: 'Handmade home table accents' },
  { id: 'other', label: 'Something Unique', iconName: 'other', desc: 'Custom vision / bespoke gift' },
];

export const CUSTOM_PALETTES = [
  { id: 'warm-sunset', label: 'Warm Sunset (Reds, Pinks, Oranges)', color: '#e07a5f' },
  { id: 'earthy-olive', label: 'Earthy Sage & Olive', color: '#626b50' },
  { id: 'soft-pastel', label: 'Soft Pastels (Blush, Lavender, Mint)', color: '#b8a9c9' },
  { id: 'classic-cream', label: 'Cream, Ivory & Neutrals', color: '#b6a18a' },
  { id: 'vibrant-sun', label: 'Bright Sunshine (Yellows & Whites)', color: '#e9c46a' },
];