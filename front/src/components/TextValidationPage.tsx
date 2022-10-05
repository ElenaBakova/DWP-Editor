import React from 'react'
import {DropZone} from "./DropZone";
import {FileList} from "./FileList";


export const TextValidationPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])

    const onDragStateChange = (dragActive: boolean) => {
        setIsDropActive(dragActive)
    }

    const onFilesDrop = (file: File[]) => {
        setFiles(file)
    }

    return (
        <div style={{alignContent: "space-around", justifySelf: "center"}}>
            <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                <h2>Перетащите файлы сюда</h2>

                <FileList files={files}/>
            </DropZone>
        </div>
    )
})

TextValidationPage.displayName = 'App'