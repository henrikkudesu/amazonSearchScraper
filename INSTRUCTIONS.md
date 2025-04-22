# Task Requirements

## Objective

Create a simple script to scrape Amazon product listings from the first page of search results for a given keyword.

---

## Backend/API (Bun)

- Set up a **Bun** project and install the required dependencies:  
  `express`, `axios`, `jsdom`

- Create an Express server with a GET endpoint:  
  **`/api/scrape?keyword=yourKeyword`**

- The handler should:
  1. Use Axios to fetch the Amazon search results page based on the provided keyword.
  2. Use JSDOM to parse the returned HTML content.
  3. Extract the following for **each product** on the **first page only**:
     - Product Title
     - Rating (stars out of five)
     - Number of Reviews
     - Product Image URL
  4. Return a JSON response with the structured data.

---

## Frontend (Vite + Vanilla JS)

- Use **Vite** to scaffold a basic project.
- The frontend must:

  - Include an input field to type a product keyword.
  - A button to submit the request.
  - Display the scraped data in a clean, formatted UI.

- Use **AJAX (fetch API)** to make a GET request to `/api/scrape`.

- Apply basic CSS to make the interface clean and user-friendly.

---

## Documentation

- Comment your code meaningfully — explain non-obvious logic and edge case handling.
- Include a `README.md` with:
  - How to install dependencies
  - How to run both the backend and frontend
  - Example usage

---

## Considerations

- Handle errors gracefully on both frontend and backend (e.g. invalid keyword, network failure, Amazon blocking request).
- Ensure the code is easy to read and follow.
- Provide clear folder structure and project organization.
- Avoid hardcoding where possible. Keep config options (like base URLs) in constants.
- Use async/await for async operations.

---

# Coding Guidelines and Best Practices

The following rules must be followed in all generated code:

## ✅ Clean Code Principles

1. **Readable Names**: Use clear, descriptive variable and function names. Prefer clarity over brevity.
2. **Single Responsibility**: Each function/module should do one thing and do it well.
3. **DRY** (Don't Repeat Yourself): Avoid duplicated logic by abstracting it into functions/modules.
4. **KISS** (Keep It Simple, Stupid): Avoid overengineering. Prefer simple, working solutions.

---

## ✅ Design Patterns (Recommended)

- Use the **Modular Pattern**:
  - Separate logic into reusable modules (e.g., scraper logic, fetch helpers).
- Use a basic **Controller pattern**:
  - Treat your Express routes as “controllers” that delegate logic to service modules.

---

## ✅ Error Handling

- Wrap all async logic with try/catch.
- Return informative messages and appropriate status codes on errors.
- Show user-friendly messages on the frontend (e.g. “Failed to fetch data, please try again”).

---

## ✅ Modern JavaScript/TypeScript Practices

- Use `const` and `let` appropriately.
- Prefer `async/await` over `.then()`.
- Use template literals instead of string concatenation.
- Use optional chaining (`?.`) and nullish coalescing (`??`) where it helps.
- Use Vanilla Javascript instead of Typescripy

---

Copilot: Use this instruction set as a guideline for all code generation in this project. Prioritize readability, modularity, and scalability. If unsure about structure, always prefer breaking things into smaller, single-purpose functions.
