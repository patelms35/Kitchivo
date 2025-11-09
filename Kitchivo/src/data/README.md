# Products Data Management

## Overview
This folder contains the centralized product data management system for the Kitchivo project. All product cards across the entire application are managed from a single file.

## File Structure

### `productsData.js`
Main data file containing all products and helper functions.

## How to Use

### 1. Adding New Products
To add a new product, simply add it to the `allProducts` array in `productsData.js`:

```javascript
{
  id: 25,                    // Unique ID
  name: 'Product Name',      // Product title
  description: 'Product description',
  originalPrice: '₹2,999',   // Original price (optional)
  price: '₹1,999',           // Current price
  discount: '-33%',          // Discount percentage (optional)
  image: 'https://...',      // Product image URL
  amazonLink: '#',           // Amazon product link
  category: 'Cookware',      // Category name
  rating: 4.5,               // Rating out of 5
  reviews: 150,              // Number of reviews
  badge: 'New'               // Badge: 'New', 'Bestseller', or leave empty
}
```

### 2. Updating Product Data
Simply edit the product object in the `allProducts` array. Changes will automatically reflect across all pages.

### 3. Categories
Available categories:
- Storage
- Cookware
- Dinnerware
- Drinkware
- Kitchen Tools
- Home Decor

To add a new category, just use it in the `category` field when adding a product.

### 4. Badges
Available badges:
- `'New'` - Shows "New" badge on product card
- `'Bestseller'` - Shows "Bestseller" badge on product card
- Leave empty for no badge

## Helper Functions

### `allProducts`
Array containing all product data.

### `getProductsByBadge(badge)`
Get all products with a specific badge.
```javascript
const newProducts = getProductsByBadge('New');
const bestsellers = getProductsByBadge('Bestseller');
```

### `getProductsByCategory(category)`
Get all products from a specific category.
```javascript
const cookware = getProductsByCategory('Cookware');
const allProducts = getProductsByCategory('All');
```

### `getBestsellers()`
Get bestseller products (products with 'Bestseller' badge or rating >= 4.5).

### `getNewProducts()`
Get new arrival products (products with 'New' badge or id <= 8).

### `getProductById(id)`
Get a single product by its ID.
```javascript
const product = getProductById(5);
```

### `getProductsByCategories()`
Get all products grouped by category (used in CategoryProducts page).

## Pages Using This Data

1. **Products** (`/products`) - Shows all products with filtering
2. **Home - Bestsellers Section** - Shows bestseller products
3. **Home - New In Section** - Shows new arrival products
4. **Product Detail** (`/product/:id`) - Shows individual product details
5. **New Products** (`/new-products`) - Shows products with "New" badge
6. **Category Products** (`/category/:categoryName`) - Shows category-wise products

## Benefits

✅ **Single Source of Truth** - All product data in one place  
✅ **Easy Updates** - Update once, reflects everywhere  
✅ **No Data Duplication** - No need to copy-paste product data  
✅ **Type Safety** - Consistent data structure  
✅ **Easy Maintenance** - Simple to add/edit/remove products  

## Example Workflow

### Adding a New Product:
1. Open `src/data/productsData.js`
2. Add new product object to `allProducts` array
3. Save file
4. Product automatically appears in all relevant pages

### Updating Price:
1. Open `src/data/productsData.js`
2. Find product by ID
3. Update `price` and `originalPrice` fields
4. Save file
5. Price updated across all pages

---

**Note**: Always ensure product IDs are unique. Use the next available number when adding new products.
