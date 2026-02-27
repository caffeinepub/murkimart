# Specification

## Summary
**Goal:** Display a numeric count (e.g., "6 pcs") instead of weight for egg products in ProductCard, while keeping weight display unchanged for all other products.

**Planned changes:**
- In `ProductCard`, detect egg products by checking if the product's name or category contains "egg" (case-insensitive).
- For egg products, show a numeric count with a "pcs" label (and appropriate icon) instead of the weight/Scale icon display.
- All non-egg products continue to show weight with the Scale icon as before.

**User-visible outcome:** Egg products throughout the app (QuickAddEssentials, FlashDeals, ProductCatalog, etc.) show a piece count instead of a weight, while every other product's weight display remains unchanged.
