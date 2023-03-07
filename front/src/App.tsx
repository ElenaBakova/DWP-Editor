import React from 'react';
import {TopBar} from "./components/TopBar";
import {TextValidationPage} from "./components/TextValidationPage";
import {EditPage} from "./components/EditPage";
import {Grid} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Grid container direction="column">
            <Grid container item>
                <TopBar/>
            </Grid>

            {/*<Grid item>
                <TextValidationPage/>
            </Grid>*/}
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
