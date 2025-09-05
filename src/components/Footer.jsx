import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-dark text-center py-3 mt-auto text-white fs-5">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} ToDoList. All rights reserved.</p>
            </div>
        </footer>
    );
};
