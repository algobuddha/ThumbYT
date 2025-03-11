function addDownloadButton() {
    if (document.getElementById("thumb-download-btn")) return;

    const container = document.querySelector("#above-the-fold #title");
    if (!container) return;

    const url = window.location.href;
    const videoId = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (!videoId) return;

    const btn = document.createElement("button");
    btn.id = "thumb-download-btn";
    btn.innerText = "Download Thumbnail";
    btn.style.cssText = "background: red; color: white; border: none; padding: 8px; cursor: pointer; font-size: 14px; border-radius: 5px; margin-left: 10px;";
    btn.onclick = () => {
        showThumbnailPreview(videoId[1]);
    };

    container.appendChild(btn);
}

function showThumbnailPreview(videoId) {
    const container = document.getElementById("thumb-preview-container");
    if (container) container.remove();

    const newContainer = document.createElement("div");
    newContainer.id = "thumb-preview-container";
    newContainer.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 1000;";

    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    img.alt = "Thumbnail";
    img.style.cssText = "width: 100%; max-width: 500px; border-radius: 8px; margin-bottom: 10px;";

    const btnDownload = document.createElement("button");
    btnDownload.innerText = "Download Thumbnail";
    btnDownload.style.cssText = "background: red; color: white; border: none; padding: 8px; cursor: pointer; font-size: 14px; border-radius: 5px; margin-top: 10px;";
    btnDownload.onclick = () => {
        chrome.runtime.sendMessage({ videoId });
    };

    const btnClose = document.createElement("button");
    btnClose.innerText = "Close";
    btnClose.style.cssText = "background: gray; color: white; border: none; padding: 8px; cursor: pointer; font-size: 14px; border-radius: 5px; margin-left: 10px;";
    btnClose.onclick = () => newContainer.remove();

    newContainer.appendChild(img);
    newContainer.appendChild(btnDownload);
    newContainer.appendChild(btnClose);

    document.body.appendChild(newContainer);
}

setInterval(addDownloadButton, 2000);
