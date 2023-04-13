/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js"
import store from "../__mocks__/store.js"
import { ROUTES_PATH } from '../constants/routes.js'
import router from "../app/Router.js";

describe("Given I'm connected as an employee on the NewBill page", () => {
  let newBill;
  beforeEach(() => {
    document.body.innerHTML = NewBillUI();
    Object.defineProperty(window, "localStorage", {value: localStorageMock});
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
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const fileInput = screen.getByTestId("file");
        fileInput.addEventListener("change", handleChangeFile);
        const file = new File(["test"], "test.pdf", { type: "application/pdf" });
        const event = { target: { files: [file] }}; 
        fireEvent.change(fileInput, event);
        expect(handleChangeFile).toHaveReturnedWith(false);
      });
    });
    describe("When I select a file to upload that is .jpg .jpeg or .png", () => {
      test("Then the form should contain the file", () => {
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const fileInput = screen.getByTestId("file");
        fileInput.addEventListener("change", handleChangeFile);
        const file = new File(["test"], "test.jpg", { type: "image/jpg" });
        const event = { target: { files: [file] }}; 
        fireEvent.change(fileInput, event);
        expect(fileInput.files[0].name).toBe("test.jpg");
      });
    });


    //test fonctionnel
    describe("When I submit a new bill in the form", () => {
      test("Then handleSubmit should've been called", () => {
        const form = screen.getByTestId("form-new-bill");
        const handleSubmit = jest.fn(newBill.handleSubmit);
        form.addEventListener('submit', handleSubmit);
        fireEvent.submit(form);
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
    describe("When I naviguate to the NewBill page", () => {
      beforeEach(() => {
        Object.defineProperty(
          window,
          'localStorage',
          { value: localStorageMock }
        );
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee',
          email: "a@a"
        }));
        const root = document.createElement("div");
        root.setAttribute("id", "root");
        document.body.appendChild(root);
      });
      test("Then it should show the Newbill content", async() => {
        localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "a@a" }));
        const root = document.createElement("div")
        root.setAttribute("id", "root")
        document.body.append(root)
        router()
        window.onNavigate(ROUTES_PATH.NewBill)
        const content = await screen.getAllByText("Envoyer une note de frais");
        expect(content).toBeTruthy();
      });
    });
    describe("When I submit a form", () => {
      describe("When there is a mistake in the form", () => {
        test()
      });
    });
});

