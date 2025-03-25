# IntelliSphere Assesment

The **Optim Dashboard** is a web application designed to provide an intuitive interface for managing various features such as archived data, products, documents, and user authentication. Built with React, Next.js, and Carbon Design System, the dashboard is responsive, accessible, and easy to use.

---

## Features

### Dashboard
- **Tiles Navigation**: Clickable tiles for navigating to different sections of the application.
- **Theme Support**: Integrated with a global theme context for light/dark mode toggling.
- **Modal Dialogs**: Inform users about features under development.

### Archive Page
- **Data Table**: View and manage archived records.
- **Batch Actions**: Perform actions like delete, save, or archive on multiple records.
  
### Products page
- **Product Overview**: Viewing available products.
  
### Documents page
- **Documents**: Searching documents.
- **Filter Documents**: Fitering documents by dropdown.

### Authentication
- **Login Page**: Secure login form with validation.
- **Register Page**: User registration form with password validation and confirmation.

---

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Next.js**: Framework for server-side rendering and routing.
- **Carbon Design System**: UI components and design language for a consistent and accessible user experience.
- **SCSS**: Styling with modular and reusable CSS.
- **TypeScript**: Strongly typed JavaScript for better code quality and maintainability.

---

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hemanthsaich/Intellisphere-NextJS.git
   cd Intellisphere-NextJS
   ```

2. **Install Dependencies**: Make sure you have Node.js and npm installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Development Server**: Start the development server:
   ```bash
   npm run dev
   ```

4. **Open in Browser**: Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## File Structure

The project is organized as follows:

```plaintext
optim-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── archive/          # Archive management page
│   │   │   ├── page.tsx      # Archive page
│   │   ├── documents/        # Documents management page
│   │   │   ├── page.tsx      # Documents page
│   │   ├── products/         # Products page
│   │   │   ├── page.tsx      # Products overview
│   │   │   ├── product/      # Product page
│   │   │   │   ├── page.tsx  # Single product details
│   ├── login/                # Login page
│   │   ├── page.tsx          # Login form
│   ├── register/             # Register page
│   │   ├── page.tsx          # Registration form
│   ├── ThemeContext.tsx      # Global theme context for light/dark mode
│   ├── globals.scss          # Global styles
├── components/               # Reusable components
│   ├── TextInput.tsx         # Reusable text input component
│   ├── DropDown.tsx          # Dropdown selection component
│   ├── DataTableDoc.tsx      # Table component for document-related data
├── public/                   # Static assets
├── styles/                   # SCSS modules
├── README.md                 # Project documentation
├── package.json              # Project dependencies and scripts
```

---

## Key Pages

### Dashboard Page (app/dashboard/page.tsx)
![localhost_3000_dashboard](https://github.com/user-attachments/assets/a8ec079c-1ac3-43a0-bded-ccbd324af1a2)

- **Tiles**: Clickable tiles for navigation to different sections of the dashboard.
- **Recent Activity**: Displays a structured list of recent activities with their status and date.
- **Modal**: A modal dialog for features under development.


### Archive Page (app/dashboard/archive/page.tsx)
![localhost_3000_dashboard (1)](https://github.com/user-attachments/assets/29f7162e-80b3-4d9c-84b5-d8a7094c8e12)

- **Data Table**: Displays archived records with batch actions for managing them.
- ![localhost_3000_dashboard (2)](https://github.com/user-attachments/assets/e5afff9e-f2c0-450a-b4a7-239113d2cb5d)

- **Modals**: Used for confirming actions like delete, save, or archive.
- ![localhost_3000_dashboard (3)](https://github.com/user-attachments/assets/386eb58f-a27b-49be-a0a2-720833c9f15b)


### Products Page (app/dashboard/products/page.tsx)
- **Products Overview**: Placeholder for viewing available products.
- ![localhost_3000_dashboard_products](https://github.com/user-attachments/assets/4be55893-be8a-4ddc-ac3e-2b4f7042f6df)


### Product Page (app/dashboard/products/product/page.tsx)
- **Product Details**: Display details of a single product.
- ![localhost_3000_dashboard_products (1)](https://github.com/user-attachments/assets/122ef78f-a459-48a6-baa3-30ca8ba90929)


### Login Page (app/login/page.tsx)
- **Login Form**: Secure login form with validation.
- ![localhost_3000_login](https://github.com/user-attachments/assets/2190fe6a-b9a0-47a4-a0b9-885d5921eda0)


### Register Page (app/register/page.tsx)
- **Registration Form**: User registration form with validation for email, password, and password confirmation.
- ![localhost_3000_register](https://github.com/user-attachments/assets/4294f065-291a-4f93-9dca-3e6a23430cac)


---

## Styling

The application uses SCSS for styling, with Carbon Design System's tokens and variables for consistent theming. The global styles are defined in `globals.scss`, and component-specific styles are in their respective SCSS modules.

---

## Usage

### Dashboard Tiles
- **Archive Data**: Navigate to the archive management page.
- **Products**: View available products.
- **Documents**: Manage your documents (feature under development).
- **Overview**: View the system overview (feature under development).

