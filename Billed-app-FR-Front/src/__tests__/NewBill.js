/**
 * @jest-environment jsdom
 */

import { fireEvent, getByTestId, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
    describe("When I submit a new file for upload", () => {
      test("Then the file will have to be in the right format", () => {
        const fileInput = screen.getByTestId("file")
        const regex = /((.jpg)|(.jpeg)|(.png))$/
        if (regex.test(fileInput.value)){
          fireEvent.change(fileInput)
          expect(fileInput.dataset.errorVisible === false)
        } else if (!regex.test(fileInput.value)){
          fireEvent.change(fileInput)
          expect((fileInput.value.errorVisible === true) && (fileInput.value === ''))
        }
      })
    })
  })
})
