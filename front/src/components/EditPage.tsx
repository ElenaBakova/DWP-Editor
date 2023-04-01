import React from 'react'
import {Document, HeadingLevel, Packer, Paragraph} from "docx";
import {saveAs} from "file-saver";
import {Button, Grid, List, ListItem, TextField, Typography} from "@mui/material";
import {DropZone} from "./DropZone";

const AcceptedFileType = {Doc: '.docx'};

export type Segment = {
    title: string;
    text: string;
}

interface IError {
    message: string;
    isOk: boolean;
}

export const EditPage = React.memo(() => {
    const [isDropActive, setIsDropActive] = React.useState(false)
    const [isFileDropped, setIsFileDropped] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const [content, setContent] = React.useState<Map<string, Segment>>()
    const [error, setError] = React.useState<IError>({message: "", isOk: false})

    const fileRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        getContent().then(r => r);
    }, [files]);

    React.useEffect(() => {
        if (content && error.isOk) {
            renderContent();
        }
    }, [content, error]);

    const acceptedFormats = AcceptedFileType.Doc;

    const handleFileSelect = (event: any) => {
        const file = event?.target?.files?.[0] as File;
        if (file == undefined) {
            return;
        }
        setFiles([file]);
    }

    const handleSaveClick = () => {
        if (content == undefined) {
            return;
        }

        const document = new Document({
            sections: [
                {
                    children: [
                        ...Array.from(content.entries()).map((item, index) => {
                            const arr: Paragraph[] = [];
                            if (index == 0 && item) {
                                arr.push(new Paragraph({
                                    text: item[1].text
                                }));
                            } else if (item) {
                                arr.push(new Paragraph({
                                    text: item[1] ? item[0] + " " + item[1].title : item[0],
                                    heading: HeadingLevel.HEADING_1
                                }));
                                arr.push(new Paragraph({
                                    text: item[1] ? item[1].text : ""
                                }));
                            }

                            return arr
                        })
                            .reduce((prev, curr) => prev.concat(curr), []),
                    ]

                }
            ]
        });

        Packer.toBlob(document).then(blob => {
            saveAs(blob, `${files[0].name}`);
            console.log("Document created successfully");
        });
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
                    setError({message: "Возникла ошибка при обработке файла", isOk: false})
                    throw new Error("Возникла ошибка при обработке файла");
                }
                response.json().then((data: Object) => {
                    let entries = Object.entries(data);
                    if (entries.length < 1) {
                        setError({message: "Возникла ошибка при обработке файла", isOk: false})
                        throw new Error("Возникла ошибка при обработке файла");
                    }

                    let map = new Map<string, Segment>();
                    entries.map(item => map.set(item[0], item[1]));
                    setError({message: "", isOk: true});
                    setContent(map);
                });
            })
            .catch((e) => {
                setError({message: e.message, isOk: false})
                setContent(undefined)
                console.error("Error:", e);
            });
    }

    const onDragStateChange = (dragActive: boolean) => {
        setIsDropActive(dragActive)
    }

    const onFilesDrop = (file: File[]) => {
        setFiles(file)
        setIsFileDropped(true)
    }

    const renderContent = () => {
        return (
            <List
                sx={{
                    bgcolor: 'aliceblue',
                    position: 'relative',
                    padding: 2,
                    margin: 3,
                    marginTop: 0,
                    width: '700px',
                }}
            >
                {content && (Array.from(content.entries())).map((item, index) =>
                    <div key={index}>
                        <ListItem>
                            <TextField
                                id="filled-textarea"
                                label={item[0]}
                                key={item[1] ? item[1].title + "\n" + item[1].text : ""}
                                defaultValue={item[1] ? item[1].title + "\n" + item[1].text : ""}
                                placeholder="Заголовок и содержание раздела"
                                multiline
                                fullWidth
                                variant="filled"
                            />
                        </ListItem>
                    </div>
                )}
            </List>
        );
    }

    return (
        <Grid container direction="column" sx={{alignItems: 'center'}}>
            <Grid container item direction="column" sx={{
                m: 7,
                mb: 3,
                p: 3,
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

                {files.length == 0 && isFileDropped &&
                    <Typography align={"center"} color="red">Неверный тип файлов</Typography>
                }
            </Grid>

            {!error.isOk &&
                <span style={{color: 'red'}}>{error.message}</span>
            }

            {error.isOk && files.length > 0 &&
                <div>
                    <Grid item>
                        {renderContent()}
                    </Grid>
                    <Button
                        variant="contained"
                        component="label"
                        style={{textTransform: 'none', fontSize: 'medium', margin: '0px 15px 50px 55px'}}
                        onClick={handleSaveClick}
                    >
                        Сохранить
                    </Button>
                </div>
            }
        </Grid>
    )
})