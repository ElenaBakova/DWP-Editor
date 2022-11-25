import React from 'react'
import {DropZone} from "./DropZone";
import Button from "@mui/material/Button";
import {Box, Grid, Typography} from "@mui/material";

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
                    console.log("upload file error");
                    console.log(error);
                    setErrorsState({
                        errors: [],
                        isOk: false,
                        clicked: false
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
                    <div>
                        <span>{files.length > 0 ? files[0].name : ""}</span>{' '}
                    </div>
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

            {/*{errors.length == 0 &&*/}
            {/*    <Typography align={"center"} color="red">Ошибок не найдено</Typography>*/}
            {/*}*/}
        </Box>
    )
})

TextValidationPage.displayName = 'App'