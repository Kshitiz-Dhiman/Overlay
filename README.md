# Lyrics Overlay

A lightweight desktop overlay application for displaying song lyrics in real-time.

## Features

- 🎯 Always-on-top transparent overlay window
- 📜 Synced lyrics display with auto-scrolling
- 🎨 Modern UI with Tailwind CSS
- 🖥️ Cross-platform (Windows, macOS, Linux)

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Rust + Tauri

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Rust (latest stable)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kshitiz-Dhiman/Overlay.git
cd lyrics-overlay
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run tauri dev
```

### Build for Production

```bash
npm run tauri build
```

## Usage

1. Enter the track name and artist name in the input fields
2. Click "Load Lyrics" to fetch lyrics
3. Synced lyrics will auto-scroll as the song plays

## Project Structure

```
lyrics-overlay/
├── src/                 # React frontend
├── src-tauri/          # Rust backend
│   └── src/lib.rs      # Tauri commands & API
├── components/         # React components
└── package.json
```

## License

MIT
