import { Button, Container, render, VerticalSpace } from "@create-figma-plugin/ui"
import { emit, on } from "@create-figma-plugin/utilities"
import { h } from "preact"
import { useCallback, useEffect, useRef, useState } from "preact/hooks"

import { ApplyPerspectiveEffectHandler, ResImageDataHandler } from "./types"

function Plugin() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleInsertCodeButtonClick = useCallback(
    function () {
      emit<ApplyPerspectiveEffectHandler>("APPLY_PERSPECTIVE_EFFECT", code)
    },
    [code]
  )
  useEffect(() => {
    on<ResImageDataHandler>("RES_IMAGE_DATA", (data) => {
      if (canvasRef.current === null) return

      const ctx = canvasRef.current.getContext("2d")
      decode(canvasRef.current, ctx!, data, { width: 100, height: 150 })
    })
  }, [canvasRef.current])

  return (
    <Container
      space='medium'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexGrow: 1
      }}
    >
      <canvas ref={canvasRef} width='300' height='500' />
      <div style={{ width: "100%", marginTop: "10px" }}>
        <Button fullWidth style={{ width: "100%" }} onClick={handleInsertCodeButtonClick}>
          Apply Perspective Effect
        </Button>
      </div>
    </Container>
  )
}

// Encoding an image is also done by sticking pixels in an
// HTML canvas and by asking the canvas to serialize it into
// an actual PNG file via canvas.toBlob().
async function encode(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  imageData: ImageData
) {
  ctx.putImageData(imageData, 0, 0)
  return await new Promise<Uint8Array>((resolve, reject) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer))
      reader.onerror = () => reject(new Error("Could not read from blob"))
      reader.readAsArrayBuffer(blob!)
    })
  })
}

// Decoding an image can be done by sticking it in an HTML
// canvas, as we can read individual pixels off the canvas.
async function decode(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  bytes: Uint8Array,
  { width, height }: { width?: number; height?: number } = {}
) {
  const url = URL.createObjectURL(new Blob([bytes]))
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
  canvas.width = width || image.width
  canvas.height = height || image.height
  ctx.drawImage(image, 0, 0, width || image.width, height || image.height)
  const imageData = ctx.getImageData(0, 0, width || image.width, height || image.height)
  return imageData
}

export default render(Plugin)
