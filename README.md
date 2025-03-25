# IntelliSphere Assesment

The **Optim Dashboard** is a web application designed to provide an intuitive interface for managing various features such as archived data, products, documents, and user authentication. Built with React, Next.js, and Carbon Design System, the dashboard is responsive, accessible, and easy to use.

---

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Next.js**: Framework for server-side rendering and routing.
- **Carbon Design System**: UI components and design language for a consistent and accessible user experience.
- **SCSS**: Styling with modular and reusable CSS.
- **TypeScript**: Strongly typed JavaScript for better code quality and maintainability.


## Key Pages

### Dashboard Page (app/dashboard/page.tsx)
![localhost_3000_dashboard](https://github.com/user-attachments/assets/d87521b6-f5cc-4923-8e7c-a8749628eecb)

### Archive Page (app/dashboard/archive/page.tsx)
![localhost_3000_dashboard (1)](https://github.com/user-attachments/assets/e28f1157-78e0-424e-af35-599604ec8167)

- **Data Table**: Displays archived records with batch actions for managing them.
- ![localhost_3000_dashboard (2)](https://github.com/user-attachments/assets/71e5dcc8-1437-4a68-9d4a-ef498713a11d)

- **Modals**: Used for confirming actions like delete, save, or archive.
- ![localhost_3000_dashboard (3)](https://github.com/user-attachments/assets/79af609d-fbb4-40a5-a36e-ba286ee0ec57)



### Products Page (app/dashboard/products/page.tsx)
- **Products Overview**: Placeholder for viewing available products.
- ![localhost_3000_dashboard_products (1)](https://github.com/user-attachments/assets/ef030720-b4ec-409b-8962-abdeeef9278c)


### Product Page (app/dashboard/products/product/page.tsx)
- **Product Details**: Display details of a single product.
- ![localhost_3000_dashboard_products (2)](https://github.com/user-attachments/assets/5835a28d-438e-4557-af0c-a801d0b48a2f)


### Login Page (app/login/page.tsx)
- **Login Form**: Secure login form with validation.
- ![localhost_3000_login](https://github.com/user-attachments/assets/0fa8a8a8-dca4-42f2-ab24-7331374faa28)


### Register Page (app/register/page.tsx)
- **Registration Form**: User registration form with validation for email, password, and password confirmation.
- ![localhost_3000_register](https://github.com/user-attachments/assets/44dd4960-1456-42ab-8780-451a7ddd9d9c)

## Documents Page (`app/dashboard/documents/page.tsx`)

- **Documents Overview:** Displays a structured list of documents with relevant metadata (e.g., name, type, created date).
- **Data Table:** Shows document records with filtering, sorting, and batch actions.
- ![localhost_3000_dashboard_documents](https://github.com/user-attachments/assets/edbeb2d5-a7b5-4c19-8091-715bb5485c40)

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

