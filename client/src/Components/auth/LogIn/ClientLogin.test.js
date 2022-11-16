
import ClientLogin from "./ClientLogin";
import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom';
import SignIn from "./Login";
/*global document */


describe("Button Component" ,() => {
  render(<SignIn />); 
  const button = screen.getByTestId("button"); 
    
  // Test 1
  test("Button Rendering", () => {
      expect(button).toBeInTheDocument(); 
  })

  // Test 2 
  test("Button Text", () => {
      expect(button).toHaveTextContent("Click Me!"); 
  })
})

// /**
//  * @jest-environment jsdom
//  */
// test("user id input should be rendered", () => {
//   render(<ClientLogin />);
//   // const useridInputEl = screen.getByPlaceholderText(/user id/i);
//   const useridInputEl = screen.getByText("CLIENT LOGIN");
//   expect(useridInputEl).toBeInTheDocument();
// });

// // describe(ClientLogin, () => {
// //   it("user id input should be rendered", () => {
// //     const {getByTestId} = render(<ClientLogin/>);
// //     const useridInputEl = getByTestId("count").textContent;
// //     expect(useridInputEl).toEqual(0);

// //   });
// // });

// test('test', () => {
//   expect(true).toBe(true);
// })