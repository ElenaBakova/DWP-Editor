import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

export function TopBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Онлайн редактор РПД
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
