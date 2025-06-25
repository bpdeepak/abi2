## Project Directory Structure
```
./
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── pages/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── codebase_dump.md
├── Dockerfile.dev
├── eslint.config.js
├── gen_codebase.sh*
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

7 directories, 24 files
```



### `./eslint.config.js`
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

### `./gen_codebase.sh`
```sh
#!/bin/bash

# Ask user for output format
echo "Choose output format (md/pdf/docx): "
read -r FORMAT
FORMAT=$(echo "$FORMAT" | tr '[:upper:]' '[:lower:]')  # lowercase

if [[ "$FORMAT" != "md" && "$FORMAT" != "pdf" && "$FORMAT" != "docx" ]]; then
  echo "Invalid format. Please choose md, pdf, or docx."
  exit 1
fi

OUTPUT="codebase_dump.md"

# Clear output file
> "$OUTPUT"

# Add directory tree (excluding __pycache__ and venv)
echo "## Project Directory Structure" >> "$OUTPUT"
echo '```' >> "$OUTPUT"
tree -F --dirsfirst -I '__pycache__|venv|models|node_modules' >> "$OUTPUT"
echo '```' >> "$OUTPUT"
echo -e "\n\n" >> "$OUTPUT"

# File extensions to include
EXTENSIONS="js|ts|tsx|py|css|html|json|sh|Dockerfile|md"

# Use find with pruning to exclude specific directories
find . -type d \( -name '__pycache__' -o -name 'venv' -o -name '.git' -o -name 'dist' -o -name 'build' -o -name 'ai_framework/models' -o -name 'node_modules' \) -prune -o -type f -print \
  | grep -Ev 'package-lock.json' \
  | grep -E "\.($EXTENSIONS)$|Dockerfile$" \
  | sort \
  | while read -r file; do
    # Skip the output file to avoid self-inclusion
    if [[ "$file" == "./$OUTPUT" ]]; then
      continue
    fi

    echo "### \`$file\`" >> "$OUTPUT"
    echo '```'$(basename "$file" | awk -F. '{print $NF}') >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo -e '\n```\n' >> "$OUTPUT"
done

echo "✅ Markdown file created: $OUTPUT"

# Convert if needed
if [[ "$FORMAT" == "pdf" || "$FORMAT" == "docx" ]]; then
  # Check if pandoc is installed
  if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed. Please install pandoc to convert to $FORMAT."
    exit 1
  fi

  OUTFILE="codebase_dump.$FORMAT"
  echo "Converting to $OUTFILE..."

  if [[ "$FORMAT" == "pdf" ]]; then
    pandoc "$OUTPUT" -o "$OUTFILE" --highlight-style=tango
  else
    pandoc "$OUTPUT" -o "$OUTFILE"
  fi

  echo "✅ File created: $OUTFILE"
fi
```

### `./index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### `./package.json`
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.10.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^6.30.1",
    "zustand": "^5.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.29.0",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@types/react-router-dom": "^5.3.3",
    "@vitejs/plugin-react": "^4.5.2",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.29.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.2.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.10",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.34.1",
    "vite": "^7.0.0"
  }
}
```

### `./README.md`
```md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

### `./src/App.css`
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

### `./src/App.tsx`
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1 className="text-center mt-20 text-3xl">Home Page (Protect this)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

### `./src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### `./src/main.tsx`
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

### `./src/pages/Login.tsx`
```tsx
import { useState } from 'react';
import API from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const setToken = useAuthStore((s) => s.setToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" placeholder="Password" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}

```

### `./src/pages/Register.tsx`
```tsx
import { useState } from 'react';
import API from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        email,
        password,
        first_name,
        last_name,
        role: 'analyst',
      });
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input value={first_name} onChange={(e) => setFirstName(e.target.value)} className="border p-2 w-full" placeholder="First Name" />
      <input value={last_name} onChange={(e) => setLastName(e.target.value)} className="border p-2 w-full" placeholder="Last Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" placeholder="Password" />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}

```

### `./src/services/api.ts`
```ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default API;

```

### `./src/store/authStore.ts`
```ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

```

### `./src/vite-env.d.ts`
```ts
/// <reference types="vite/client" />

```

### `./tailwind.config.js`
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

```

### `./tsconfig.app.json`
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

### `./tsconfig.json`
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

### `./tsconfig.node.json`
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

### `./vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

