# 📊 Admin Dashboard

A modern, responsive admin dashboard built with **React, TypeScript, Material UI, Tailwind CSS, and Supabase**.

The application provides a complete dashboard experience with authentication, role-based access, CRUD operations, analytics, data visualization, calendar management, responsive layouts, and light/dark mode.

---

## 🚀 Live Demo

🔗 **Live Demo:** `YOUR_LIVE_DEMO_URL`

---

## 🔐 Demo Access

You can explore the dashboard using the demo administrator account:

**Email:** `demo@admin.com`
**Password:** `Demo1234`

> This account is provided for demonstration purposes only.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* Supabase Authentication
* Session management
* Protected routes
* Role-based access

### 👥 Team & Contact Management

* Manage users and contacts
* Create, update, and delete records
* Search and data management
* Responsive data tables
* Role-based actions

### 🧾 Invoice Management

* Display invoice records
* Add and edit invoices
* Invoice categorization
* Dynamic data management

### 📊 Dashboard & Analytics

* Revenue statistics
* Invoice and transaction information
* Dynamic data visualization
* Geographic data visualization
* Recent transaction overview

### 📈 Data Visualization

* Bar Chart
* Line Chart
* Pie Chart
* Geographic / Choropleth Map

### 📅 Calendar

* Monthly calendar view
* Weekly and daily views
* List view
* Event interaction
* Event creation and deletion

### 🎨 UI & UX

* Responsive design
* Light / Dark mode
* Material UI components
* Tailwind CSS utilities
* Responsive sidebar
* Searchable navigation
* Modern dashboard layout

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **TypeScript**
* **React Router**
* **Material UI (MUI)**
* **Tailwind CSS**

### Backend & Database

* **Supabase**
* **Supabase Auth**
* **PostgreSQL**

### Libraries

* **ApexCharts**
* **FullCalendar**
* **Formik**
* **Yup**
* **MUI Data Grid**

---

## 🏗️ Architecture

The project is structured around reusable React components, custom hooks, contexts, pages, and Supabase services.

```text
src/
├── component/       # Reusable UI components
├── context/         # React contexts
├── hooks/           # Custom React hooks
├── global/          # Global layout components
├── pages/           # Application pages
├── supabase/        # Supabase configuration
├── theme/           # Theme and color configuration
└── App.tsx          # Application routing
```

The application uses an authentication context to manage the current session and user role, while reusable hooks are used for Supabase CRUD operations.

---

## 📁 Main Pages

| Page       | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| Dashboard  | Overview, statistics, charts, transactions, and geographic data |
| Team       | Team/user management                                            |
| Contacts   | Contact management and CRUD operations                          |
| Invoices   | Invoice management                                              |
| Form       | Profile/data form                                               |
| Calendar   | Interactive calendar                                            |
| FAQ        | Frequently asked questions                                      |
| Bar Chart  | Bar chart visualization                                         |
| Pie Chart  | Pie chart visualization                                         |
| Line Chart | Line chart visualization                                        |
| Geography  | Geographic data visualization                                   |

---

## 🎨 Styling Approach

The project uses both **Material UI** and **Tailwind CSS**, with each technology serving a different purpose.

* **Material UI** is mainly used for reusable UI components, data tables, dialogs, inputs, buttons, icons, and theming.
* **Tailwind CSS** is used for utility-based styling, layout, spacing, and responsive behavior.

This combination allows the application to use ready-made accessible components while keeping page layouts flexible and responsive.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamedbasemdev/Admin-Dashboard.git
```

### 2. Navigate to the project directory

```bash
cd YOUR_REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## 🗄️ Supabase

The project uses Supabase for:

* Authentication
* PostgreSQL database
* User profiles
* Contacts
* Invoices
* Dashboard data

The frontend communicates with Supabase through the Supabase JavaScript client.

---

## 📸 Screenshots

### Dashboard

<img width="1366" height="874" alt="screencapture-localhost-5173-2026-08-31-23_02_28" src="https://github.com/user-attachments/assets/ea4eac1d-212f-4e25-adca-7e13682c7cba" />

<img width="1366" height="874" alt="screencapture-localhost-5173-2026-08-31-23_05_05" src="https://github.com/user-attachments/assets/38162ba5-4b8b-48fa-bde3-6fba6fbd5d28" />


### Team

<img width="1366" height="815" alt="screencapture-localhost-5173-team-2026-08-31-23_03_33" src="https://github.com/user-attachments/assets/aa5282c3-bd77-445b-8199-4e09cef559ea" />

### Invoices

<img width="1366" height="815" alt="screencapture-localhost-5173-invoices-2026-08-31-23_03_56" src="https://github.com/user-attachments/assets/d55a532e-53c4-4753-97c0-334bc027cee1" />

### Calendar

<img width="1366" height="815" alt="screencapture-localhost-5173-calendar-2026-08-31-23_04_16" src="https://github.com/user-attachments/assets/51e1ffa9-8829-41d0-a911-74de1682c05e" />


### Authentication

<img width="1366" height="687" alt="screencapture-localhost-5173-register-2026-08-31-23_04_47" src="https://github.com/user-attachments/assets/f3720e04-aede-4008-b71c-6b8059e1e165" />


---

## 📱 Responsive Design

The dashboard is designed to provide a responsive experience across:

* Desktop
* Tablet
* Mobile

The layout, sidebar, forms, tables, and dashboard sections adapt to different screen sizes.

---

## 🎯 Project Goals

This project was built to practice and demonstrate:

* React component architecture
* TypeScript development
* Reusable components
* Custom React hooks
* Authentication and protected routes
* Role-based access
* CRUD operations
* Supabase integration
* Data visualization
* Responsive UI development
* Theme management
* Form handling and validation

---

## 🔮 Future Improvements

* Add automated unit and integration tests
* Improve server-state management with TanStack Query
* Implement stronger database-level authorization using Supabase Row Level Security (RLS)
* Persist calendar events in the database
* Improve global error handling and notifications
* Add pagination and advanced filtering
* Improve accessibility across the application
* Add CI/CD workflow

---

## 👨‍💻 Author

**Mohamed Basem**

* GitHub: `https://github.com/mohamedbasemdevE`
---

## 📄 License

This project was created for **educational and portfolio purposes**.
