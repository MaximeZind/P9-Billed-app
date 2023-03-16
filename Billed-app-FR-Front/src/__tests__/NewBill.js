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
    describe('handleChangeFile', () => {
      test('should update state with the selected file', () => {
        const handleChangeFile = jest.fn(NewBill.handleChangeFile)
        const mockEvent = {
          target: {
            files: [
              new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })
            ]
          }
        };
    
        const mockSetBill = jest.fn();
        handleChangeFile(mockEvent, mockSetBill);
    
        expect(mockSetBill).toHaveBeenCalledWith({
          fileUrl: '',
          file: mockEvent.target.files[0],
          type: '',
          commentary: '',
          name: ''
        });
      });
    });
    // describe("When I select a file with the wrong format", () => {
    //   // Define a test case that checks whether an error message is displayed when the user selects a file with the wrong format.
    //   test("Then an error message is displayed", () => {
    //     // Create a mock store object with a mock `create()` function that returns a Jest mock function.
    //     const mockStore = { bills: () => ({ create: jest.fn() }) }
    //     // Create a mock local storage object with a mock `getItem()` function that returns a stringified JSON object with an email property.
    //     const mockLocalStorage = { getItem: jest.fn(() => JSON.stringify({ email: "test@test.com" })) }
    //     // Spy on the `handleChangeFile()` method of the `NewBill` component.
    //     const handleChangeFile = jest.spyOn(NewBill.prototype, "handleChangeFile")
    //     // Create a new instance of the `NewBill` component with the mock store and local storage objects.
    //     const newBill = new NewBill({ document, onNavigate: jest.fn(), store: mockStore, localStorage: mockLocalStorage })
    //     // Get the file input element from the DOM using its `data-testid` attribute.
    //     const fileInput = screen.getByTestId("file")
    //     // Get the error message span element from the DOM using its `data-testid` attribute.
    //     const errorSpan = screen.getByTestId("file-error")
    //     // Fire a `change` event on the file input element with a mock file object that has the wrong format.
    //     fireEvent.change(fileInput, {
    //       target: {
    //         files: [new File(['file content'], 'file.pdf', { type: 'pdf' })],
    //       },
    //     })
    //     // Assert that the `handleChangeFile()` method was called during the `change` event.
    //     expect(handleChangeFile).toHaveBeenCalled()
    //     // Assert that the value of the file input element is empty after the `change` event.
    //     expect(fileInput.value).toBe("")
    //     // Assert that the error message span element has the correct attributes after the `change` event.
    //     expect(errorSpan).toHaveAttribute("data-error-visible", "true")
    //     expect(errorSpan).toHaveAttribute("data-error", "Vous devez soumettre un fichier de type .jpg, .jpeg ou .png")
    //   })
    // })
    // describe("When I submit a new file for upload in the wrong format", () => {
    //   test("Then the error message will be visible", () => {
        // const handleChangeFile = jest.fn(NewBill.handleChangeFile)
    //     const fileInput = screen.getByTestId("file");
    //     fileInput.addEventListener('change', handleChangeFile)
    //     fireEvent.change(fileInput, {
    //       target: {
    //         files: [new File(['file content'], 'file.pdf', { type: 'pdf' })],
    //       },
    //     });
    //     console.log(fileInput.files[0].name)
    //     expect(handleChangeFile).toHaveReturnedWith(false);
    //   })
    // })
    // describe("When I submit a new file for upload in the right format", () => {
    //   test("Then the error message will be hidden", () => {
    //     const handleChangeFile = jest.fn(NewBill.handleChangeFile)
    //     const fileInput = screen.getByTestId("file");
    //     fileInput.addEventListener('change', handleChangeFile)
    //     fireEvent.change(fileInput, {
    //       target: {
    //         files: [new File(['file content'], 'file.jpg', { type: 'image/jpeg' })],
    //       },
    //     });
    //     expect(fileInput.files[0].name).toBe("file.jpg");
    //   })
    // })
  })
})
describe("NewBill", () => {
  it("should be able to be instantiated", () => {
    const newBill = new NewBill({
      document: document,
      onNavigate: () => {},
      store: {},
      localStorage: window.localStorage
    })
    expect(newBill).toBeInstanceOf(NewBill)
  })
})