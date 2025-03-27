import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const exportPDF = (expenses) => {
  const doc = new jsPDF();
  const tableColumn = ["Nume", "Sumă", "Categorie", "Data"];
  const tableRows = [];

  expenses.forEach(exp => {
    const expData = [
      exp.name,
      exp.amount,
      exp.category || "",
      new Date(exp.date).toLocaleString()
    ];
    tableRows.push(expData);
  });

  doc.text("Istoric Cheltuieli", 14, 15);
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });  

  doc.save("expenses.pdf");
};

export default exportPDF;
