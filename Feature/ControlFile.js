function downloadURL(url, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export function downloadFile(data, fileName = 'test.txt') {
    const blob = new Blob([data], { type: 'text/txt' });
    const url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
}

export function readTextFile(file) {
    const rawFile = new XMLHttpRequest();

    rawFile.open('GET', file, false);

    return new Promise((resolve) => {
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    return resolve(rawFile.responseText);
                }
            }
        };
        rawFile.send();
    });
}
