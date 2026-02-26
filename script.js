function saveAsFile() {
    const nameInput = document.querySelector('#name-file');
    const typeInput = document.querySelector('#type-file');
    const textInput = document.querySelector('#text-file');
    const info = document.querySelector('.info');

    const nameFile = nameInput.value.trim();
    const typeFile = typeInput.value;
    const textFile = textInput.value.trim();

    info.classList.add('disappear');

    if (!nameFile || !textFile) {
        showMessage("Veuillez entrer les informations nécessaires !", "danger");
        return;
    }

    if (typeFile === "application/pdf") {
        generatePDF(nameFile, textFile);
        showMessage("Téléchargement du PDF !", "success");
        resetFields();
        return;
    }

    const extension = getExtension(typeFile);
    const blob = new Blob([textFile], { type: typeFile });
    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${nameFile}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    showMessage("Téléchargement du Fichier !", "success");
    resetFields();


    function resetFields() {
        nameInput.value = "";
        textInput.value = "";
    }

    function showMessage(message, type) {
        info.innerHTML = message;
        info.classList.add(type);
        info.classList.remove('disappear');
        info.classList.add('appear');

        setTimeout(() => {
            info.classList.remove(type);
            info.classList.add('disappear');
            info.classList.remove('appear');
        }, 3000);
    }

    function getExtension(type) {
        const map = {
            "text/plain": "txt",
            "application/msword": "doc",
            "text/html": "html",
            "text/css": "css",
            "text/javascript": "js",
            "text/markdown": "md",
            "application/json": "json",
            "application/xml": "xml",
            "application/x-httpd-php": "php",
            "application/typescript": "ts",
            "application/vnd.ms-powerpoint": "ppt"
        };

        return map[type] || "txt";
    }

    function generatePDF(name, text) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(text, 10, 10);
        doc.save(`${name}.pdf`);
    }
}