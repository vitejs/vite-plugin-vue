// this file will become a TypeScope through option `script.globalTypeFiles`
// which has a circular reference on `TypeScope._ownerScope` (issue 325)

declare namespace App {
  interface User {
    name: string
  }
}
