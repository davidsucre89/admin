const toggleSidebarMessage = "toggle-sidebar";
const sidebarStateMessage = "sidebar-state";

if (window.parent === window) {
  const navbarFrame = document.getElementById("navbar-frame");
  const sidebarPanel = document.getElementById("sidebar-panel");

  if (navbarFrame && sidebarPanel) {
    window.addEventListener("message", (event) => {
      if (
        event.source !== navbarFrame.contentWindow ||
        !event.data ||
        event.data.type !== toggleSidebarMessage
      ) {
        return;
      }

      const collapsed = sidebarPanel.classList.toggle("is-collapsed");
      sidebarPanel.setAttribute("aria-hidden", String(collapsed));
      event.source.postMessage({ type: sidebarStateMessage, expanded: !collapsed }, "*");
    });
  }
} else {
  const toggleButton = document.getElementById("sidebarToggle");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      window.parent.postMessage({ type: toggleSidebarMessage }, "*");
    });

    window.addEventListener("message", (event) => {
      if (
        event.source !== window.parent ||
        !event.data ||
        event.data.type !== sidebarStateMessage ||
        typeof event.data.expanded !== "boolean"
      ) {
        return;
      }

      toggleButton.setAttribute("aria-expanded", String(event.data.expanded));
    });
  }
}
