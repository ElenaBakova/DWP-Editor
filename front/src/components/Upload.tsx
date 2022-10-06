import * as React from 'react';
import Button from '@mui/material/Button';

const AcceptedFileType = {Doc: '.docx'};

export default function Upload() {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const acceptedFormats = AcceptedFileType.Doc;

    const [selectedFiles, setSelectedFiles] = React.useState();

    const handleFileSelect = (event: any) => {
        setSelectedFiles(event?.target?.files?.[0]);
    };

    /*const onUpload = () => {
        console.log(selectedFiles);
    };

    const onClear = () => {
        setSelectedFiles(undefined);
    };*/

   /* const onUpdate = (event: any) => {
        if (event.target.textContent.trim().toLowerCase() === 'change') {
            onClear();
            fileRef.current?.click();
            return;
        }
        if (event.target.textContent.trim().toLowerCase() === 'clear') {
            onClear();
            return;
        }
    };*/

    return (
        <>
            <input
                ref={fileRef}
                hidden
                type="file"
                accept={acceptedFormats}
                onChange={handleFileSelect}
            />
            {/*{selectedFiles && !selectedFiles['name'] && (*/}
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none', fontSize: 'medium'}}
                    onClick={() => fileRef.current?.click()}
                >
                    или нажмите для загрузки
                </Button>
            {/*)}*/}
            {/*{selectedFiles && selectedFiles['name'] && (
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none'}}
                    onClick={onUpdate}
                >
                    <span style={{ float: 'left' }}> {selectedFiles['name']}</span>
                    <span style={{padding: '10px'}}> Change</span>
                    <span>Clear</span>
                </Button>
            )}*/}
            {/*<Button
                color="primary"
                disabled={!selectedFiles}
                style={{textTransform: 'none'}}
                onClick={onUpload}
            >
                Upload
            </Button>*/}
        </>
    );
}