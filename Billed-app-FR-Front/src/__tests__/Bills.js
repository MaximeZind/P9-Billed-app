/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";

import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      //to-do write expect expression
      expect(windowIcon.classList.contains('active-icon')).toBe(true);
    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => (new Date(a) - new Date(b))
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
    describe("When I click on the eye Icon of a Bill", () => {
      test("Then the modal should open and show the right file", async () => {
        const eyes = screen.getAllByTestId("icon-eye");
        const modal = screen.getByTestId("modaleFile");
        await Promise.all(
          eyes.map(async (eye) => {
            console.log("1");
            eye.click();
            await waitFor(() => screen.getByTestId("modal-img"));
            const modalImg = screen.getByTestId("modal-img");
            console.log("2");
            expect(
              modal.classList.contains("show") &&
                modalImg.src === eye.getAttribute("data-bill-url")
            ).toBe(true);
          })
        );
      });
    });
    // describe("When I click on the eye Icon of a Bill", () => {
    //   test("Then the modal should open and show the right file", async () => {
    //     const eyes = screen.getAllByTestId('icon-eye')
    //     const modal = screen.getByTestId('modaleFile')
    //     eyes.forEach( async (eye)=> {
    //       console.log("1")
    //       eye.click()
    //       await waitFor(() => screen.getByTestId('modal-img'))
    //       let modalImg = screen.getByTestId('modal-img')
    //       console.log("2")
    //       expect(modal.classList.contains('show') && modalImg.src === eye.getAttribute("data-bill-url"))
    //     })
    //   })
    // })
  })
})

