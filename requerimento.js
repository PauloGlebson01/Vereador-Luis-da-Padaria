document.getElementById("formRequerimento").addEventListener("submit", async function(e) {
  e.preventDefault();
  const { jsPDF } = window.jspdf;

  const nome = document.getElementById("nome").value;
  const documento = document.getElementById("documento").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const descricao = document.getElementById("descricao").value;

  const doc = new jsPDF();

  // Adicionar logo centralizada
  const logo = new Image();
  logo.src = './assets/logo-pmjp-color-horizontal.png';

  logo.onload = function() {
    const imgWidth = 50;
    const imgHeight = (logo.height / logo.width) * imgWidth;
    doc.addImage(logo, 'PNG', 80, 10, imgWidth, imgHeight); // x=80 centraliza a logo

    // Título do formulário centralizado
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("Formulário de Solicitação de Requerimento", 105, 45, null, null, "center");

    // Campos do formulário com linhas pontilhadas
    let y = 60;
    const lineGap = 10;

    function addField(label, value) {
      doc.setFont("times", "bold");
      doc.text(label, 20, y);
      doc.setFont("times", "normal");
      doc.text(value, 20, y + 5);
      doc.line(20, y + 7, 190, y + 7); // linha pontilhada
      y += lineGap + 10;
    }

    addField("Nome Completo:", nome);
    addField("Documento (RG/CPF):", documento);
    addField("Endereço:", endereco);
    addField("Telefone:", telefone);
    addField("E-mail:", email);
    addField("Descrição do Pedido:", descricao);

    // Espaço para assinatura
    y += 15;
    doc.text("Assinatura do Requerente:", 20, y);
    doc.line(70, y + 2, 180, y + 2);

    y += 15;
    doc.text("Carimbo/Assinatura do Órgão:", 20, y);
    doc.line(90, y + 2, 180, y + 2);

    // Salvar PDF
    doc.save("requerimento_oficial.pdf");

    // Enviar WhatsApp
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const message = encodeURIComponent(`Olá, segue meu requerimento preenchido.\n\nPDF: ${pdfUrl}`);
    const whatsappNumber = "5583993046142"; 
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  logo.onerror = function() {
    alert("Erro ao carregar a logo. Verifique o caminho da imagem.");
  };
});
