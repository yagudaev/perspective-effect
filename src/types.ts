import { EventHandler } from "@create-figma-plugin/utilities"

export interface ApplyPerspectiveEffectHandler extends EventHandler {
  name: "APPLY_PERSPECTIVE_EFFECT"
  handler: (code: string) => void
}
