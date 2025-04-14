# Suburbia Skate

Suburbia Skate is an interactive 3D skateboarding experience built with modern web technologies like React, Three.js, TailwindCSS, and GSAP. It allows users to customize skateboards and interact with a 3D scene in real-time.

## Features

- **3D Skateboard Customization**: Change grip tape, bolts, trucks, and deck textures.
- **Interactive 3D Scene**: Perform animations like ollies and kickflips.
- **Responsive Design**: Optimized for various screen sizes.
- **Modern Stack**: Built with Vite, React, Three.js, TailwindCSS, and GSAP.

## Tech Stack

- **React**: For building the user interface.
- **Three.js**: For rendering 3D graphics.
- **@react-three/fiber**: React renderer for Three.js.
- **@react-three/drei**: Useful helpers for Three.js.
- **GSAP**: For smooth animations.
- **TailwindCSS**: For styling.
- **Vite**: For fast development and build tooling.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 18 or higher.
- **pnpm**: For managing dependencies.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/suburbia-skate.git
   cd suburbia-skate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

Open your browser and navigate to `http://localhost:5173`.

### Build

To create a production build:

```bash
pnpm build
```

The build output will be in the `dist` directory.

### Preview

To preview the production build:

```bash
pnpm preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── hero/         # Hero section components
│   ├── skateboard/   # Skateboard-related components
├── css/              # Global and utility CSS
├── pages/            # Application pages
├── hooks/            # Custom React hooks
├── constants/        # Shared constants
├── assets/           # Static assets
└── main.tsx          # Application entry point
```

## Customization

### Skateboard Customization

You can customize the skateboard by modifying the default values in `src/components/hero/Hero.tsx`:

```tsx
const DEFAULT_GRIPTAPE_COLOR = "rebeccapurple";
const DEFAULT_BOLT_COLOR = "hotpink";
const DEFAULT_BASEPLATE_COLOR = "cyan";
const DEFAULT_TRUCK_COLOR = "white";
const DEFAULT_DECK_TEXTURE = [
  `${import.meta.env.BASE_URL}skateboard/PinkSwirl.png`,
];
const DEFAULT_WHEEL_TEXTURE = [
  `${import.meta.env.BASE_URL}skateboard/SkateWheel1.png`,
];
```

### Environment HDR

The environment HDR file is located in `public/hdr/warehouse-256.hdr`. Replace it with your own HDR file for a different lighting setup.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Acknowledgments

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [GSAP](https://greensock.com/gsap/)
- [TailwindCSS](https://tailwindcss.com/)
