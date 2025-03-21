# Helios Mobile

Helios Mobile is a modern, feature-rich mobile browser application built with React Native and Expo. It offers a seamless browsing experience with support for multiple search engines, customizable themes, and an intuitive user interface.

## Features

### 🔍 Multi-Search Engine Support
- Built-in support for popular search engines:
  - Google
  - Bing
  - Perplexity
- Custom search engine configuration
- Persistent search engine preferences

### 🎨 Theme Customization
- Dynamic Dark/Light theme switching
- Smooth theme transitions
- System-wide theme consistency

### 🌐 Browser Features
- Clean and intuitive URL bar
- Loading progress indicator
- Smart URL validation and auto-completion
- Secure browsing experience

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio and Android SDK (for Android development)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd helios-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` to run on iOS simulator
- Press `a` to run on Android emulator
- Scan the QR code with Expo Go app on your device

## Project Structure

```
/
├── app/                # Main application code
│   ├── context/        # React Context providers
│   │   ├── SearchEngineContext.tsx  # Search engine preferences
│   │   ├── TabsContext.tsx          # Browser tab management
│   │   └── ThemeContext.tsx         # Theme configuration
│   └── components/     # Shared components
├── assets/            # Static assets
│   ├── fonts/         # Custom fonts
│   └── images/        # Images and icons
├── components/        # Core components
│   ├── GradientLoader.tsx      # Loading indicator
│   ├── SearchEngineModal.tsx   # Search engine selector
│   ├── input.tsx              # URL/Search input
│   └── tab.tsx               # Browser tab implementation
└── package.json       # Project dependencies
```

## Development

### Key Components

- `SearchEngineModal`: Handles search engine selection and configuration
- `Tab`: Manages browser tab functionality and URL handling
- `GradientLoader`: Provides visual feedback during page loads
- `ThemeContext`: Manages application-wide theme settings

### State Management

The application uses React Context for state management:
- `SearchEngineContext`: Manages search engine preferences and persistence
- `TabsContext`: Handles browser tab state and navigation
- `ThemeContext`: Controls theme settings and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Powered by [Expo](https://expo.dev)
- Uses [Lucide React Native](https://lucide.dev) for icons
- Implements [React Native WebView](https://github.com/react-native-webview/react-native-webview) for browsing functionality
