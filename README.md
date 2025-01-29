# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# currency
# Currency Converter

## Overview

This is a **React-based Currency Converter** that allows users to convert between different currencies using real-time exchange rates. The application features a modern UI, currency swapping, and error handling for a seamless experience.

## Features

- 🔄 **Real-time Currency Conversion**
- 🔀 **Swap Currencies Instantly**
- 🎨 **Responsive & Modern UI**
- ⚡ **Live Exchange Rate Fetching**
- 🛠 **Error Handling for API Failures**

## Technologies Used

- React.js
- Tailwind CSS
- Axios (for API requests)
- ExchangeRates API
- Lucide Icons (for UI enhancements)

## Installation & Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/yourusername/currency-converter.git
   cd currency-converter
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Set up API Key:**

   - Create a `.env` file in the root directory.
   - Add the following line and replace `YOUR_API_KEY` with your actual API key:
     ```sh
     VITE_REACT_APP_EXCHANGE_RATES_API_KEY=YOUR_API_KEY
     ```

4. **Run the Application:**

   ```sh
   npm run dev
   ```

## Usage

- Enter the amount you want to convert.
- Select the **base currency** and **target currency**.
- Click the **refresh button** to fetch the latest exchange rates.
- Use the **swap button** to quickly switch currencies.

## Screenshots



## Future Enhancements

- 🌍 **Multi-language Support**
- 📊 **Historical Exchange Rate Graphs**
- 📱 **Mobile-Optimized UI Improvements**

## Contributing

Pull requests are welcome! If you find a bug or have a feature request, feel free to open an issue.

## License

This project is licensed under the MIT License.

