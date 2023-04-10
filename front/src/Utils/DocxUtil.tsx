import React from 'react'
import {AlignmentType, Document, HeadingLevel, Packer, PageBreak, Paragraph, TextRun} from "docx";
import {saveAs} from "file-saver";
import {Button, Grid, List, ListItem, TextField, Typography} from "@mui/material";
import {Segment} from "../components/EditPage";

const getTextRun = (text:string) => {
    if (text.includes("Правительство Российской Федерации")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 3,
        })
    }
}

const createTitlePage = (text: string) => {
    var splitted = text.split('\n');
    // const array: Paragraph[] = [];
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
        ...splitted.map(item => {
                const runs: TextRun[] = [];
                runs.push(new TextRun({
                    text: item,
                    break: 3,
                }));
            return runs;
            })
                .reduce((prev, curr) => prev.concat(curr), []),
            new PageBreak()
        ],
    })
}

export function composeDocument(content: Map<string, Segment>) {
    const document = new Document({
        sections: [
            {
                children: [
                    ...Array.from(content.entries()).map((item, index) => {
                        const array: Paragraph[] = [];
                        if (index == 0 && item) {
                            array.push(createTitlePage(item[1].text));
                            /*array.push(new Paragraph({
                                children: [
                                    new TextRun({
                                        text: item[1].text,
                                        break: 1,
                                    }),
                                    new PageBreak()
                                ],
                            }).addRunToFront(new PageBreak()))*/
                        } else if (item) {
                            array.push(new Paragraph({
                                text: item[1] ? item[0] + " " + item[1].title : item[0],
                                heading: HeadingLevel.HEADING_1
                            }));
                            array.push(new Paragraph({
                                text: item[1] ? item[1].text : ""
                            }));
                        }

                        return array
                    })
                        .reduce((prev, curr) => prev.concat(curr), []),
                ]

            }
        ]
    });

    return document;
}