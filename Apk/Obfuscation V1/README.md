# LX APK Obfuscator

A modern web application for obfuscating Android APK files with advanced security features.

## Features

### 🛡️ Advanced Security
- **Multi-layer Obfuscation**: String encryption, control flow obfuscation, resource protection
- **Military-grade Encryption**: AES-256 + RSA algorithms
- **Anti-Tampering**: Anti-debug and anti-tamper protection
- **Native Code Protection**: Obfuscation for native libraries

### 📊 Real-time Dashboard
- Live progress tracking during obfuscation
- Statistics panel showing obfuscation metrics
- Protection level indicators
- Processing time estimates

### 🎨 Modern UI
- Drag & drop APK file upload
- Responsive design for all devices
- Gradient-based visual design
- Smooth animations and transitions

### ⚙️ Customizable Settings
- Toggle individual obfuscation features
- Adjust protection levels (Low/Medium/High)
- Real-time protection level calculation
- Security recommendations

## Technology Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Dropzone** - File upload handling

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lx-apk-obfuscator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Upload APK**: Drag and drop your APK file or click to browse
2. **Configure Settings**: Toggle obfuscation options as needed
3. **Start Obfuscation**: Click "Start Obfuscation Process"
4. **Monitor Progress**: Watch real-time progress and statistics
5. **Download**: Get your obfuscated APK file

## Obfuscation Features

### Enabled by Default:
- ✅ String Encryption - Encrypts all string literals
- ✅ Control Flow Obfuscation - Modifies program flow
- ✅ Resource Protection - Encrypts app resources
- ✅ Native Code Obfuscation - Protects native libraries
- ✅ Anti-Debug Protection - Prevents debugging
- ✅ API Hiding - Hides sensitive API calls

### Security Levels:
- **Low**: Basic obfuscation with minimal performance impact
- **Medium**: Balanced protection with moderate performance impact
- **High**: Maximum protection with comprehensive security layers

## Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx   # APK file upload component
│   ├── Header.tsx       # Navigation header
│   ├── ObfuscationOptions.tsx  # Settings panel
│   ├── ObfuscationProcess.tsx  # Progress tracking
│   └── StatsPanel.tsx   # Statistics display
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Security Considerations

- This is a demonstration application for obfuscation concepts
- For production use, implement proper backend processing
- Always test obfuscated APKs thoroughly before release
- Keep obfuscation tools and algorithms updated
- Consider implementing code signing and certificate validation

## Performance

- Optimized bundle size with Vite
- Lazy loading for better initial load times
- Efficient state management with React hooks
- Smooth animations with CSS transitions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is for demonstration purposes. For commercial use, please ensure proper licensing and compliance with relevant regulations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and feature requests, please use the GitHub Issues section.

---

**Note**: This application simulates APK obfuscation for demonstration purposes. Actual APK processing would require backend integration with obfuscation tools like ProGuard, R8, or commercial obfuscators.