import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Url";
import './Navigation.css'; // Import CSS file for styling
import Sidebar from "../ClassesDashboard/Dashboard";

const Settings = () => {
    return (
        <div>
            <nav className="side-navbar">
               <Sidebar/>
            </nav>
        </div>
    );
}

export default Settings;
