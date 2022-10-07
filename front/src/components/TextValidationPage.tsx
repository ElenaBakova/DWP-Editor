import React from 'react'
import {DropZone} from "./DropZone";
import {FileList} from "./FileList";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";

const AcceptedFileType = {Doc: '.docx'};

export const TextValidationPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const fileRef = React.useRef<HTMLInputElement>(null);

    // File formats that can be uploaded
    const acceptedFormats = AcceptedFileType.Doc;

    const handleFileSelect = (event: any) => {
        setFiles([event?.target?.files?.[0]] as File[]);
    };

    const onDragStateChange = (dragActive: boolean) => {
        setIsDropActive(dragActive)
    }

    const onFilesDrop = (file: File[]) => {
        setFiles(file)
    }

    return (
        <Grid container direction="column" sx={{
            m: 10,
            p: 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: 'fit-content',
            '&:hover': {
                opacity: [0.9, 0.8, 0.7],
            },
            border: '2px dashed grey'
        }}
        >
            <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                <h2>Перетащите файл сюда</h2>

                <FileList files={files}/>
            </DropZone>
            <Button
                variant="contained"
                component="label"
                style={{textTransform: 'none', fontSize: 'medium'}}
            >
                или нажмите для загрузки
                <input ref={fileRef} hidden type="file" accept={acceptedFormats} onChange={handleFileSelect}/>
            </Button>
        </Grid>
    )
})

TextValidationPage.displayName = 'App'