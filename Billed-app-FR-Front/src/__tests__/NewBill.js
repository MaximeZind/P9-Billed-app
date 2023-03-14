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
    describe("When I submit a new file for upload in the wrong format", () => {
      test("Then the error message will be visible", () => {
        const handleChangeFile = jest.fn(NewBill.handleChangeFile)
        const fileInput = screen.getByTestId("file");
        fileInput.addEventListener('change', handleChangeFile)
        fireEvent.change(fileInput, {
          target: {
            files: [new File(['file content'], 'file.pdf', { type: 'pdf' })],
          },
        });
        console.log(fileInput.files[0].name)
        expect(handleChangeFile).toHaveReturnedWith(false);
      })
    })
    describe("When I submit a new file for upload in the right format", () => {
      test("Then the error message will be hidden", () => {
        const handleChangeFile = jest.fn(NewBill.handleChangeFile)
        const fileInput = screen.getByTestId("file");
        fileInput.addEventListener('change', handleChangeFile)
        fireEvent.change(fileInput, {
          target: {
            files: [new File(['file content'], 'file.jpg', { type: 'image/jpeg' })],
          },
        });
        expect(fileInput.files[0].name).toBe("file.jpg");
      })
    })
  })
})
