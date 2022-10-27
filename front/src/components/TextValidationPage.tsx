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
            p: 3,
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
        </Grid>
    )
})

TextValidationPage.displayName = 'App'