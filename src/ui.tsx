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
    <Container space='medium'>
      <VerticalSpace space='small' />
      <VerticalSpace space='large' />
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        Apply Perspective Effect
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

export default render(Plugin)
