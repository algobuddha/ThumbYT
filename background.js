chrome.runtime.onMessage.addListener(async (message) => {
    if (message.videoId) {
        const videoId = message.videoId;
        const urls = [
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, 
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
        ];

        for (const url of urls) {
            const response = await fetch(url, { method: "HEAD" });
            if (response.ok) {
                chrome.downloads.download({
                    url,
                    filename: `${videoId}.jpg`,
                    saveAs: true
                });
                return;
            }
        }
        alert("Thumbnail not available in high quality.");
    }
});
