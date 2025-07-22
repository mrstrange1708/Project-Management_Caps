# 🧠 TaskFlow – Project Management Tool

**TaskFlow** is a React-based project management tool designed to help users track tasks, manage projects, and schedule activities with an intuitive calendar interface. This tool is built with modern web technologies and includes protected routing, persistent user sessions, and a clean dashboard interface.

---

## 🚀 Features

* 🔐 **Authentication** (Login & Register)
* 🧑‍💼 **User Session Persistence** with `Database`
* 📊 **Dashboard** overview of tasks/projects
* 🗕️ **Calendar View** for scheduling and planning
* 🗂️ **Projects Page** to manage multiple projects
* 🎯 **Private Routing** to protect sensitive pages
* 🌓 **Theme Toggle** via Context API
* 🌐 **Responsive Layout** using Flexbox
* 🍞 **Toast Notifications** with `react-toastify`

---

## 👨‍💪 Tech Stack

| Tech               | Purpose                         |
| ------------------ | ------------------------------- |
| React              | Frontend framework              |
| React Router       | Client-side routing             |
| React Context      | State management (User/Theme)   |
| Toastify           | User notifications              |
| Tailwind CSS / CSS | UI styling (depending on setup) |

---

## 🦾 Folder Structure

```
src/
├── Components/        # Navbar, Sidebar, etc.
├── Pages/             # Dashboard, Projects, Calendar, Login, Register
├── App.jsx            # App setup with Router and Contexts
├── index.js           # Entry point
```

---

## 🔄 Routing Overview

```jsx
<Route path="/" element={<Login />} />
<Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
<Route path="/calender" element={<PrivateRoute><Calender /></PrivateRoute>} />
<Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
<Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
<Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
```

---

## 🔐 Private Route Logic

```jsx
const PrivateRoute = ({ children }) => {
  const { userdata } = useContext(userContext);
  return userdata?.displayName ? children : <Navigate to="/" />;
};
```

---

## 🛆 Installation

```bash
https://github.com/mrstrange1708/Project-Management_Caps.git
cd Project-Management_Caps
npm i
npm start
```

---

## 🤛️ Author

Made with ❤️ by Mr. Strange
[LinkedIn](https://www.linkedin.com/in/shaik-mohammed-junaid-sami-20885430b/) • [GitHub](https://github.com/mrstranger1708)

---

## 📜 License

This project is licensed under the MIT License.
