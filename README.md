# FellowFoodie (formerly Ortak Sepet) 🍔

FellowFoodie is a modern web application designed to help people find partners for food delivery orders to bypass high minimum cart amounts and share delivery fees.

## Features ✨

- **Geolocation Based Discovery:** Uses browser GPS to accurately show the distance between you and the available shared basket requests.
- **Interactive Maps:** View active food requests on a map using Native Leaflet integration, completely decoupled from React's rendering lifecycle for maximum stability.
- **Secure Escrow Payments:** Mocked escrow system where payments are held in a pool until the delivery is verified.
- **Real-time Chat Mockup:** Simulate communicating with your order partner inside the app.
- **Dark Mode Support:** A sleek, fully featured dark mode out of the box with a manual toggle stored in `localStorage`.
- **Premium UI/UX:** Glassmorphism, smooth animations, and toast notifications (`react-hot-toast`) for a professional feel.

## Technologies Used 🚀

- React 18 + Vite
- React Router DOM
- Leaflet.js
- Lucide React (Icons)
- React Hot Toast
- Vanilla CSS (CSS Variables, Flexbox, CSS Grid)

## How to Run 🏃‍♂️

1. Clone the repository:
   ```bash
   git clone https://github.com/KenanToprak/FoodFellow.git
   ```
2. Navigate to the project directory:
   ```bash
   cd FoodFellow
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## Status
This project is currently in the **MVP (Minimum Viable Product)** phase. It uses mock data and simulated local state for authentication and messaging. The next step is integrating a real backend like Firebase or Supabase.
