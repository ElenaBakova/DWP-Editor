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

    return (
        <>
            <Button
                variant="contained"
                component="label"
                style={{textTransform: 'none', fontSize: 'medium'}}
                onClick={() => fileRef.current?.click()}
            >
                или нажмите для загрузки
                <input ref={fileRef} hidden type="file" accept={acceptedFormats} onChange={handleFileSelect}/>
            </Button>
        </>
    );
}