function saveAsFile() {
    const nameInput = document.querySelector('#name-file');
    const typeInput = document.querySelector('#type-file');
    const textInput = document.querySelector('#text-file');
    const info = document.querySelector('.info');

    const nameFile = nameInput.value;
    const typeFile = typeInput.value;
    const textFile = textInput.value;

    info.classList.add('disappear');

    if (nameFile.trim() === '' || textFile.trim() === '') {
        info.innerHTML = "Veuillez entrer les informations nécéssaires !"
        info.classList.add('danger');
        info.classList.remove('disappear');
        info.classList.add('appear');

        setTimeout(() => {
            info.classList.remove('danger');
            info.classList.add('disappear');
            info.classList.remove('appear');
        }, 4000);
        return;
    }


    const blob = new Blob([textFile], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = `${nameFile}.${typeFile}`;

    console.log(link.download);
    link.click();

    nameInput.value = "";
    textInput.value = "";

    info.innerHTML = "Fichier Téléchargé avec succes"
    setTimeout(() => {
        info.classList.add('success');
        info.classList.remove('disappear');
        info.classList.add('appear');

        setTimeout(() => {
            info.classList.remove('success');
            info.classList.add('disappear');
            info.classList.remove('appear');
        }, 2500);
    }, 3000);


    URL.revokeObjectURL(link.href);
}





