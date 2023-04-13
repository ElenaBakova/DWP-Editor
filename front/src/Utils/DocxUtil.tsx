import React from 'react'
import {AlignmentType, Document, HeadingLevel, PageBreak, Paragraph, TextRun} from "docx";
import {Segment} from "../components/EditPage";

const getTextRun = (text: string) => {
    if (text.includes("Правительство Российской Федерации")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 3,
        })
    }

    if (text.includes("Санкт-Петербургский государственный университет")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 2,
        })
    }

    if (text.includes("Р А Б О Ч А Я   П Р О Г Р А М М А")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 7,
        })
    }

    if (text.includes("УЧЕБНОЙ ДИСЦИПЛИНЫ")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 1,
        })
    }

    if (text.includes("Язык(и) обучения")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 4,
        })
    }

    if (text.includes("Санкт-Петербург")) {
        return new TextRun({
            text: text,
            break: 22,
        })
    }

    if (text.includes("Трудоемкость")) {
        return new TextRun({
            text: text,
            break: 3,
        })
    }

    if (text.includes("Регистрационный номер")) {
        return new TextRun({
            text: text,
            break: 2,
        })
    }

    return new TextRun({
        text: text,
        break: 1,
    })
}

const createTitlePage = (text: string) => {
    return new Paragraph({
        style: "title",
        children: [
            ...text.split('\n').map(item => {
                const runs: TextRun[] = [];
                runs.push(getTextRun(item));
                return runs
            })
                .reduce((prev, curr) => prev.concat(curr), []),
            new PageBreak()
        ],
    })
}

const countGroups = (string: string) => {
    const matches = string.match(/\.\d+/g);
    return matches ? (matches.length + 1) : 0;
}


const switchHeading = (section: string) => {
    if (section.includes("Раздел")) {
        return HeadingLevel.HEADING_1;
    }

    switch (countGroups(section)) {
        case 2:
            return HeadingLevel.HEADING_2;
        case 3:
            return HeadingLevel.HEADING_3;
        default:
            return HeadingLevel.HEADING_4;
    }
}

const getRunWithBreaks = (text: string) => {
    return text.split('\n').map(item => {
        const runs: TextRun[] = [];
        runs.push(new TextRun({
            text: item,
            break: item == "" ? 0 : 1,
        }));
        return runs
    })
        .reduce((prev, curr) => prev.concat(curr), []);
}

export function composeDocument(content: Map<string, Segment>) {
    return new Document({
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 32,
                        bold: true,
                    },
                    paragraph: {
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            before: 120,
                        }
                    },
                },
                heading2: {
                    run: {
                        size: 28,
                        bold: true,
                    },
                    paragraph: {
                        alignment: AlignmentType.LEFT,
                    },
                },
                heading3: {
                    run: {
                        size: 24,
                        bold: true,
                    },
                    paragraph: {
                        alignment: AlignmentType.LEFT,
                    },
                },
                heading4: {
                    run: {
                        size: 24,
                        bold: true,
                        italics: true,
                    },
                    paragraph: {
                        alignment: AlignmentType.LEFT,
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "title",
                    name: "Title Page",
                    basedOn: "Normal",
                    paragraph: {
                        alignment: AlignmentType.CENTER,
                    },
                    run: {
                        characterSpacing: 20,
                        size: 24,
                    },
                },
                {
                    id: "common",
                    name: "Common Style",
                    basedOn: "Normal",
                    run: {
                        size: 24,
                    },
                },
            ],
        },
        sections: [
            {
                children: [
                    ...Array.from(content.entries()).map((item, index) => {
                        const array: Paragraph[] = [];

                        if (index == 0 && item) {
                            array.push(createTitlePage(item[1].text));
                        } else if (item) {
                            const title = item[1] ? item[0] + " " + item[1].title : item[0];
                            const text = item[1] ? item[1].text : "";

                            array.push(new Paragraph({
                                heading: switchHeading(item[0]),
                                text: title,
                            }));

                            array.push(new Paragraph({
                                style: "common",
                                // keepLines: true,
                                children: [
                                    ...getRunWithBreaks(text),
                                ],
                            }));
                        }

                        return array
                    })
                        .reduce((prev, curr) => prev.concat(curr), []),
                ]

            }
        ]
    });
}