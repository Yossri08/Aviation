import React from 'react';
import SidebarItem from "./Sidebaritem";
import items from "../data/sidebar.json";
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();

    // Vérifier l'authentification
    const isAuthenticated = !!localStorage.getItem('access_token'); // Vérifie si le token est présent

    // Créer une copie des items de la sidebar
    const sidebarItems = [...items]; // Copie des items pour éviter la mutation

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Supprime le access_token
        navigate('/connecter'); // Redirige vers la page de connexion
    };

    // Ajouter l'élément "Logout" si l'utilisateur est authentifié
    if (isAuthenticated) {
        sidebarItems.push({
            title: "Déconnexion",
            icon: "bi bi-box-arrow-right",
            onClick: handleLogout // Ajoute un gestionnaire de clic
        });
        console.log("Authenticated:", isAuthenticated);
    }

    return (
        <div className="sidebar">
            {sidebarItems.map((item, index) => (
                <div key={index}>
                    {item.onClick ? (
                        // Si l'item a un gestionnaire de clic, on le rend comme un élément cliquable
                        <span className='sidebar-item plain' onClick={item.onClick}>
                            {item.icon && <i className={item.icon}></i>}
                            {item.title}
                        </span>
                    ) : (
                        // Sinon, on utilise le composant SidebarItem
                        <SidebarItem item={item} />
                    )}
                </div>
            ))}
        </div>
    );
}
