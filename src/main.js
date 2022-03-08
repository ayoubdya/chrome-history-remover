/*global chrome*/
var urlParser = require("url");

export const blockUrl = async (url) => {
  const { blockedUrls } = await chrome.storage.sync.get(["blockedUrls"]);
  if (!blockedUrls) await chrome.storage.sync.set({ blockedUrls: [url] });
  else await chrome.storage.sync.set({ blockedUrls: [...blockedUrls, url] });
};

export const waitlistUrl = async (url) => {
  const { blockedUrls } = await chrome.storage.sync.get(["blockedUrls"]);
  const newList = blockedUrls.filter((el) => el !== url);
  await chrome.storage.sync.set({ blockedUrls: newList });
};

export const isBlocked = async (url) => {
  const { blockedUrls } = await chrome.storage.sync.get(["blockedUrls"]);
  if (!blockedUrls) return false;
  return blockedUrls.includes(url);
};

export const getBlockedList = async () => {
  const { blockedUrls } = await chrome.storage.sync.get(["blockedUrls"]);
  if (!blockedUrls) return "";
  return blockedUrls.join("\n");
};

export const setBlockedList = async (blockedText) => {
  const blockedList = blockedText.split("\n").map((el) => el.trim());
  await chrome.storage.sync.set({ blockedUrls: blockedList });
};

export const getCurrentUrl = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return urlParser.parse(tab.url).host;
};

// addButton.addEventListener("click", async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: blockUrl(tab.url),
//   });
// });

// export const toggle
