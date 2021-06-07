const newFileName = document.getElementById('newFileName');
const newFileTextArea = document.getElementById('newFileTextArea');
const createFileBtn = document.getElementById('createFileBtn');
const fileListBlock = document.getElementById('fileListBlock');

createFileBtn.addEventListener('click', event => {
    const blob = new Blob([newFileTextArea.value], {type: 'text/plain'});
    console.log(blob);

    const newFileLinkEl = document.createElement('a');
    newFileLinkEl.href= URL.createObjectURL(blob);
    newFileLinkEl.textContent= newFileName.value;
    newFileLinkEl.target = "_blank";

    const newFileDownloadEl = document.createElement('a');
    newFileDownloadEl.className = 'new-file-download-el';
    newFileDownloadEl.href= URL.createObjectURL(blob);
    newFileDownloadEl.download = newFileName.value+'.txt';
    newFileDownloadEl.textContent= 'download';

    const newFileRow = document.createElement('div');
    newFileRow.appendChild(newFileLinkEl);
    newFileRow.appendChild(newFileDownloadEl);
    console.log(newFileLinkEl);
    console.log(newFileDownloadEl);
    console.log(newFileRow);
    fileListBlock.appendChild(newFileRow);
})
