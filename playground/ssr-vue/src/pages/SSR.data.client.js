export default async function data() {
  await sleep(1000)
  return '[success] Server-side fetched data from external resource'
}
