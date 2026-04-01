import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ResumeData } from '../types';

/**
 * Generates a premium resume PDF using jsPDF and jspdf-autotable.
 * Styled to be professional, ATS-friendly, and visually appealing.
 */
export const generateResumePDF = (data: ResumeData) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  // --- Colors & Branding ---
  const primaryColor: [number, number, number] = [26, 43, 74]; // #1A2B4A - Deep Indigo
  const accentColor: [number, number, number] = [201, 169, 110]; // #C9A96E - Gold accent
  const textColor: [number, number, number] = [55, 65, 81];     // #374151 - Dark gray text
  const lightTextColor: [number, number, number] = [107, 114, 128]; // #6B7280 - Light gray

  // --- Header Section (ATS Friendly: White background, Dark text) ---
  let currentY = 15;

  // Name
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.name.toUpperCase(), margin, currentY);
  currentY += 8;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(data.title.toUpperCase(), margin, currentY);
  currentY += 7;

  // Contact Info (Clear and Delimited)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  const contactParts = [
    data.phone,
    data.email,
    `github.com/${data.github}`,
    `linkedin.com/in/${data.linkedin}`
  ].filter(Boolean);
  
  const contactLine = contactParts.join('  |  ');
  doc.text(contactLine, margin, currentY);
  currentY += 5;

  // Horizontal Divider
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 12;

  // --- Summary ---
  if (data.summary) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PROFESSIONAL SUMMARY', margin, currentY);
    
    // Underline
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY + 2, margin + 50, currentY + 2);

    currentY += 10;
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
    doc.text(summaryLines, margin, currentY);
    currentY += summaryLines.length * 5 + 8;
  }

  // --- Technical Skills ---
  if (data.skills && data.skills.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('TECHNICAL SKILLS', margin, currentY);
    doc.line(margin, currentY + 2, margin + 40, currentY + 2);
    currentY += 6;

    const skillRows = data.skills.map(s => [s.category, s.items]);

    autoTable(doc, {
      startY: currentY,
      head: [],
      body: skillRows,
      theme: 'plain',
      styles: { 
        font: 'times', 
        fontSize: 10, 
        cellPadding: { top: 2, bottom: 2, left: 0, right: 4 } 
      },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold', textColor: primaryColor },
        1: { cellWidth: 'auto', textColor: textColor }
      },
      margin: { left: margin },
      pageBreak: 'auto',
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 10;
  }

  // --- Projects ---
  if (data.projects && data.projects.length > 0) {
    // Check page break
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('KEY PROJECTS', margin, currentY);
    doc.line(margin, currentY + 2, margin + 35, currentY + 2);
    currentY += 10;

    data.projects.forEach((proj) => {
      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(proj.title, margin, currentY);

      // Tech Stack
      if (proj.techStack) {
        const tsWidth = doc.getTextWidth(proj.techStack);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text(`[ ${proj.techStack} ]`, pageWidth - margin - tsWidth - 5, currentY, { align: 'left' });
      }

      currentY += 6;

      // Description
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const descLines = doc.splitTextToSize(proj.description, contentWidth);
      doc.text(descLines, margin, currentY);
      
      currentY += descLines.length * 4.5 + 6;

      // Check page break during project listing
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
    });
    currentY += 4;
  }

  // --- Education ---
  if (data.education && data.education.length > 0) {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('EDUCATION', margin, currentY);
    doc.line(margin, currentY + 2, margin + 30, currentY + 2);
    currentY += 10;

    data.education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(edu.degree, margin, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
      doc.text(edu.year, pageWidth - margin, currentY, { align: 'right' });

      currentY += 5;
      doc.setFont('times', 'italic');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(edu.institution, margin, currentY);
      
      currentY += 10;
    });
  }

  // --- Page Numbering (Simplified) ---
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      287,
      { align: 'center' }
    );
  }

  // Save the PDF
  const filename = `${data.name.replace(/\s+/g, '_')}_Resume.pdf`;
  doc.save(filename);
};
