import { loadFontsAsync, once, showUI } from "@create-figma-plugin/utilities"
import isArray from "lodash/isArray"

import { ApplyPerspectiveEffectHandler } from "./types"

export default function () {
  once<ApplyPerspectiveEffectHandler>("APPLY_PERSPECTIVE_EFFECT", async function (code: string) {
    const target = figma.currentPage.selection[0]

    console.log("[main] target type:", target.type)

    if (!target || target.type !== "VECTOR") {
      figma.notify(
        "Please select a vector node by creating a shape and using the `edit object` tool"
      )
      return
    }

    if (
      isArray(target.fills) === false ||
      typeof target.fills === "symbol" ||
      target.fills.length === 0
    ) {
      figma.notify("Please make sure the selected shape has a fill")
      return
    }

    const fill = target.fills[0]

    if (fill.type !== "IMAGE") {
      figma.notify("Please make sure the selected shape has an image fill")
      return
    }

    const image = fill.imageHash
    fill.imageTransform

    figma.currentPage.selection = [target]
    figma.viewport.scrollAndZoomIntoView([target])
    figma.closePlugin()
  })
  showUI({ height: 240, width: 320 })
}
