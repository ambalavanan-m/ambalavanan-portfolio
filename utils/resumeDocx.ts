import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types';

/**
 * Generates a professional MS Word (.docx) resume using the docx library.
 * Designed to be clean, editable, and ATS-friendly.
 */
export const generateResumeDocx = async (data: ResumeData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // --- Header ---
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun({
                text: data.name.toUpperCase(),
                bold: true,
                size: 48,
                font: 'Calibri',
                color: '1A2B4A',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.title.toUpperCase(),
                bold: true,
                size: 24,
                font: 'Calibri',
                color: 'C9A96E',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({
                text: `${data.phone}  |  ${data.email}  |  github.com/${data.github}  |  linkedin.com/in/${data.linkedin}`,
                size: 20,
                font: 'Calibri',
              }),
            ],
          }),

          // --- Summary Section ---
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: {
                bottom: { color: 'C9A96E', space: 1, style: BorderStyle.SINGLE, size: 6 }
            },
            children: [
              new TextRun({
                text: 'PROFESSIONAL SUMMARY',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 200, after: 400 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: data.summary,
                size: 22,
                font: 'Calibri',
              }),
            ],
          }),

          // --- Skills Section ---
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: {
              bottom: { color: 'C9A96E', space: 1, style: BorderStyle.SINGLE, size: 6 }
            },
            children: [
              new TextRun({
                text: 'TECHNICAL SKILLS',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
          }),
          ...data.skills.map(skill => (
            new Paragraph({
                spacing: { before: 120 },
                children: [
                    new TextRun({ text: `${skill.category}: `, bold: true, size: 22, font: 'Calibri' }),
                    new TextRun({ text: skill.items, size: 22, font: 'Calibri' }),
                ]
            })
          )),
          new Paragraph({ text: '', spacing: { after: 300 } }),

          // --- Projects Section ---
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: {
              bottom: { color: 'C9A96E', space: 1, style: BorderStyle.SINGLE, size: 6 }
            },
            children: [
              new TextRun({
                text: 'KEY PROJECTS',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
          }),
          ...data.projects.flatMap(proj => [
            new Paragraph({
                spacing: { before: 200 },
                children: [
                    new TextRun({ text: proj.title, bold: true, size: 22, font: 'Calibri' }),
                    new TextRun({ text: proj.techStack ? ` (${proj.techStack})` : '', italics: true, size: 20, font: 'Calibri' }),
                ]
            }),
            new Paragraph({
                spacing: { before: 80, after: 200 },
                children: [
                    new TextRun({ text: proj.description, size: 20, font: 'Calibri' }),
                ]
            })
          ]),

          // --- Education Section ---
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: {
              bottom: { color: 'C9A96E', space: 1, style: BorderStyle.SINGLE, size: 6 }
            },
            children: [
              new TextRun({
                text: 'EDUCATION',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
          }),
          ...data.education.map(edu => (
            new Paragraph({
                spacing: { before: 200 },
                children: [
                    new TextRun({ text: edu.degree, bold: true, size: 22, font: 'Calibri' }),
                    new TextRun({ text: ` | ${edu.year}`, size: 20, font: 'Calibri' }),
                    new TextRun({ text: `\n${edu.institution}`, size: 20, font: 'Calibri', break: 1 }),
                ]
            })
          )),
        ],
      },
    ],
  });

  // Export to Blob and download
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.name.replace(/\s+/g, '_')}_Resume.docx`);
};
