import React from 'react';
import {AppBar, Box, Toolbar, Typography, Container, Button, Divider} from "@mui/material";
import {Link} from "react-router-dom";


export function TopBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" component="div"
                                    sx={{display: {xs: "none", md: "flex"}, marginRight: 3}}>
                            Онлайн редактор РПД
                        </Typography>

                        <Button
                            href={"/"}
                            size="large"
                            sx={{color: "white", display: "inline-block"}}
                        >
                            Проверить
                        </Button>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                        <Button
                            href={"/edit"}
                            size="large"
                            sx={{color: "white", display: "inline-block"}}
                        >
                            Редактировать
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
