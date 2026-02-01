# SKILL: PYTHON AI & HUGGING FACE

## 1. GRADIO UI PATTERN

- Use `gradio.Blocks` for custom layouts.
- Always wrap main logic in `if __name__ == "__main__": demo.launch()`.
- Example:
  ```python
  import gradio as gr
  with gr.Blocks() as demo:
      inp = gr.Image(type="pil")
      out = gr.Image()
      btn = gr.Button("Run")
      btn.click(fn=process_fn, inputs=inp, outputs=out)
  ```
