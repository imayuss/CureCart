# Contributing to CureCart 🏥✨

First off, thank you for considering contributing to CureCart! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

Whether you're fixing a bug, adding a new feature, or improving documentation, all contributions are highly appreciated! 

## 🚀 Getting Started Locally

To get the project running on your local machine, follow these steps:

### 1. Fork and Clone
Fork the repository to your own GitHub account, then clone it to your local machine:
```bash
git clone https://github.com/<your-username>/CureCart.git
cd CureCart
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Setup Environment Variables
We have provided an example environment file. Copy it to create your local `.env` file:
```bash
cp .env.example .env
```
Open `.env` and fill in the required keys. (If you're just working on UI components, you might not need all API keys to be fully functional, but a local database is required).

### 4. Setup the Database (Prisma)
Initialize the Prisma schema and sync it with your local database:
```bash
npx prisma generate
npx prisma db push
```
*(Optional)* If you want to seed the database with initial data:
```bash
npm run prisma:seed
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app!

---

## 🛠️ How to Contribute

### Finding an Issue
If you're looking for something to work on, check out the [Issues](https://github.com/Princeag1310/CureCart/issues) tab. 
- Look for issues labeled `good first issue` or `help wanted`.
- If you find an issue you'd like to tackle, comment on it so we can assign it to you (this prevents duplicate work).

### Making a Pull Request (PR)
1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```
2. **Make your changes** in the codebase.
3. **Test your changes** to ensure nothing is broken. If you added new UI components, verify they look good on both desktop and mobile.
4. **Commit your changes** with a clear and descriptive commit message:
   ```bash
   git commit -m "feat: added loading spinner to checkout button"
   ```
5. **Push to your fork**:
   ```bash
   git push origin your-branch-name
   ```
6. **Open a Pull Request** against the `main` branch of this repository. Please provide a clear description of what you changed in the PR template.

## 📝 Code Guidelines
- **TypeScript:** We use strict TypeScript. Please ensure your code has proper types and avoids using `any` wherever possible.
- **Styling:** We use Tailwind CSS. Please utilize existing utility classes and our defined design system.
- **Components:** Keep React components small, reusable, and modular.

## 💬 Need Help?
If you get stuck or have questions about how to implement something, feel free to ask in the issue thread! We are happy to help guide you.

Thank you for contributing! 🚀
