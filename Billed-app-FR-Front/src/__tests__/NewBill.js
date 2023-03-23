/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js"
import store from "../__mocks__/store.js"

describe("Given I'm connected as an employee", () => {
  let newBill;
  beforeEach(() => {
    document.body.innerHTML = NewBillUI();
    Object.defineProperty(window, "localStorage", {value: localStorageMock});
    // console.log(localStorageMock);
    window.localStorage.setItem("user", JSON.stringify({type: "Employee", email: "employee@test.fr"}));
    newBill = new NewBill({
      document,
      onNavigate: jest.fn(),
      store: store,
      localStorage: localStorageMock
    });
  });
    describe("When I select a file to upload that is not .jpg .jpeg or .png", () => {
      test("Then the form should be empty", () => {
        console.log(newBill);
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const fileInput = screen.getByTestId("file");
        fileInput.addEventListener("change", handleChangeFile);
        const file = new File(["test"], "test.pdf", { type: "application/pdf" });
        const event = { target: { files: [file] }}; 
        console.log('fireEvent');
        fireEvent.change(fileInput, event);
        // expect(handleChangeFile).toHaveBeenCalled();
        expect(handleChangeFile).toHaveReturnedWith(false);
      });
    });
    describe("When I select a file to upload that is .jpg .jpeg or .png", () => {
      test("Then the form should contain the file", () => {
        console.log(newBill);
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const fileInput = screen.getByTestId("file");
        fileInput.addEventListener("change", handleChangeFile);
        const file = new File(["test"], "test.jpg", { type: "image/jpg" });
        const event = { target: { files: [file] }}; 
        fireEvent.change(fileInput, event);
        expect(fileInput.files[0].name).toBe("test.jpg");
      });
    });
});


// describe("Given je suis un employee", () => {
//   let newBill;

//   beforeEach(() => {
//     document.body.innerHTML = NewBillUI();
//     newBill = new NewBill({
//       document,
//       onNavigate: jest.fn(),
//       store: store,
//       localStorage: localStorageMock,
//     });
//     console.log(newBill)
//   });

//   describe("Given je suis sur la page", () => {
//     describe("When on passe une image", () => {
//       test("Then bien", () => {
//         const handleChangeFile = newBill.handleChangeFile;
//         const input = screen.getByTestId("file");
      //   const file = new File(["test"], "test.png", { type: "image/png" });
      //   const event = { target: { files: [file] }, preventDefault: jest.fn() }; // Ajout de la méthode preventDefault()
      //   fireEvent.change(input, event);
      //   expect(input.files[0]).toStrictEqual(file);
      // });
//     });
    

//     describe("When on ne passe pas une image", () => {
//       test("Then pas bien", () => {
//         const handleChangeFile = newBill.handleChangeFile;
//         const input = screen.getByTestId("file");
//         const file = new File(["test"], "test.txt", { type: "text/plain" }); // Type de fichier incorrect
//         const event = { target: { files: [file] }, preventDefault: jest.fn() }; // Ajout de la méthode preventDefault()
//         fireEvent.change(input, event);
//         expect(input.files[0].name).toBe(""); // Vérification que le nom du fichier est vide
//       });
//     });
    
//   });
// });


// describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     describe('When I select a file to upload in the wrong format', () => {
//       test('The input should be empty', () => {
//         const newBill = new NewBill({
//           document,
//           onNavigate: jest.fn(),
//           store: {},
//           localStorage,
//         });
//         const spyHandleChangeFile = jest.spyOn(newBill, "handleChangeFile");

//         const fileInput = screen.getByTestId("file");
//         const file = new File(['file content'], 'file.pdf', { type: 'pdf' });
//         console.log('file:', file);
//         fireEvent.change(fileInput, {
//         target: {
//          files: [file],
//         },
//  });
// console.log(fileInput.files[0].name);
// console.log(fileInput.value);
// expect(spyHandleChangeFile).toHaveBeenCalled();
// expect(fileInput.files[0].name).toBe("");
//       })
//     })
//   })
// })
