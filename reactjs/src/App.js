import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Main from "./pages/Main";
import Layout from "./components/Header/Header";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import PrivateRouter from "./utils/PrivateRouter";
import FoundPet from "./components/Pets/Founder/FoundPet";
import LostPet from "./components/Pets/Lost/LostPet";
import CreateFoundPet from "./components/Pets/Founder/CreateFoundPet";
import CreateLostPet from "./components/Pets/Lost/CreateLostPet";
import EditRequestFound from "./components/Profile/Request/EditRequestFound";
import EditRequestLost from "./components/Profile/Request/EditRequestLost";
import FounderListPage from "./pages/FounderListPage";
import LostListPage from "./pages/LostListPage";
import MyFoundRequestPage from "./pages/MyFoundPage";
import MyLostRequestPage from "./pages/MyLostPage";

function App() {

  return (
    <div className="wrapper">

        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route element={<PrivateRouter/>}>
                    <Route index element={<Main/>} />
                    <Route path="found_pets/:id" element={<FoundPet/>} />
                    <Route path="lost_pets/:id" element={<LostPet/>} />
                </Route>
                <Route path='finder_pet' element={<CreateFoundPet/>}/>
                <Route path="lost_pets"  element={<LostListPage/>}/>
                <Route path="finder_pets"  element={<FounderListPage/>}/>
                <Route path="lost_pet" element={<CreateLostPet/>}/>
                <Route path="registration"  element={<RegistrationPage/>}/>
                <Route path="login"  element={<LoginPage/>}/>
                <Route path='my_lost' element={<MyLostRequestPage/>}/>
                <Route path='my_found' element={<MyFoundRequestPage/>}/>
                <Route path="edit_found/:id" element={<EditRequestFound/>}/>
                <Route path="edit_lost/:id" element={<EditRequestLost/>}/>


            </Route>
        </Routes>


    </div>
  );
}

export default App;