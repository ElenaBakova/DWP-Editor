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
            break: 1,
        })
    }

    if (text.includes("Санкт-Петербургский государственный университет")) {
        return new TextRun({
            text: text,
            bold: true,
            break: 1,
        })
    }

    return new TextRun({
        text: text,
        break: 1,
    })
}

const createTitlePage = (text: string) => {
    var splitted = text.split('\n');
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            ...splitted.map(item => {
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
    const splitted = text.split(/\r?\n/);

    return splitted.map(item => {
        const runs: TextRun[] = [];
        runs.push(new TextRun({text: item, break: 1}));
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
                /*listParagraph: {
                    run: {
                        color: "#FF0000",
                    },
                },*/
            },
            paragraphStyles: [
                /*{
                    id: "aside",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: "999999",
                        italics: true,
                    },
                    paragraph: {
                        /!*indent: {
                            left: convertInchesToTwip(0.5),
                        },*!/
                        spacing: {
                            line: 276,
                        },
                    },
                },*/
                {
                    id: "common",
                    name: "Common Style",
                    basedOn: "Normal",
                    // quickFormat: true,
                    paragraph: {
                        // alignment: AlignmentType.JUSTIFIED,
                        spacing: {line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05},
                    },
                    run: {
                        size: 24,
                    },
                },
                /*{
                    id: "strikeUnderline",
                    name: "Strike Underline",
                    basedOn: "Normal",
                    quickFormat: true,
                    run: {
                        strike: true,
                        underline: {
                            type: UnderlineType.SINGLE,
                        },
                    },
                },*/
            ],
            /*characterStyles: [
                {
                    id: "strikeUnderlineCharacter",
                    name: "Strike Underline",
                    basedOn: "Normal",
                    quickFormat: true,
                    run: {
                        strike: true,
                        underline: {
                            type: UnderlineType.SINGLE,
                        },
                    },
                },
            ],*/
        },
        /*numbering: {
            config: [
                {
                    reference: "my-crazy-numbering",
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_LETTER,
                            text: "%1)",
                            alignment: AlignmentType.LEFT,
                        },
                    ],
                },
            ],
        },*/
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
                                keepLines: true,
                                children: [
                                    /*new TextRun({
                                        text: item[1] ? item[0] + " " + item[1].title : item[0],
                                        break: 1,
                                    })*/
                                    /*{const temp = item[1] ? item[0] + " " + item[1].title : item[0]}
                                    ...(item[1] ? getRunWithBreaks(item[0] + " " + item[1].title) : getRunWithBreaks(item[0]))
                                        .reduce((prev, curr) => prev.concat(curr), []),*/
                                    ...getRunWithBreaks(title)
                                ],
                            }));
                            array.push(new Paragraph({
                                style: "common",
                                // ...(item[1] ? getRunWithBreaks(item[1].text) : new TextRun({})),
                                // text: item[1] ? item[1].text : ""
                                keepLines: true,
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