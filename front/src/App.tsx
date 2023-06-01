import React from 'react';
import {Grid} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TopBar} from "./components/TopBar";
import {TextValidationPage} from "./components/TextValidationPage";
import {EditPage} from "./components/EditPage";

function App() {
    return (
        <Grid container direction="column">
            <Grid container item>
                <TopBar/>
            </Grid>

            <Router>
                <Routes>
                    <Route path="/edit" element={<EditPage/>}/>
                    <Route path="/" element={<TextValidationPage/>}/>
                </Routes>
            </Router>
        </Grid>
    );
}

export default App;
