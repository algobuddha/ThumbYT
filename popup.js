document.addEventListener("DOMContentLoaded", function () {
    const fetchBtn = document.getElementById("fetch-btn");
    const downloadBtn = document.getElementById("download-btn");
    const thumbnailImg = document.getElementById("thumbnail");

    fetchBtn.addEventListener("click", async function () {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const url = tabs[0].url;
            const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
            
            if (videoIdMatch) {
                const videoId = videoIdMatch[1];
                
                const qualityLevels = ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"];
                let imageUrl = "";
                
                for (const quality of qualityLevels) {
                    const testUrl = `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
                    const response = await fetch(testUrl, { method: "HEAD" });

                    if (response.ok) {
                        imageUrl = testUrl;
                        break;
                    }
                }

                if (imageUrl) {
                    thumbnailImg.src = imageUrl;
                    thumbnailImg.style.display = "block";
                    downloadBtn.style.display = "block";

                    downloadBtn.dataset.url = imageUrl;
                    downloadBtn.dataset.videoId = videoId;

                    fetchBtn.style.display = "none";
                } else {
                    alert("Thumbnail not found for this video.");
                }
            } else {
                alert("Not a valid YouTube video URL.");
            }
        });
    });

    downloadBtn.addEventListener("click", function () {
        const url = downloadBtn.dataset.url;
        const videoId = downloadBtn.dataset.videoId;

        chrome.downloads.download({
            url,
            filename: `${videoId}.jpg`,
            saveAs: true
        });
    });
});
