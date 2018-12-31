import * as React from "react"
import { FormState, FieldState } from "formstate"

import { Store } from "../Store"

function ishex160(s: string): boolean {
  // FIXME: verify is hexadecimal...
  return s.slice(0, 2) === "0x" && s.length === 42
}

export class MintFormState {
  public userName = new FieldState("").validators((val) => {
   // return (isNaN(val) || val <= 0) && "amount must be greater than 0"
   return (val === "" && "User Name must not be empty" )
  })

  public gName = new FieldState("").validators((val) => {
   // return (val === "" && "address must not be empty") || (!ishex160(val) && "address invalid")
   return (val === "" && "Group Name must not be empty" )
  })

  public form = new FormState({
    userName: this.userName,
    gName: this.gName,
  })

  constructor(private store: Store) {
  }

  public onSubmit = async () => {
    const res = await this.form.validate()

    if (res.hasError) {
      console.log("mint form errors", this.form.error)
      return
    }

    // kinda ugly...
    const userName = this.userName.$
    const gName = this.gName.$

    console.log("createContract", [gName, userName])
    this.store.createContract(gName, userName)
  }
}
