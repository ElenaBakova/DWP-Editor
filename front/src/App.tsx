import React from 'react';
import {TopBar} from "./components/TopBar";
import {TextValidationPage} from "./components/TextValidationPage";
import {Grid} from "@mui/material";

function App() {
    return (
        <Grid container direction="column">
            <Grid container item>
                <TopBar/>
            </Grid>

            <Grid item>
                <TextValidationPage/>
            </Grid>
        </Grid>
    );
}

export default App;
