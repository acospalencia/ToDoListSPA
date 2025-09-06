import React from 'react';

export const Footer = () => {
    return (
        <footer className="text-center py-3 mt-auto text-white fs-5" style={{ backgroundColor: "#572121ff"}}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} ToDoList. All rights reserved.</p>
            </div>
        </footer>
    );
};
