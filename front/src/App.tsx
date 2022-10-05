import React from 'react';
import {TopBar} from "./components/TopBar";
import {TextValidationPage} from "./components/TextValidationPage";
import {Box, Grid} from "@mui/material";

function App() {
    return (
        <div className="container mx-auto p-4 flex justify-center">
            <TopBar/>
            <Box sx={{
                display: 'flex',
                m: 10,
                p: 2,
                justifyContent: 'center',
                width: 'fit-content',
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
                border: '2px dashed grey'
            }}
            >
                <TextValidationPage/>
            </Box>
        </div>
    );
}

export default App;
