import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layout/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { EditUser } from "./pages/Admin-Update";
import { AdminContacts } from "./pages/Admin-Contacts";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id/edit" element={<EditUser />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;