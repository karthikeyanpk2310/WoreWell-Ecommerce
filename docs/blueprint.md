# **App Name**: Wore Well

## Core Features:

- User Authentication: Enable users to securely sign up, log in, and manage their profiles using Firebase Authentication.
- Product Catalog: Display a comprehensive and filterable catalog of clothing items.
- Personalized Recommendations: Provide personalized product recommendations based on user gender, preferences, and browsing history. A Genkit tool provides LLM-based product descriptions to the recommendation model.
- Shopping Cart: Allow users to add items to a shopping cart, manage quantities, and proceed to checkout.
- Order Management: Enable users to place orders, track their delivery status, and view order history.
- Admin Product Management: Provide an admin interface for managing products, including adding new items, updating existing ones, and managing stock levels.
- Email Notifications: Send transactional emails for order confirmations, shipment updates, and delivery notifications using Cloud Functions and Nodemailer.

## Style Guidelines:

- Primary color: Deep indigo (#6C63FF) for a sense of trust and sophistication.
- Background color: Light gray (#F5F5F5), providing a clean backdrop that highlights the products.
- Accent color: Vibrant pink (#FF3E6C) to draw attention to key interactive elements such as buttons and badges.
- Body font: 'PT Sans', a humanist sans-serif, for clear, readable body text.
- Headline font: 'Playfair', a modern sans-serif, for headings, paired with 'PT Sans' for body text. Note: currently only Google Fonts are supported.
- Use heroicons or material-symbols with a consistent stroke weight to represent common actions and categories.
- Implement a mobile-first responsive layout with a single column on mobile, two-three columns on tablets, and four columns on desktops.
- Incorporate subtle micro-animations (150-250ms transitions) to enhance user experience and provide visual feedback.