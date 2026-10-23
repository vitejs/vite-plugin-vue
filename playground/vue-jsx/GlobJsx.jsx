const pages = import.meta.glob('./glob-pages/*.js')

export default function GlobJsx() {
  return <div class="glob-jsx">{Object.keys(pages).length}</div>
}
