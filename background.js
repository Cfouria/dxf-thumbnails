function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create({
  id: "dxf-thumbnail",
  title: "Re: Ctrl+Right_click",
  documentUrlPatterns: ["<all_urls>"],
  contexts: ["link"]
}, onCreated);