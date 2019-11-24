const input = document.querySelector('.file__input');
const reader = new FileReader();

reader.onload = function(e) {
    console.log(e.target.result);
};

input.addEventListener('change', e => {
    const currentFile = e.target.files[0];
    reader.readAsText(currentFile);
});
