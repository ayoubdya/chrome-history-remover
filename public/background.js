const deleteHistory = (url) =>
  chrome.history.search(
    {
      text: url,
      maxResults: 9999,
      startTime: 0,
    },
    (data) => {
      data.forEach((history) => {
        chrome.history.deleteUrl({ url: history.url });
      });
    }
  );

chrome.history.onVisited.addListener((result) => {
  console.log(result);
  chrome.storage.sync.get(["blockedUrls"]).then(({ blockedUrls }) => {
    if (blockedUrls && blockedUrls.includes(url.parse(result.url).host)) {
      console.log(blockedUrls);
      blockedUrls.forEach((url) => deleteHistory(url));
    }
  });
});
