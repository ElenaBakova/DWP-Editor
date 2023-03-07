import React from 'react';
import {TopBar} from "./components/TopBar";
import {TextValidationPage} from "./components/TextValidationPage";
import {Grid, Switch} from "@mui/material";
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <Grid container direction="column">
            {/*<Grid container item>
                <TopBar/>
            </Grid>

            <Grid item>
                <TextValidationPage/>
            </Grid>*/}
            <Routes>
                <TopBar/>
                    <Route path="/" element={<TextValidationPage/>} />
            </Routes>
        </Grid>
    );
}

export default App;
