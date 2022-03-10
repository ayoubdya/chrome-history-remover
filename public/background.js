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
  const host = result.url.match(
    /https?:\/\/(([a-zA-Z0-9]+\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}))\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*/
  )[1];
  chrome.storage.sync.get("blockedUrls").then(({ blockedUrls }) => {
    if (blockedUrls !== undefined && blockedUrls.includes(host)) {
      console.log(blockedUrls);
      deleteHistory(host);
    }
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(key, newValue);
    if (newValue !== undefined) newValue.forEach((url) => deleteHistory(url));
  }
});
