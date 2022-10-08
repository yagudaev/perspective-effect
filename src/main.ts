import { loadFontsAsync, once, showUI } from "@create-figma-plugin/utilities"

import { ApplyPerspectiveEffectHandler } from "./types"

export default function () {
  once<ApplyPerspectiveEffectHandler>("APPLY_PERSPECTIVE_EFFECT", async function (code: string) {
    const text = figma.createText()
    await loadFontsAsync([text])
    text.characters = code
    figma.currentPage.selection = [text]
    figma.viewport.scrollAndZoomIntoView([text])
    figma.closePlugin()
  })
  showUI({ height: 240, width: 320 })
}
