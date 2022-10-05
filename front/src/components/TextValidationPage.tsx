import React from 'react'
import classNames from 'classnames'
import {DropZone} from "./DropZone";
import {FileList} from "./FileList";


export const TextValidationPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])

    const onDragStateChange = React.useCallback((dragActive: boolean) => {
        setIsDropActive(dragActive)
    }, [])

    const onFilesDrop = React.useCallback((file: File[]) => {
        setFiles(file)
    }, [])

    return (
        <div style={{alignContent: "space-around", justifySelf: "center"}}>
            <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                <h2>Перетащите файлы сюда</h2>

                {/*{files.length === 0 ? (
                    <h3>No files to upload</h3>
                ) : (
                    <h3>Files to upload: {files.length}</h3>
                )}*/}

                {/* Render the file list */}
                <FileList files={files} />
            </DropZone>
        </div>
    )
})

TextValidationPage.displayName = 'App'