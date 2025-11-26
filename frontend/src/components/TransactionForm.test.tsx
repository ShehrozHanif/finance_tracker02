import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "./TransactionForm"; // Assuming TransactionForm will be created here

describe("TransactionForm", () => {
  it("should display validation errors for invalid input", async () => {
    render(<TransactionForm />);

    // Attempt to submit with empty amount
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));

    expect(await screen.findByText(/Amount is required/i)).toBeInTheDocument();

    // Attempt to submit with amount less than 0
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "-10" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));

    expect(
      await screen.findByText(/Amount must be positive/i),
    ).toBeInTheDocument();

    // Attempt to submit with empty category
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));

    expect(
      await screen.findByText(/Category is required/i),
    ).toBeInTheDocument();
  });
});
