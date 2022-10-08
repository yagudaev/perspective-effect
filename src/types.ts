import { EventHandler } from "@create-figma-plugin/utilities"

export interface ApplyPerspectiveEffectHandler extends EventHandler {
  name: "APPLY_PERSPECTIVE_EFFECT"
  handler: (code: string) => void
}

export interface ResImageDataHandler extends EventHandler {
  name: "RES_IMAGE_DATA"
  handler: (bytes: Uint8Array) => void
}
