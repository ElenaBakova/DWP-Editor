import React from 'react'
import {DropZone} from "./DropZone";
import Button from "@mui/material/Button";
import {Collapse, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const AcceptedFileType = {Doc: '.docx'};

// One error message
type ErrorsData = {
    // Error message to display
    message: string;

    // Section in file
    section: string;
};

interface IErrorsState {
    // Array with error messages for each file
    errors: ErrorsData[][];

    // Whether the check button was clicked
    clicked: boolean;

    // False if errors occurred while checking files
    isOk: boolean;
}

export const TextValidationPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [isFileDropped, setIsFileDropped] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const [open, setOpen] = React.useState<Number[]>([])

    const [errorsState, setErrorsState] = React.useState<IErrorsState>({
        errors: [],
        clicked: false,
        isOk: true
    })

    const fileRef = React.useRef<HTMLInputElement>(null);

    // File formats that can be uploaded
    const acceptedFormats = AcceptedFileType.Doc;

    const handleFileSelect = (event: any) => {
        const file = event?.target?.files;
        if (file != undefined) {
            setFiles(file);
        }
    }

    const handleClick = async () => {
        if (!files || files.length < 1) {
            return
        }
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append(file.name.toString(), file));

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
                    response.json().then((data: ErrorsData[][]) => {
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

    const renderErrors = (errorsData: ErrorsData[]) => {
        return (
            <List
                sx={{
                    bgcolor: 'aliceblue',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    width: 700,
                    padding: 2,
                    margin: 3,
                    marginTop: 0,
                    word_break: 'break-all',
                }}
            >
                {errorsData.map((item, index) =>
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

    const handleCollapse = (clickedIndex: Number) => {
        if (open.includes(clickedIndex)) {
            const openCopy = open.filter((element) => {
                return element !== clickedIndex
            });
            setOpen(openCopy);
        } else {
            const openCopy = [...open];
            openCopy.push(clickedIndex);
            setOpen(openCopy);
        }
    }

    const renderList = (errorsData: ErrorsData[][]) => {
        return (
            <List
                sx={{
                    bgcolor: 'aliceblue',
                    position: 'relative',
                    padding: 2,
                    margin: 3,
                    marginTop: 0,
                    word_break: 'break-all',
                }}
            >
                {errorsData.map((errorsList, index) =>
                    <div key={index}>
                        <ListItemButton onClick={() => handleCollapse(index)}>
                            <ListItemText primary={files[index].name}
                                          secondary={(`Ошибок найдено: ${errorsList.length}`)}/>
                            {errorsList.length > 0 && (open.includes(index) ? <ExpandLess/> : <ExpandMore/>)}
                        </ListItemButton>
                        <Collapse in={open.includes(index)} timeout="auto" unmountOnExit>
                            {errorsList.length > 0 && renderErrors(errorsList)}
                        </Collapse>
                        <Divider variant="middle"/>
                    </div>
                )}
            </List>
        );
    }

    return (
        <Grid container direction="column" sx={{alignItems: 'center'}}>
            <Grid container item direction="column" sx={{
                m: 7,
                mb: 3,
                p: 3,
                width: 'fit-content',
                height: 'fit-content',
                border: '2px dashed grey'
            }}
            >
                <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                    <Typography align={"center"} variant={"h5"}
                                style={{fontWeight: 600, margin: '15px', marginBottom: '0px'}}>
                        Перетащите файлы сюда
                    </Typography>
                </DropZone>
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none', fontSize: 'medium', margin: '15px'}}
                >
                    или нажмите для загрузки
                    <input ref={fileRef} type={"file"} accept={acceptedFormats} onChange={handleFileSelect} hidden
                           multiple/>
                </Button>

                {files.length > 0 &&
                    <Button
                        variant="contained"
                        component="label"
                        style={{textTransform: 'none', fontSize: 'medium', margin: '15px', marginTop: '0px'}}
                        onClick={handleClick}>
                        Проверить
                    </Button>
                }
                {files.length == 0 && isFileDropped &&
                    <Typography align={"center"} color="red">Неверный тип файлов</Typography>
                }
            </Grid>

            {errorsState.clicked && !errorsState.isOk &&
                <Typography align={"center"} color="red">Возникла ошибка при обработке файлов</Typography>
            }

            {errorsState.clicked && errorsState.isOk &&
                <Grid item>
                    {errorsState.errors.length > 0 && renderList(errorsState.errors)}
                </Grid>
            }
        </Grid>
    )
})

TextValidationPage.displayName = 'App'