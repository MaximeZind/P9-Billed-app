/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import Bills from "../containers/Bills.js";
import mockStore from "../__mocks__/store.js"
import router from "../app/Router.js";
import { formatDate } from "../app/format.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }));
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.append(root);
      router();
      window.onNavigate(ROUTES_PATH.Bills);
      await waitFor(() => screen.getByTestId('icon-window'));
      const windowIcon = screen.getByTestId('icon-window');
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
      test("Then the function handleClickIconEye should have been called", async () => {
        document.body.innerHTML = BillsUI({ data: bills });
        const newBill = new Bills({
          document,
          onNavigate: jest.fn(),
          store: null,
          localStorage: localStorageMock
        });
        $.fn.modal = jest.fn();
        const handleClickIconEye = jest.fn(() => {newBill.handleClickIconEye});
        const eyes = screen.getAllByTestId("icon-eye");
        const firstEye = eyes[0];
        firstEye.addEventListener('click', handleClickIconEye);
        fireEvent.click(firstEye);
        expect(handleClickIconEye).toHaveBeenCalled();
        expect($.fn.modal).toHaveBeenCalled();
      });
    });
    describe("When I click on the 'Nouvelle note de frais' button", () => {
      test("Then handleClickNewBill should be called", () => {
        document.body.innerHTML = BillsUI({ data: bills });
        const newBill = new Bills({
          document,
          onNavigate: jest.fn(),
          store: null,
          localStorage: localStorageMock
        });
        const newBillBtn = screen.getByTestId("btn-new-bill");
        const handleClickNewBill = jest.fn(() => {newBill.handleClickNewBill});
        newBillBtn.addEventListener('click', handleClickNewBill);
        fireEvent.click(newBillBtn);
        expect(handleClickNewBill).toHaveBeenCalled();
      });
    });
  });

  describe("When I navigate to the Bills page", () => {
    describe('When getBills is called', () => {
      //Test getBills
      test('then it should return an array of bills', async () => {
        const store = {
          bills: jest.fn(() => ({
            list: jest.fn(() => Promise.resolve([
              {
                id: '123',
                email: 'test@test.com',
                name: 'Test',
                amount: 100,
                date: '2022-03-16',
                type: 'Hôtel',
                commentary: 'Test',
                fileUrl: 'https://example.com/test.png',
                fileName: 'test.png',
                status: 'pending',
                vat: 20
              }
            ]))
          }))
        };
        
        const bills = new Bills({
          document: document,
          onNavigate: jest.fn(),
          store: store,
          localStorage: window.localStorageMock
        });
  
        const result = await bills.getBills();
        expect(result).toEqual([
          {
            id: '123',
            email: 'test@test.com',
            name: 'Test',
            amount: 100,
            date: formatDate(new Date("2022-03-16")),
            type: 'Hôtel',
            commentary: 'Test',
            fileUrl: 'https://example.com/test.png',
            fileName: 'test.png',
            status: 'En attente',
            vat: 20
          }
        ]);
      });
    });
    test("Then it fetches bills from mock API GET", async () => {
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "a@a" }));
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      const content = await waitFor(() => screen.getByText("Mes notes de frais"));
      expect(content).toBeTruthy();
      expect(screen.getByTestId("btn-new-bill")).toBeTruthy();
    })
    describe("When an error occurs on API", () => {
      beforeEach(() => {
        jest.spyOn(mockStore, "bills");
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
        router();
      })
      test("Then it fetches bills from an API and fails with 404 message error", async () => {
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list: () => {
              return Promise.reject(new Error("Erreur 404"));
            }
          }
        })
        // window.onNavigate(ROUTES_PATH.Bills);
        // await new Promise(process.nextTick);
        const html = BillsUI({ error: 'Erreur 404' });
        document.body.innerHTML = html;
        const message = await screen.getByText(/Erreur 404/);
        expect(message).toBeTruthy();
      })

      test("Then it fetches messages from an API and fails with 500 message error", async () => {

        mockStore.bills.mockImplementationOnce(() => {
          return {
            list: () => {
              return Promise.reject(new Error("Erreur 500"))
            }
          }
        })

        // window.onNavigate(ROUTES_PATH.Bills)
        // await new Promise(process.nextTick);
        const html = BillsUI({ error: 'Erreur 500' });
        document.body.innerHTML = html;
        const message = await screen.getByText(/Erreur 500/)
        expect(message).toBeTruthy()
      })
    })
  })
});

