import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SidebarItem({ item }) {
    const [open, setOpen] = useState(localStorage.getItem('navbarOpen'));
    const navigate = useNavigate();

    // Fonction de gestion du toggle
    const handleToggle = () => {
        localStorage.setItem(
            'navbarOpen',
            localStorage.getItem('navbarOpen') === 'true' ? 'false' : 'true'
        );
        setOpen(localStorage.getItem('navbarOpen'));
    };

    // Vérifier si c'est l'élément de logout et l'afficher correctement
    if (item.title === 'Logout') {
        return (
            <div className="sidebar-item plain" onClick={item.onClick} style={{ cursor: 'pointer' }}>
                {item.icon && <i className={item.icon}></i>}
                {item.title}
            </div>
        );
    }

    if (item.childrens) {
        return (
            <div className={open === 'true' ? 'sidebar-item open' : 'sidebar-item'}>
                <div className="sidebar-title">
                    <span>
                        {item.icon && <i className={item.icon}></i>}
                        {item.title}
                    </span>
                    <i className="bi bi-chevron-down toggle-btn" onClick={handleToggle}></i>
                </div>

                <div className="sidebar-content">
                    {item.childrens.map((child, index) => (
                        <SidebarItem key={index} item={child} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <a href={item.path || '#'} className="sidebar-item plain">
                {item.icon && <i className={item.icon}></i>}
                {item.title}
            </a>
        );
    }
}
