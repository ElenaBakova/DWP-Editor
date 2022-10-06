import React from 'react'
import {DropZone} from "./DropZone";
import {FileList} from "./FileList";
import Button from "@mui/material/Button";

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
        <div style={{alignContent: "space-around", justifyItems: "center"}}>
            <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                <h2>Перетащите файлы сюда</h2>
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none', fontSize: 'medium'}}
                >
                    или нажмите для загрузки
                    <input ref={fileRef} hidden type="file" accept={acceptedFormats} onChange={handleFileSelect}/>
                </Button>
                <FileList files={files}/>
            </DropZone>
        </div>
    )
})

TextValidationPage.displayName = 'App'