import React from 'react'
import {DropZone} from "./DropZone";
import Button from "@mui/material/Button";
import {Box, Divider, Grid, List, ListItem, ListItemText, Typography} from "@mui/material";

const AcceptedFileType = {Doc: '.docx'};

type ErrorsData = {
    message: string;
    section: string;
};

interface IErrorsState {
    errors: ErrorsData[];
    clicked: boolean;
    isOk: boolean;
}

export const TextValidationPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [isFileDropped, setIsFileDropped] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])

    const [errorsState, setErrorsState] = React.useState<IErrorsState>({
        errors: [],
        clicked: false,
        isOk: false
    })

    const fileRef = React.useRef<HTMLInputElement>(null);

    // File formats that can be uploaded
    const acceptedFormats = AcceptedFileType.Doc;

    const handleFileSelect = (event: any) => {
        const file = event?.target?.files?.[0];
        file ? setFiles([file]) : setFiles(files);
    }

    const handleClick = async () => {
        if (!files || files.length < 1) {
            return
        }
        const formData = new FormData();
        formData.append(files[0].name.toString(), files[0]);

        await fetch("http://localhost:5098", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                return response;
            })
            .then(
                (response) => {
                    response.json().then((data: ErrorsData[]) => {
                        setErrorsState({
                            errors: data,
                            isOk: true,
                            clicked: true
                        })
                    })
                },
                (error) => {
                    setErrorsState({
                        errors: [],
                        isOk: false,
                        clicked: true
                    })
                }
            );
    }

    const onDragStateChange = (dragActive: boolean) => {
        setIsDropActive(dragActive)
    }

    const onFilesDrop = (file: File[]) => {
        setFiles(file)
        setIsFileDropped(true)
    }

    const renderErrors = (notifications: ErrorsData[]) => {
        return (
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'aliceblue',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    padding: 2,
                    margin: 1,
                    marginBottom: 10,
                    marginTop: 0
                    //'& ul': { padding: 4, margin: 10, marginTop: 0 },
                }}
            >
                {notifications.map((item, index) =>
                    <div key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={item.message}>
                            </ListItemText>
                        </ListItem>
                        <Divider variant="middle"/>
                    </div>
                )}
            </List>
        )
    }

    return (
        <Box>
            <Grid container direction="column" sx={{
                m: 10,
                p: 3,
                width: 'fit-content',
                border: '2px dashed grey'
            }}
            >
                <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                    <Typography align={"center"} variant={"h5"}
                                style={{fontWeight: 600, margin: '15px', marginBottom: '0px'}}>
                        Перетащите файл сюда
                    </Typography>
                    {/*<div>
                        <span>{files.length > 0 ? files[0].name : ""}</span>{' '}
                    </div>*/}
                </DropZone>
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none', fontSize: 'medium', margin: '15px'}}
                >
                    или нажмите для загрузки
                    <input ref={fileRef} hidden type="file" accept={acceptedFormats} onChange={handleFileSelect}/>
                </Button>

                {files.length > 0 &&
                    <Button
                        variant="contained"
                        component="label"
                        style={{textTransform: 'none', fontSize: 'medium', margin: '15px', marginTop: '0px'}}
                        onClick={handleClick}>
                        Загрузить
                    </Button>
                }
                {files.length == 0 && isFileDropped &&
                    <Typography align={"center"} color="red">Неверный тип файла</Typography>
                }
            </Grid>

            {errorsState.clicked && !errorsState.isOk &&
                <Typography align={"center"} color="red">Возникла ошибка при обработке файла</Typography>
            }

            {errorsState.clicked && errorsState.isOk && renderErrors(errorsState.errors)}
        </Box>
    )
})

TextValidationPage.displayName = 'App'