import { emit, loadFontsAsync, once, showUI } from "@create-figma-plugin/utilities"
import isArray from "lodash/isArray"

import { ApplyPerspectiveEffectHandler, ResImageDataHandler } from "./types"

export default function () {
  once<ApplyPerspectiveEffectHandler>("APPLY_PERSPECTIVE_EFFECT", async function (code: string) {
    if (!checkValidSelection()) {
      return
    }

    const target = figma.currentPage.selection[0] as VectorNode

    figma.currentPage.selection = [target]
    figma.viewport.scrollAndZoomIntoView([target])
    figma.closePlugin()
  })

  if (!checkValidSelection()) {
    figma.closePlugin()
    return
  }

  showUI({ height: 240, width: 320 })
  sendImageDataToUI()
}

async function sendImageDataToUI() {
  const target = figma.currentPage.selection[0] as VectorNode

  const fill = (target.fills as [ImagePaint])[0]
  try {
    const bytes = await loadImage(fill.imageHash!)
    // bytes are raw image data in PNG/JPEG and need to be decoded
    console.log("bytes length", bytes.length)
    emit<ResImageDataHandler>("RES_IMAGE_DATA", bytes)
  } catch (error) {
    figma.notify("Error: Could not load image")
  }
}

function checkValidSelection() {
  const target = figma.currentPage.selection[0]

  if (!target || target.type !== "VECTOR") {
    figma.notify("Please select a vector node by creating a shape and using the `edit object` tool")
    return false
  }

  if (
    isArray(target.fills) === false ||
    typeof target.fills === "symbol" ||
    target.fills.length === 0
  ) {
    figma.notify("Please make sure the selected shape has a fill")
    return false
  }

  const fill = target.fills[0]

  if (fill.type !== "IMAGE") {
    figma.notify("Please make sure the selected shape has an image fill")
    return false
  }

  if (target.vectorNetwork.vertices.length !== 4) {
    figma.notify("Please make sure the selected shape has 4 vertices")
    return false
  }

  if (fill.imageHash === null) {
    figma.notify("Please use a shape with an image fill")
    return false
  }

  return true
}

async function loadImage(imageHash: string) {
  const image = figma.getImageByHash(imageHash)
  if (!image) {
    throw new Error("Image not found")
  }
  const bytes = await image.getBytesAsync()
  return bytes
}
