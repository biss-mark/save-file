function saveAsFile() {
    const nameFile = document.querySelector('#name-file').value;
    const typeFile = document.querySelector('#type-file').value;
    const textFile = document.querySelector('#text-file').value;
    const info = document.querySelector('.info');

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

    info.innerHTML = "Fichier Téléchargé avec succes"
    setTimeout(() => {
        info.classList.add('success');
        info.classList.remove('disappear');
        info.classList.add('appear');

    }, 3000);
    setTimeout(() => {
        info.classList.remove('success');
        info.classList.add('disappear');
        info.classList.remove('appear');
    }, 2500);

    URL.revokeObjectURL(link.href);
}





