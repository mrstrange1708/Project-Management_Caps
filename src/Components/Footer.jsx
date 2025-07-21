import React, { useContext } from 'react';
import { Github, Twitter, Linkedin, Send, ArrowRight } from 'lucide-react';
import { TheamContext } from '../App';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { theam } = useContext(TheamContext);

    const footerStyle = `
        w-full p-8 
        ${theam ? 'bg-black/30 text-gray-300' : 'bg-white/50 text-gray-700'}
        backdrop-blur-md border-t 
        ${theam ? 'border-gray-700/50' : 'border-gray-200/50'}
        shadow-lg
    `;

    return (
        <footer className={footerStyle}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Brand and Socials */}
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold mb-2">TaskFlow</h3>
                    <p className={`text-sm mb-4 ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
                        Conquer your day, one task at a time.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-500 transition-colors"><Github /></a>
                        <a href="#" className="hover:text-blue-500 transition-colors"><Twitter /></a>
                        <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</Link></li>
                        <li><Link to="/projects" className="hover:text-blue-500 transition-colors">Projects</Link></li>
                        <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                        <li><Link to="/profile" className="hover:text-blue-500 transition-colors">Profile</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-semibold mb-3">Join Our Newsletter</h4>
                    <p className={`text-sm mb-3 ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
                        Get productivity tips and updates straight to your inbox.
                    </p>
                    <form className="flex">
                        <input 
                            type="email" 
                            placeholder="your.email@example.com"
                            className={`w-full px-4 py-2 rounded-l-md focus:outline-none ${theam ? 'bg-gray-800' : 'bg-gray-100'}`}
                        />
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-colors">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>

            <div className={`mt-8 pt-6 border-t ${theam ? 'border-gray-700' : 'border-gray-200'} text-center text-sm ${theam ? 'text-gray-500' : 'text-gray-600'}`}>
                <p>&copy; {new Date().getFullYear()} TaskFlow. All Rights Reserved. Designed with madness.</p>
            </div>
        </footer>
    );
};

export default Footer; 