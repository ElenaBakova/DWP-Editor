import React from 'react'
import {DropZone} from "./DropZone";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";

const AcceptedFileType = {Doc: '.docx'};

export const TextValidationPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const fileRef = React.useRef<HTMLInputElement>(null);

    // File formats that can be uploaded
    const acceptedFormats = AcceptedFileType.Doc;

    const formData = new FormData();

    const handleFileSelect = (event: any) => {
        const file = event?.target?.files?.[0];
        file ? setFiles([file]) : setFiles(files);

        if (file) {
            formData.append(file.name.toString(), file);
        }
        // console.log(formData.get(file.name.toString()));
    }

    const onDragStateChange = (dragActive: boolean) => {
        setIsDropActive(dragActive)
    }

    const onFilesDrop = (file: File[]) => {
        setFiles(file)

        if (file && file.length > 0) {
            formData.append(file[0].name.toString(), file[0]);
        }
        //console.log("-------");
        //console.log(formData.get(file[0].name.toString()));
    }

    return (
        <Grid container direction="column" sx={{
            m: 10,
            p: 3,
            justifyContent: 'center',
            alignContent: 'center',
            width: 'fit-content',
            /*'&:hover': {
                opacity: [0.9, 0.8, 0.7],
            },*/
            border: '2px dashed grey'
        }}
        >
            <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                <h2>Перетащите файл сюда</h2>

                <div>
                    <span>{files.length > 0 ? files[0].name : ""}</span>{' '}
                    <span>{files.length > 0 ? (Math.round(files[0]?.size / 1000)) : ""}</span>
                </div>
            </DropZone>
            <Button
                variant="contained"
                component="label"
                style={{textTransform: 'none', fontSize: 'medium', marginBottom: '15px'}}
            >
                или нажмите для загрузки
                <input ref={fileRef} hidden type="file" accept={acceptedFormats} onChange={handleFileSelect}/>
            </Button>

            {files.length > 0 &&
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none', fontSize: 'medium', marginBottom: '15px'}}>
                    Загрузить
                </Button>
            }
        </Grid>
    )
})

TextValidationPage.displayName = 'App'