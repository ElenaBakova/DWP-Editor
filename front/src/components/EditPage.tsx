import React from 'react'
import {Grid, stepContentClasses, Typography} from "@mui/material";
import {DropZone} from "./DropZone";
import Button from "@mui/material/Button";

const AcceptedFileType = {Doc: '.docx'};

type Segment = {
    title: string;
    text:  string;
}

export const EditPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [isFileDropped, setIsFileDropped] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const [content, setContent] = React.useState<Map<string, Segment>>()
    //const content = new Map<string, Segment>()

    const fileRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        getContent();
    }, [files]);

    const acceptedFormats = AcceptedFileType.Doc;

    const handleFileSelect = (event: any) => {
        const file = event?.target?.files?.[0] as File;
        if (file == undefined) {
            return;
        }
        setFiles([file]);
    }

    const getContent = async () => {
        if (!files || files.length < 1) {
            return
        }
        const formData = new FormData();
        formData.append(files[0].name.toString(), files[0]);

        await fetch("http://localhost:5098/edit", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                response.json().then((data) => {
                    setContent(JSON.parse(data));
                console.log(data);});
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const onDragStateChange = (dragActive: boolean) => {
        setIsDropActive(dragActive)
    }

    const onFilesDrop = (file: File[]) => {
        setFiles(file)
        setIsFileDropped(true)
    }

    return (
        <Grid container direction="column" sx={{alignItems: 'center'}}>
            <Grid container item direction="column" sx={{
                m: 7,
                mb: 3,
                p: 3,
                //width: 'fit-content',
                width: '385px',
                height: 'fit-content',
                border: '2px dashed grey'
            }}
            >
                <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                    <Typography align={"center"} variant={"h5"}
                                style={{fontWeight: 600, margin: '15px', marginBottom: '0px'}}>
                        Перетащите файл для редактирования сюда
                    </Typography>
                </DropZone>
                <Button
                    variant="contained"
                    component="label"
                    style={{textTransform: 'none', fontSize: 'medium', margin: '15px'}}
                >
                    или нажмите для загрузки
                    <input ref={fileRef} type={"file"} accept={acceptedFormats} onChange={handleFileSelect} hidden/>
                </Button>

                {files.length > 0 && content && <div>Hey</div>}

                {files.length == 0 && isFileDropped &&
                    <Typography align={"center"} color="red">Неверный тип файлов</Typography>
                }
            </Grid>
        </Grid>
    )
})