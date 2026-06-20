async function getFenFromPage() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) {
    throw new Error("No active tab found");
  }

  const response = await browser.tabs.sendMessage(tab.id, {
    type: "GET_FEN",
  });

  return response?.fen;
}

async function getFlipFenFromPage() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) {
    throw new Error("No active tab found");
  }

  const response = await browser.tabs.sendMessage(tab.id, {
    type: "GET_FLIP_FEN",
  });

  return response?.fen;
}

document.addEventListener("DOMContentLoaded", () => {
  const fenBtn = document.getElementById("fen-btn") as HTMLButtonElement | null;
  const fenFlipBtn = document.getElementById("fen-flip-btn") as HTMLButtonElement | null;
  const fenOutput = document.getElementById("fen-output") as HTMLInputElement | null;

  fenBtn?.addEventListener("click", async () => {
    const fen = await getFenFromPage();

    if (!fen || !fenOutput) return;

    fenOutput.value = fen;
    navigator.clipboard.writeText(fen).catch(() => {});
  });

  fenFlipBtn?.addEventListener("click", async () => {
    const fen = await getFlipFenFromPage();

    if (!fen || !fenOutput) return;

    fenOutput.value = fen;
    navigator.clipboard.writeText(fen).catch(() => {});
  });
});