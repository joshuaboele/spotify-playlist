const input = document.querySelector('.file__input');
const reader = new FileReader();
const spotify_id_regex = /spotify\.com\/track\/([^\s,?]+)/g;
// const spotify_id_regex = /spotify\.com\/(track|album)\/([^\s,?]+)/g; // Only work with tracks now so copy-paste works

reader.onload = function(e) {
	const file_content = e.target.result;
	
	let spotify_urls = [];
	let regex_match = spotify_id_regex.exec(file_content);
	while (regex_match !== null) {
		spotify_urls.push("https://open." + regex_match[0]);
		regex_match = spotify_id_regex.exec(file_content);
	}

	const spotify_urls_text = spotify_urls.join("\n");
	const copy_paste_el = document.querySelector("textarea");
	copy_paste_el.value = spotify_urls_text;
	copy_paste_el.select();
	copy_paste_el.setSelectionRange(0, 99999);

	document.execCommand("copy");

	alert("Now go to Spotify and press cmd/ctr + v to paste tracks into your playlist");
};

input.addEventListener('change', e => {
    const currentFile = e.target.files[0];
    reader.readAsText(currentFile);
});

// TODO
// Spotify API gebruiken om playlist te maken
// Kijken wat we doen met albums (en artiesten?)
// Styling


