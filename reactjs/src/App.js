import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SearchAppBar from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Layout from "./components/Header/Header";
import LoginPage from "./pages/registration/LoginForm";
import RegistrationPage from "./pages/registration/Registration";
import PrivateRouter from "./utils/PrivateRouter";
import Founder from "./components/List/Founder";
import Lost from "./components/List/Lost";
import FoundPet from "./components/Pets/Founder/FoundPet";
import LostPet from "./components/Pets/Lost/LostPet";
import CreateFoundPet from "./components/Pets/Founder/CreateFoundPet";
import CreateLostPet from "./components/Pets/Lost/CreateLostPet";
import Found from "./components/Profile/Request/List/MyFound";
import MyLostRequest from "./components/Profile/Request/List/MyLost";
import MyFoundRequest from "./components/Profile/Request/List/MyFound";
import EditRequest from "./components/Profile/Request/EditRequestFound";
import EditRequestFound from "./components/Profile/Request/EditRequestFound";
import EditRequestLost from "./components/Profile/Request/EditRequestLost";

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
                <Route path="lost_pets"  element={<Lost/>}/>
                <Route path="finder_pets"  element={<Founder/>}/>
                <Route path="lost_pet" element={<CreateLostPet/>}/>
                <Route path="registration"  element={<RegistrationPage/>}/>
                <Route path="login"  element={<LoginPage/>}/>


                <Route path='my_lost' element={<MyLostRequest/>}/>

                <Route path='my_found' element={<MyFoundRequest/>}/>

                <Route path="edit_found/:id" element={<EditRequestFound/>}/>
                <Route path="edit_lost/:id" element={<EditRequestLost/>}/>


            </Route>
        </Routes>


    </div>
  );
}

export default App;