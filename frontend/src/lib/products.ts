export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  mrp: number;
  discountedPrice: number;
  discountPercent: number;
  weightOrQuantity: string;
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  isInStock: boolean;
  emoji: string;
  tags: string[];
}

export const CATEGORIES = [
  { id: 'fruits', name: 'Fruits & Vegetables', emoji: '🥦', image: '/assets/generated/category-fruits.dim_96x96.png' },
  { id: 'dairy', name: 'Dairy & Breakfast', emoji: '🥛', image: '/assets/generated/category-dairy.dim_96x96.png' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿', image: '/assets/generated/category-snacks.dim_96x96.png' },
  { id: 'personal-care', name: 'Personal Care', emoji: '🧴', image: '/assets/generated/category-personal-care.dim_96x96.png' },
  { id: 'pharmacy', name: 'Pharmacy', emoji: '💊', image: '/assets/generated/category-pharmacy.dim_96x96.png' },
  { id: 'household', name: 'Household', emoji: '🧹', image: '/assets/generated/category-household.dim_96x96.png' },
  { id: 'electronics', name: 'Electronics', emoji: '🔌', image: '/assets/generated/category-electronics.dim_96x96.png' },
  { id: 'pet', name: 'Pet Supplies', emoji: '🐾', image: '/assets/generated/category-pet.dim_96x96.png' },
];

export const ALL_PRODUCTS: Product[] = [
  // Fruits & Vegetables
  { id: 'p1', name: 'Fresh Tomatoes', category: 'fruits', subcategory: 'vegetables', brand: 'Local Farm', mrp: 40, discountedPrice: 32, discountPercent: 20, weightOrQuantity: '500g', rating: 4.3, reviewCount: 2341, isVeg: true, isInStock: true, emoji: '🍅', tags: ['fresh', 'vegetables'] },
  { id: 'p2', name: 'Onions', category: 'fruits', subcategory: 'vegetables', brand: 'Local Farm', mrp: 35, discountedPrice: 28, discountPercent: 20, weightOrQuantity: '1kg', rating: 4.1, reviewCount: 1892, isVeg: true, isInStock: true, emoji: '🧅', tags: ['fresh', 'vegetables'] },
  { id: 'p3', name: 'Bananas', category: 'fruits', subcategory: 'fruits', brand: 'Local Farm', mrp: 50, discountedPrice: 42, discountPercent: 16, weightOrQuantity: '6 pcs', rating: 4.5, reviewCount: 3210, isVeg: true, isInStock: true, emoji: '🍌', tags: ['fresh', 'fruits'] },
  { id: 'p4', name: 'Potatoes', category: 'fruits', subcategory: 'vegetables', brand: 'Local Farm', mrp: 30, discountedPrice: 25, discountPercent: 17, weightOrQuantity: '1kg', rating: 4.2, reviewCount: 1567, isVeg: true, isInStock: true, emoji: '🥔', tags: ['fresh', 'vegetables'] },
  { id: 'p5', name: 'Green Capsicum', category: 'fruits', subcategory: 'vegetables', brand: 'Local Farm', mrp: 45, discountedPrice: 38, discountPercent: 16, weightOrQuantity: '250g', rating: 4.0, reviewCount: 987, isVeg: true, isInStock: true, emoji: '🫑', tags: ['fresh', 'vegetables'] },
  { id: 'p6', name: 'Apples (Shimla)', category: 'fruits', subcategory: 'fruits', brand: 'Himachal Fresh', mrp: 120, discountedPrice: 99, discountPercent: 18, weightOrQuantity: '4 pcs', rating: 4.6, reviewCount: 4521, isVeg: true, isInStock: true, emoji: '🍎', tags: ['fresh', 'fruits', 'premium'] },
  { id: 'p7', name: 'Spinach (Palak)', category: 'fruits', subcategory: 'leafy', brand: 'Local Farm', mrp: 25, discountedPrice: 20, discountPercent: 20, weightOrQuantity: '250g', rating: 4.1, reviewCount: 876, isVeg: true, isInStock: true, emoji: '🥬', tags: ['fresh', 'leafy'] },

  // Dairy & Breakfast
  { id: 'p8', name: 'Amul Taza Milk', category: 'dairy', subcategory: 'milk', brand: 'Amul', mrp: 28, discountedPrice: 28, discountPercent: 0, weightOrQuantity: '500ml', rating: 4.7, reviewCount: 12453, isVeg: true, isInStock: true, emoji: '🥛', tags: ['dairy', 'daily'] },
  { id: 'p9', name: 'Amul Butter', category: 'dairy', subcategory: 'butter', brand: 'Amul', mrp: 55, discountedPrice: 52, discountPercent: 5, weightOrQuantity: '100g', rating: 4.8, reviewCount: 8932, isVeg: true, isInStock: true, emoji: '🧈', tags: ['dairy', 'daily'] },
  { id: 'p10', name: 'Amul Paneer', category: 'dairy', subcategory: 'paneer', brand: 'Amul', mrp: 85, discountedPrice: 75, discountPercent: 12, weightOrQuantity: '200g', rating: 4.5, reviewCount: 6234, isVeg: true, isInStock: true, emoji: '🧀', tags: ['dairy', 'protein'] },
  { id: 'p11', name: 'Mother Dairy Curd', category: 'dairy', subcategory: 'curd', brand: 'Mother Dairy', mrp: 45, discountedPrice: 40, discountPercent: 11, weightOrQuantity: '400g', rating: 4.4, reviewCount: 5678, isVeg: true, isInStock: true, emoji: '🥣', tags: ['dairy', 'probiotic'] },
  { id: 'p12', name: 'Britannia Bread', category: 'dairy', subcategory: 'bread', brand: 'Britannia', mrp: 40, discountedPrice: 36, discountPercent: 10, weightOrQuantity: '400g', rating: 4.3, reviewCount: 7890, isVeg: true, isInStock: true, emoji: '🍞', tags: ['breakfast', 'daily'] },
  { id: 'p13', name: 'Farm Fresh Eggs', category: 'dairy', subcategory: 'eggs', brand: 'Nandini', mrp: 72, discountedPrice: 65, discountPercent: 10, weightOrQuantity: '6 pcs', rating: 4.6, reviewCount: 9123, isVeg: false, isInStock: true, emoji: '🥚', tags: ['protein', 'breakfast'] },
  { id: 'p14', name: 'Tata Tea Premium', category: 'dairy', subcategory: 'tea', brand: 'Tata', mrp: 95, discountedPrice: 85, discountPercent: 11, weightOrQuantity: '250g', rating: 4.5, reviewCount: 11234, isVeg: true, isInStock: true, emoji: '🍵', tags: ['beverage', 'morning'] },

  // Snacks
  { id: 'p15', name: 'Parle-G Biscuits', category: 'snacks', subcategory: 'biscuits', brand: 'Parle', mrp: 10, discountedPrice: 10, discountPercent: 0, weightOrQuantity: '100g', rating: 4.8, reviewCount: 25678, isVeg: true, isInStock: true, emoji: '🍪', tags: ['biscuits', 'classic', 'tea-time'] },
  { id: 'p16', name: 'Lay\'s Classic Salted', category: 'snacks', subcategory: 'chips', brand: 'Lay\'s', mrp: 20, discountedPrice: 18, discountPercent: 10, weightOrQuantity: '26g', rating: 4.4, reviewCount: 15432, isVeg: true, isInStock: true, emoji: '🥔', tags: ['chips', 'snacks'] },
  { id: 'p17', name: 'Maggi 2-Minute Noodles', category: 'snacks', subcategory: 'instant', brand: 'Maggi', mrp: 14, discountedPrice: 13, discountPercent: 7, weightOrQuantity: '70g', rating: 4.7, reviewCount: 32145, isVeg: true, isInStock: true, emoji: '🍜', tags: ['instant', 'quick', 'classic'] },
  { id: 'p18', name: 'Kurkure Masala Munch', category: 'snacks', subcategory: 'chips', brand: 'Kurkure', mrp: 20, discountedPrice: 18, discountPercent: 10, weightOrQuantity: '90g', rating: 4.3, reviewCount: 8765, isVeg: true, isInStock: true, emoji: '🌽', tags: ['chips', 'spicy'] },
  { id: 'p19', name: 'Haldiram\'s Bhujia', category: 'snacks', subcategory: 'namkeen', brand: 'Haldiram\'s', mrp: 50, discountedPrice: 45, discountPercent: 10, weightOrQuantity: '200g', rating: 4.6, reviewCount: 12345, isVeg: true, isInStock: true, emoji: '🥜', tags: ['namkeen', 'traditional'] },
  { id: 'p20', name: 'Oreo Chocolate Cream', category: 'snacks', subcategory: 'biscuits', brand: 'Oreo', mrp: 30, discountedPrice: 27, discountPercent: 10, weightOrQuantity: '120g', rating: 4.5, reviewCount: 9876, isVeg: true, isInStock: true, emoji: '🍪', tags: ['biscuits', 'chocolate'] },
  { id: 'p21', name: 'Britannia Good Day', category: 'snacks', subcategory: 'biscuits', brand: 'Britannia', mrp: 30, discountedPrice: 27, discountPercent: 10, weightOrQuantity: '150g', rating: 4.4, reviewCount: 7654, isVeg: true, isInStock: true, emoji: '🍪', tags: ['biscuits', 'cashew'] },

  // Personal Care
  { id: 'p22', name: 'Dove Shampoo', category: 'personal-care', subcategory: 'hair', brand: 'Dove', mrp: 180, discountedPrice: 153, discountPercent: 15, weightOrQuantity: '180ml', rating: 4.4, reviewCount: 6543, isVeg: false, isInStock: true, emoji: '🧴', tags: ['hair', 'shampoo'] },
  { id: 'p23', name: 'Lux Soap', category: 'personal-care', subcategory: 'soap', brand: 'Lux', mrp: 45, discountedPrice: 40, discountPercent: 11, weightOrQuantity: '100g', rating: 4.3, reviewCount: 8901, isVeg: false, isInStock: true, emoji: '🧼', tags: ['soap', 'bath'] },
  { id: 'p24', name: 'Colgate MaxFresh', category: 'personal-care', subcategory: 'dental', brand: 'Colgate', mrp: 95, discountedPrice: 85, discountPercent: 11, weightOrQuantity: '150g', rating: 4.5, reviewCount: 11234, isVeg: true, isInStock: true, emoji: '🦷', tags: ['dental', 'toothpaste'] },
  { id: 'p25', name: 'Dettol Hand Wash', category: 'personal-care', subcategory: 'hygiene', brand: 'Dettol', mrp: 99, discountedPrice: 85, discountPercent: 14, weightOrQuantity: '200ml', rating: 4.6, reviewCount: 9876, isVeg: true, isInStock: true, emoji: '🧴', tags: ['hygiene', 'handwash'] },
  { id: 'p26', name: 'Nivea Body Lotion', category: 'personal-care', subcategory: 'skin', brand: 'Nivea', mrp: 199, discountedPrice: 169, discountPercent: 15, weightOrQuantity: '200ml', rating: 4.4, reviewCount: 5432, isVeg: false, isInStock: true, emoji: '🧴', tags: ['skin', 'moisturizer'] },
  { id: 'p27', name: 'Gillette Mach3 Razor', category: 'personal-care', subcategory: 'grooming', brand: 'Gillette', mrp: 250, discountedPrice: 210, discountPercent: 16, weightOrQuantity: '1 pc', rating: 4.5, reviewCount: 4321, isVeg: true, isInStock: false, emoji: '🪒', tags: ['grooming', 'shaving'] },

  // Pharmacy
  { id: 'p28', name: 'Dolo 650 Paracetamol', category: 'pharmacy', subcategory: 'fever', brand: 'Micro Labs', mrp: 30, discountedPrice: 28, discountPercent: 7, weightOrQuantity: '15 tabs', rating: 4.7, reviewCount: 23456, isVeg: true, isInStock: true, emoji: '💊', tags: ['fever', 'pain', 'medicine'] },
  { id: 'p29', name: 'Vicks VapoRub', category: 'pharmacy', subcategory: 'cold', brand: 'Vicks', mrp: 85, discountedPrice: 76, discountPercent: 11, weightOrQuantity: '50g', rating: 4.6, reviewCount: 12345, isVeg: false, isInStock: true, emoji: '🫙', tags: ['cold', 'cough', 'relief'] },
  { id: 'p30', name: 'Band-Aid Strips', category: 'pharmacy', subcategory: 'first-aid', brand: 'Band-Aid', mrp: 65, discountedPrice: 58, discountPercent: 11, weightOrQuantity: '10 pcs', rating: 4.4, reviewCount: 5678, isVeg: true, isInStock: true, emoji: '🩹', tags: ['first-aid', 'wound'] },
  { id: 'p31', name: 'Digene Antacid', category: 'pharmacy', subcategory: 'digestion', brand: 'Abbott', mrp: 55, discountedPrice: 50, discountPercent: 9, weightOrQuantity: '15 tabs', rating: 4.3, reviewCount: 7890, isVeg: true, isInStock: true, emoji: '💊', tags: ['digestion', 'acidity'] },
  { id: 'p32', name: 'Savlon Antiseptic', category: 'pharmacy', subcategory: 'antiseptic', brand: 'Savlon', mrp: 75, discountedPrice: 65, discountPercent: 13, weightOrQuantity: '100ml', rating: 4.5, reviewCount: 6543, isVeg: true, isInStock: true, emoji: '🧪', tags: ['antiseptic', 'wound'] },

  // Household
  { id: 'p33', name: 'Surf Excel Matic', category: 'household', subcategory: 'laundry', brand: 'Surf Excel', mrp: 220, discountedPrice: 185, discountPercent: 16, weightOrQuantity: '1kg', rating: 4.5, reviewCount: 15678, isVeg: true, isInStock: true, emoji: '🧺', tags: ['laundry', 'detergent'] },
  { id: 'p34', name: 'Vim Dishwash Bar', category: 'household', subcategory: 'kitchen', brand: 'Vim', mrp: 30, discountedPrice: 27, discountPercent: 10, weightOrQuantity: '200g', rating: 4.4, reviewCount: 9876, isVeg: true, isInStock: true, emoji: '🍽️', tags: ['kitchen', 'dishwash'] },
  { id: 'p35', name: 'Harpic Toilet Cleaner', category: 'household', subcategory: 'cleaning', brand: 'Harpic', mrp: 99, discountedPrice: 85, discountPercent: 14, weightOrQuantity: '500ml', rating: 4.3, reviewCount: 7654, isVeg: true, isInStock: true, emoji: '🚽', tags: ['cleaning', 'toilet'] },
  { id: 'p36', name: 'Colin Glass Cleaner', category: 'household', subcategory: 'cleaning', brand: 'Colin', mrp: 85, discountedPrice: 75, discountPercent: 12, weightOrQuantity: '500ml', rating: 4.2, reviewCount: 4321, isVeg: true, isInStock: true, emoji: '🪟', tags: ['cleaning', 'glass'] },
  { id: 'p37', name: 'Good Knight Mosquito Coil', category: 'household', subcategory: 'pest', brand: 'Good Knight', mrp: 45, discountedPrice: 40, discountPercent: 11, weightOrQuantity: '10 coils', rating: 4.1, reviewCount: 8765, isVeg: true, isInStock: true, emoji: '🌀', tags: ['mosquito', 'pest'] },
  { id: 'p38', name: 'Scotch-Brite Scrub Pad', category: 'household', subcategory: 'kitchen', brand: '3M', mrp: 35, discountedPrice: 30, discountPercent: 14, weightOrQuantity: '3 pcs', rating: 4.4, reviewCount: 5432, isVeg: true, isInStock: true, emoji: '🧽', tags: ['kitchen', 'scrub'] },

  // Electronics
  { id: 'p39', name: 'Duracell AA Batteries', category: 'electronics', subcategory: 'batteries', brand: 'Duracell', mrp: 120, discountedPrice: 99, discountPercent: 19, weightOrQuantity: '4 pcs', rating: 4.5, reviewCount: 8901, isVeg: true, isInStock: true, emoji: '🔋', tags: ['batteries', 'power'] },
  { id: 'p40', name: 'Syska LED Bulb 9W', category: 'electronics', subcategory: 'lighting', brand: 'Syska', mrp: 99, discountedPrice: 79, discountPercent: 20, weightOrQuantity: '1 pc', rating: 4.3, reviewCount: 6543, isVeg: true, isInStock: true, emoji: '💡', tags: ['lighting', 'led'] },
  { id: 'p41', name: 'USB Type-C Cable', category: 'electronics', subcategory: 'cables', brand: 'Portronics', mrp: 299, discountedPrice: 249, discountPercent: 17, weightOrQuantity: '1m', rating: 4.2, reviewCount: 4321, isVeg: true, isInStock: true, emoji: '🔌', tags: ['cable', 'charging'] },
  { id: 'p42', name: 'Boat Earphones', category: 'electronics', subcategory: 'audio', brand: 'boAt', mrp: 499, discountedPrice: 399, discountPercent: 20, weightOrQuantity: '1 pc', rating: 4.1, reviewCount: 12345, isVeg: true, isInStock: false, emoji: '🎧', tags: ['audio', 'earphones'] },
  { id: 'p43', name: 'Havells Extension Board', category: 'electronics', subcategory: 'power', brand: 'Havells', mrp: 450, discountedPrice: 380, discountPercent: 16, weightOrQuantity: '4 socket', rating: 4.4, reviewCount: 3456, isVeg: true, isInStock: true, emoji: '🔌', tags: ['power', 'extension'] },

  // Pet Supplies
  { id: 'p44', name: 'Pedigree Dog Food', category: 'pet', subcategory: 'dog-food', brand: 'Pedigree', mrp: 250, discountedPrice: 210, discountPercent: 16, weightOrQuantity: '1.2kg', rating: 4.5, reviewCount: 5678, isVeg: false, isInStock: true, emoji: '🐕', tags: ['dog', 'food'] },
  { id: 'p45', name: 'Whiskas Cat Food', category: 'pet', subcategory: 'cat-food', brand: 'Whiskas', mrp: 180, discountedPrice: 155, discountPercent: 14, weightOrQuantity: '500g', rating: 4.4, reviewCount: 3456, isVeg: false, isInStock: true, emoji: '🐱', tags: ['cat', 'food'] },
  { id: 'p46', name: 'Pet Shampoo', category: 'pet', subcategory: 'grooming', brand: 'Wahl', mrp: 299, discountedPrice: 249, discountPercent: 17, weightOrQuantity: '200ml', rating: 4.2, reviewCount: 1234, isVeg: false, isInStock: true, emoji: '🛁', tags: ['grooming', 'shampoo'] },
  { id: 'p47', name: 'Dog Collar', category: 'pet', subcategory: 'accessories', brand: 'Trixie', mrp: 199, discountedPrice: 169, discountPercent: 15, weightOrQuantity: 'Medium', rating: 4.3, reviewCount: 2345, isVeg: true, isInStock: true, emoji: '🦮', tags: ['accessories', 'collar'] },

  // More Grocery Staples
  { id: 'p48', name: 'Aashirvaad Atta', category: 'dairy', subcategory: 'flour', brand: 'Aashirvaad', mrp: 280, discountedPrice: 245, discountPercent: 13, weightOrQuantity: '5kg', rating: 4.6, reviewCount: 18765, isVeg: true, isInStock: true, emoji: '🌾', tags: ['atta', 'flour', 'staple'] },
  { id: 'p49', name: 'India Gate Basmati Rice', category: 'dairy', subcategory: 'rice', brand: 'India Gate', mrp: 320, discountedPrice: 275, discountPercent: 14, weightOrQuantity: '5kg', rating: 4.7, reviewCount: 22345, isVeg: true, isInStock: true, emoji: '🍚', tags: ['rice', 'basmati', 'staple'] },
  { id: 'p50', name: 'Tata Salt', category: 'household', subcategory: 'spices', brand: 'Tata', mrp: 25, discountedPrice: 22, discountPercent: 12, weightOrQuantity: '1kg', rating: 4.8, reviewCount: 34567, isVeg: true, isInStock: true, emoji: '🧂', tags: ['salt', 'staple'] },
  { id: 'p51', name: 'Fortune Sunflower Oil', category: 'household', subcategory: 'oil', brand: 'Fortune', mrp: 180, discountedPrice: 155, discountPercent: 14, weightOrQuantity: '1L', rating: 4.4, reviewCount: 9876, isVeg: true, isInStock: true, emoji: '🫙', tags: ['oil', 'cooking', 'staple'] },
  { id: 'p52', name: 'Tata Sugar', category: 'household', subcategory: 'sugar', brand: 'Tata', mrp: 55, discountedPrice: 48, discountPercent: 13, weightOrQuantity: '1kg', rating: 4.5, reviewCount: 12345, isVeg: true, isInStock: true, emoji: '🍬', tags: ['sugar', 'staple'] },
  { id: 'p53', name: 'Toor Dal', category: 'dairy', subcategory: 'dal', brand: 'Patanjali', mrp: 120, discountedPrice: 105, discountPercent: 13, weightOrQuantity: '500g', rating: 4.3, reviewCount: 7654, isVeg: true, isInStock: true, emoji: '🫘', tags: ['dal', 'protein', 'staple'] },
];

export const TOP_ESSENTIALS = ALL_PRODUCTS.filter(p =>
  ['p8', 'p12', 'p13', 'p15', 'p48', 'p49', 'p2', 'p1', 'p3', 'p9', 'p10', 'p11', 'p17', 'p16', 'p19', 'p51', 'p52', 'p50', 'p14', 'p53'].includes(p.id)
);
