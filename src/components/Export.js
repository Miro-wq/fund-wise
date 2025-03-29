import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const exportPDF = (expenses) => {
  const doc = new jsPDF();
  const tableColumn = ["Name", "Amount", "Category", "Date"];
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

  doc.text("Expense History", 14, 15);
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });  

  doc.save("expenses.pdf");
};

export default exportPDF;
