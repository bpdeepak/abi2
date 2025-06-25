## Project Directory Structure
```
./
├── ai_framework/
│   ├── src/
│   │   └── api/
│   │       └── main.py
│   ├── Dockerfile.dev
│   └── requirements.txt
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── test.js
│   │   └── utils/
│   │       └── logger.js
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── data_pipeline/
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── codebase_dump.md
│   ├── Dockerfile.dev
│   ├── eslint.config.js
│   ├── gen_codebase.sh*
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── codebase_dump.md
├── docker-compose.dev.yml
├── gen_codebase.sh*
└── output.txt

17 directories, 39 files
```



### `./ai_framework/src/api/main.py`
```py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World! This is the main entry point of the AI framework."}

```

### `./backend/package.json`
```json
{
  "name": "adaptive-bi-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.0",
    "bcrypt": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}

```

### `./backend/server.js`
```js
const express = require("express");
const connectDB = require("./src/config/database");
const dotenv = require("dotenv");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const testRoutes = require("./src/routes/test");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

```

### `./backend/src/config/database.js`
```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // connection pooling
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

```

### `./backend/src/models/CustomerProfile.js`
```js
// backend/src/models/CustomerProfile.js
const mongoose = require('mongoose');

const customerProfileSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  demographic: {
    age: Number,
    gender: String,
    income_level: String,
    location: {
      country: String,
      state: String,
      city: String
    }
  },
  behavior: {
    total_orders: Number,
    total_spent: Number,
    average_order_value: Number,
    last_purchase_date: Date,
    purchase_frequency: Number,
    preferred_categories: [String],
    preferred_payment_method: String,
    device_preference: String
  },
  engagement: {
    email_open_rate: Number,
    click_through_rate: Number,
    social_media_engagement: Number,
    customer_service_interactions: Number
  },
  lifecycle: {
    acquisition_date: Date,
    lifecycle_stage: String,
    churn_probability: Number,
    lifetime_value: Number,
    predicted_next_purchase: Date
  },
  preferences: {
    communication_preferences: [String],
    product_interests: [String],
    price_sensitivity: String
  }
}, { timestamps: true });

customerProfileSchema.index({ user_id: 1 }, { unique: true });
customerProfileSchema.index({ "lifecycle.lifecycle_stage": 1 });
customerProfileSchema.index({ "lifecycle.churn_probability": -1 });

module.exports = mongoose.model("CustomerProfile", customerProfileSchema);

```

### `./backend/src/models/Product.js`
```js
// backend/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  name: String,
  description: String,
  category: String,
  subcategory: String,
  brand: String,
  price: Number,
  cost: Number,
  stock_level: Number,
  reorder_point: Number,
  supplier_id: String,
  attributes: {
    color: String,
    size: String,
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    }
  },
  images: [String],
  ratings: {
    average: Number,
    count: Number
  },
  tags: [String],
  is_active: Boolean
}, { timestamps: true });

productSchema.index({ product_id: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ is_active: 1 });
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);

```

### `./backend/src/models/Transaction.js`
```js
// backend/src/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, unique: true },
  user_id: String,
  product_id: String,
  product_name: String,
  category: String,
  subcategory: String,
  quantity: Number,
  unit_price: Number,
  total_amount: Number,
  discount_amount: Number,
  payment_method: String,
  transaction_status: String,
  timestamp: Date,
  session_id: String,
  device_type: String,
  location: {
    country: String,
    state: String,
    city: String,
    zipcode: String
  },
  marketing_source: String
}, { timestamps: true });

transactionSchema.index({ transaction_id: 1 }, { unique: true });
transactionSchema.index({ user_id: 1 });
transactionSchema.index({ product_id: 1 });
transactionSchema.index({ timestamp: -1 });
transactionSchema.index({ category: 1 });
transactionSchema.index({ transaction_status: 1 });
transactionSchema.index({ timestamp: -1, category: 1 });
transactionSchema.index({ user_id: 1, timestamp: -1 });

module.exports = mongoose.model("Transaction", transactionSchema);


```

### `./backend/src/models/User.js`
```js
// backend/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password_hash: String,
  first_name: String,
  last_name: String,
  role: { type: String, enum: ["admin", "analyst", "manager"] },
  registration_date: { type: Date, default: Date.now },
  last_login: Date,
  preferences: {
    dashboard_layout: String,
    notification_settings: Object,
    theme: { type: String, enum: ["light", "dark"] }
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ user_id: 1 }, { unique: true });
userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
```

### `./backend/src/routes/auth.js`
```js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, msg: "Email already in use" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      user_id: `user_${Date.now()}`,
      email,
      password_hash: hashed,
      first_name,
      last_name,
      role,
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ success: false, msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;

```

### `./backend/src/routes/test.js`
```js
const express = require("express");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;

```

### `./backend/src/utils/logger.js`
```js

```

### `./frontend/codebase_dump.md`
```md
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


```

### `./frontend/eslint.config.js`
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

### `./frontend/gen_codebase.sh`
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

### `./frontend/index.html`
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

### `./frontend/package.json`
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

### `./frontend/README.md`
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

### `./frontend/src/App.css`
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

### `./frontend/src/App.tsx`
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

### `./frontend/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### `./frontend/src/main.tsx`
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

### `./frontend/src/pages/Login.tsx`
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

### `./frontend/src/pages/Register.tsx`
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

### `./frontend/src/services/api.ts`
```ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default API;

```

### `./frontend/src/store/authStore.ts`
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

### `./frontend/src/vite-env.d.ts`
```ts
/// <reference types="vite/client" />

```

### `./frontend/tailwind.config.js`
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

```

### `./frontend/tsconfig.app.json`
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

### `./frontend/tsconfig.json`
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

### `./frontend/tsconfig.node.json`
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

### `./frontend/vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

### `./frontend/.vite/deps/_metadata.json`
```json
{
  "hash": "769eea7e",
  "configHash": "8a752238",
  "lockfileHash": "e1876b6b",
  "browserHash": "519147da",
  "optimized": {},
  "chunks": {}
}
```

### `./frontend/.vite/deps/package.json`
```json
{
  "type": "module"
}

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

