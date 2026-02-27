# Specification

## Summary
**Goal:** Add a profile/account summary section to the bottom of the Home page.

**Planned changes:**
- Add a profile/account summary section in `frontend/src/pages/Home.tsx`, placed below the CustomerCareContact banner
- Display the logged-in user's name and phone number from `authStore`, or a "Login / Sign Up" prompt card if not authenticated
- Add a row of four quick-link cards ("My Orders", "Saved Addresses", "Loyalty Points", "Help & Support"), each with an icon and navigating to the Profile page
- Add a "Go to Profile" button that navigates to the Profile page
- Style the section with MurkiMart orange (#F97316) and green (#16A34A) using a card/tile layout

**User-visible outcome:** Users visiting the Home page see a profile summary section at the bottom showing their name and phone (or a login prompt if not signed in), four quick-link tiles, and a button to go to the Profile page.
