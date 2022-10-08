import { Button, Container, render, VerticalSpace } from "@create-figma-plugin/ui"
import { emit } from "@create-figma-plugin/utilities"
import { h } from "preact"
import { useCallback, useState } from "preact/hooks"

import { ApplyPerspectiveEffectHandler } from "./types"

function Plugin() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
  const handleInsertCodeButtonClick = useCallback(
    function () {
      emit<ApplyPerspectiveEffectHandler>("APPLY_PERSPECTIVE_EFFECT", code)
    },
    [code]
  )
  return (
    <Container
      space='medium'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexGrow: 1
      }}
    >
      <div style={{ width: "100%" }}>
        <Button fullWidth style={{ width: "100%" }} onClick={handleInsertCodeButtonClick}>
          Apply Perspective Effect
        </Button>
      </div>
    </Container>
  )
}

export default render(Plugin)
