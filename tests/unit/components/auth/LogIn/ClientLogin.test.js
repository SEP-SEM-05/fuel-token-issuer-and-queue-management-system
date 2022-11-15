import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClientLogin from "../../../../../client/src/Components/auth/LogIn/ClientLogin";

/*global document */


/**
 * @jest-environment jsdom
 */
test("user id input should be rendered", () => {
    render(<ClientLogin />);
    // const useridInputEl = screen.getByPlaceholderText(/user id/i);
    console.log("mudiyala");
    const useridInputEl = screen.getByPlaceholderText(/user id/i);
    expect(useridInputEl).toBeInTheDocument();
  });

// describe(ClientLogin, () => {
//   it("user id input should be rendered", () => {
//     const {getByTestId} = render(<ClientLogin/>);
//     const useridInputEl = getByTestId("count").textContent;
//     expect(useridInputEl).toEqual(0);

//   });
// });

test('test', () => {
  expect(true).toBe(true);
})