import React from 'react';
import {AppBar, Box, Toolbar, Typography, Container, Button, Divider} from "@mui/material";

export function TopBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Typography variant="h6" component="div" sx={{display: {xs: "none", md: "flex"}, marginRight: 3}}>
                            Онлайн редактор РПД
                        </Typography>

                        {/*<Box sx={{flexGrow: 1}}>*/}
                        <Button
                            // onClick={handleCloseNavMenu}
                            size="large"
                            sx={{color: "white", display: "inline-block", alignSelf:"center"}}
                        >
                            {'Проверить'}
                        </Button>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Button
                            // onClick={handleCloseNavMenu}
                            size="large"
                            sx={{color: "white", display: "inline-block"}}
                        >
                            {'Редактировать'}
                        </Button>
                        {/*</Box>*/}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
