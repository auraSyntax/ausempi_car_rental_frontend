# AUSEMPI | Premium Luxury Transportation

![AUSEMPI](https://img.shields.io/badge/AUSEMPI-Luxury%20Transportation-D4AF37?style=for-the-badge&logo=mercedes&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 💎 Overview

**AUSEMPI** is a state-of-the-art web application designed for a premier luxury transportation service. The platform reflects the elegance and exclusivity of the brand, offering High-Net-Worth Individuals (HNWIs) and corporate executives a seamless experience to explore fleet options, services, and book private chauffeur rides.

Built with modern web technologies, the application emphasizes **visual storytelling**, **performance**, and **accessibility**, ensuring a "wow" factor that aligns with the brand's "Pinnacle of Private Luxury" promise.

---

## ✨ Key Features

- **Immersive UX/UI**: A "Dark Mode" luxury aesthetic utilizing a Gold (`#D4AF37`) and Deep Black palette.
- **Dynamic Animations**: Smooth page transitions and scroll interactions powered by `Framer Motion` and `GSAP`.
- **Fleet Showcase**: Interactive gallery and detailed specifications for Executive Sedans and Luxury SUVs.
- **Service Modules**: Dedicated pages for Airport Transfers, Corporate Travel, and Hourly Charters.
- **Driver Portal**: Secure login area for chauffeur management.
- **Responsive Design**: Fully optimized mobile-first layout using `Tailwind CSS`.
- **Performance**: Lazy loading routes and optimized assets for fast Time-to-Interactive.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
  - [Tailwind Merge](https://github.com/dcastil/tailwind-merge) & [CLSX](https://github.com/lukeed/clsx) (Class composition)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) (Headless Primitives)
  - [Lucide React](https://lucide.dev/) (Icons)
- **Animations**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://greensock.com/gsap/)
- **State Management & Data**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router DOM](https://reactrouter.com/en/main)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm** or **bun**

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/krishnarajahkajaruban/ausempi-web.git
    cd ausempi-web
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    bun install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📜 Scripts

| Script            | Description                                   |
| :---------------- | :-------------------------------------------- |
| `npm run dev`     | Starts the development server with HMR.       |
| `npm run build`   | Builds the application for production.        |
| `npm run lint`    | Runs ESLint to check for code quality issues. |
| `npm run preview` | Locally preview the production build.         |

---

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/
│   ├── common/      # Shared utilities (CookieConsent, PageLoader)
│   ├── sections/    # Major page blocks (Hero, Navbar, Footer)
│   └── ui/          # Atomic UI elements (Buttons, Inputs)
├── data/            # Static data files
├── hooks/           # Custom React hooks
├── layouts/         # Page layout wrappers
├── lib/             # Utilities and constants
├── pages/           # Route components (Index, About, Contact)
├── types/           # TypeScript interface definitions
├── App.tsx          # Main application entry & Routing
└── main.tsx         # React DOM rendering
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Proprietary Software. All rights reserved by **AUSEMPI**.
