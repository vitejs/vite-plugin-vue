export default async function data() {
  await sleep(1000)
  return '[success] Client-side fetched data from external resource'
}
