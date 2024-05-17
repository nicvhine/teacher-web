import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './custom.scss';

const FirstPage = () => {
  return (
    <div className='top'>   
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'> 
            <div className='container'>
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'><a className='nav-link' href='#'>Contact Us</a></li>
                    <li className='nav-item'><Link className='nav-link' to="/login">Log in</Link></li>
                </ul>
            </div>
        </nav>
        <div className='container'>
            <h1>Welcome to EduTech</h1>
            <p>
                Thank you for visiting! EduTech is a website designed for teachers, providing them with essential tools to manage their classes efficiently. Teachers can create and manage classes, post announcements, and maintain a student list effortlessly.
            </p>
            <p>
                With EduTech, teachers can streamline their workflow, saving time and effort in administrative tasks. Whether it's organizing class schedules, communicating with students, or sharing resources, EduTech empowers teachers to focus on what they do best - educating and inspiring their students.
            </p>
            <p>
                Take a tour of EduTech and discover how it can enhance your teaching experience. Sign up now to unlock the full potential of our platform or contact us for more information.
            </p>
            <Link to="/register">
                {/* Use Bootstrap Button component */}
                <Button variant="primary">Join Now!</Button>
            </Link>
        </div>
    </div>
  );
};

export default FirstPage;
