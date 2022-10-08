import { Button, Container, render, VerticalSpace } from "@create-figma-plugin/ui"
import { emit } from "@create-figma-plugin/utilities"
import { h } from "preact"
import { useCallback, useState } from "preact/hooks"

import { InsertCodeHandler } from "./types"

function Plugin() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
  const handleInsertCodeButtonClick = useCallback(
    function () {
      emit<InsertCodeHandler>("INSERT_CODE", code)
    },
    [code]
  )
  return (
    <Container space='medium'>
      <VerticalSpace space='small' />
      <VerticalSpace space='large' />
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        Insert Code
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}

export default render(Plugin)
