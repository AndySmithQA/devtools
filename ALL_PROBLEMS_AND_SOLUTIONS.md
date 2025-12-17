# All Problems and Solutions

This document consolidates every lab/scenario problem across all modules and their solutions. Use it as an instructor reference or an answer key for students after attempting each exercise.

---

## Module 2 — Console & JavaScript Debugging

### Lab 1 — Console Logging Best Practices
- Problems:
  - Unstructured, noisy console logs make data flow unclear.
  - Same generic messages ("Filtered") used for multiple branches.
  - Arrays of objects logged as raw arrays; complex calculations not grouped.
  - No logging for state-changing actions (e.g., adding a product).
- Solutions:
  - Use `console.group()` / `console.groupEnd()` to organize related logs.
  - Prefer `console.table(products)` for arrays of objects.
  - Use labeled, structured logs: `console.log({ filter, resultCount: result.length })`.
  - Log distinct branches: `console.info('Filter: inStock')`, etc.
  - Use `console.warn()` for empty results and `console.time()/timeEnd()` when timing helps.
  - Add action logs for mutations (e.g., add product) with the payload.

### Lab 2 — Reading Error Messages & Stack Traces
- Problems:
  - Null reference: `user.email` when `user` may be undefined.
  - Using array methods on `undefined`: calling `filter` on a non-array.
  - Calling a non-existent function: `(data as any).format()`.
  - Type coercion: concatenating strings instead of numeric addition.
- Solutions:
  - Guard for missing user: `if (!user) throw new Error('User not found');` or optional chaining.
  - Ensure you filter a real array: return `users.filter(...)` when term present; never filter `undefined`.
  - Remove invalid method call or implement the formatter: e.g., `return data` or provide a real `format()`.
  - Convert strings to numbers before arithmetic: `Number(base) + Number(bonus) + userId`.

### Lab 3 — Debugging Async/Await and Promises
- Problems:
  - Random failures rejected as strings; unhandled promise rejections.
  - Missing `try/catch` around `await` path.
  - Not validating response shape before using `response.data`.
  - Promise chain without `.catch()`; loading never resets on error.
  - Race condition when iterating async calls with `forEach` and updating state repeatedly.
  - Loading state set to false before async operations finish.
  - Event handler that awaits without error handling.
- Solutions:
  - Wrap awaits: `try { const res = await fetchWeatherData(city); } catch (e) { setError(String(e)); } finally { setLoading(false); }`.
  - Normalize rejections to `Error` or consistent objects; always handle `.catch` in chains.
  - Validate response: `if (!res.success || !res.data) throw new Error('Invalid response');`.
  - Use `Promise.all(cities.map(fetchWeatherData))` then one `setWeather` or aggregate safely.
  - Move `setLoading(false)` to a `finally` block.
  - Never assume `data!`; prefer null checks with early returns and user feedback.

### Lab 4 — Breakpoint Practice (Nested Logic)
- Problems:
  - Tax is added to income instead of subtracted.
  - Discount increases expense using `(1 + discount)` rather than reducing it.
  - Average divides by `length - 1` instead of `length`.
  - Savings rate formula incorrect.
- Solutions:
  - Subtract tax: `processed = processed - tax` (income path).
  - Apply discount correctly: `expense * (1 - discount)`.
  - Average: `sum / categoryTransactions.length` (guard zero length).
  - Savings rate: `(netProcessed / processedIncome) * 100` or desired metric; ensure consistent numerator/denominator.

---

## Module 3 — Network & HTTP

### Lab 1 — HTTP Status Codes
- Problems (scenarios to recognize):
  - 2xx (200/201/204) vs 4xx (400/401/403/404/422) vs 5xx (500+); timeouts/slow requests.
- Solutions (expected handling strategies):
  - Inspect status codes in Network panel; branch UI behavior per code.
  - 400/422: show validation errors; 401: prompt login/refresh token; 403: show permission message; 404: show “not found”.
  - Handle 204 with no body; guard JSON parsing accordingly.
  - Timeouts/slow: show spinner with cancel/retry.

### Lab 2 — CORS Issues
- Problems:
  - External APIs without proper `Access-Control-*` headers cause CORS failures.
  - Credentialed requests require `Access-Control-Allow-Credentials: true` and matching `Origin`.
  - Preflight (OPTIONS) failures when custom headers/methods present.
- Solutions:
  - Backend: enable CORS with appropriate `Access-Control-Allow-Origin`, `-Methods`, `-Headers`, and `-Credentials`.
  - Dev: configure a proxy (e.g., Vite devServer proxy) to same origin during development.
  - Understand preflight: ensure server handles OPTIONS and returns correct headers.
  - Never disable browser security; fix at server or via proxy.

### Lab 3 — Authentication & Authorization
- Problems:
  - Missing `Authorization` header.
  - Wrong format (e.g., `InvalidToken123` instead of `Bearer <token>`).
  - Confusing 401 (Unauthenticated) vs 403 (Authenticated but forbidden).
- Solutions:
  - Obtain token via login, store securely, and send `Authorization: Bearer {token}`.
  - For 401: refresh/login; for 403: check roles/permissions and endpoint access.
  - Inspect Network → Request Headers and Response for precise failures; never guess.

### Lab 4 — Payload Debugging
- Problems:
  - Numbers sent as strings; missing required fields.
  - Extra unknown fields; wrong nested structure.
  - Sending JSON string instead of object; arrays where object expected.
  - Date formats: `Date` object or timestamp vs required ISO string.
- Solutions:
  - Validate and coerce types before sending; use schemas if possible.
  - Include only documented fields; match expected structure.
  - Send objects, not pre-serialized JSON strings (let `axios` handle JSON).
  - Convert dates: `new Date().toISOString()`; align with backend contract.

---

## Module 4 — React DevTools

### Lab 1 — State Not Updating
- Problems:
  - Direct mutation of state objects/arrays (React can’t detect changes).
  - Stale closure when batching rapid updates.
  - Reading state immediately after `setState` expecting it to be updated synchronously.
  - Using mutating array methods (`splice`, `push`) on state arrays.
- Solutions:
  - Always create new objects/arrays: `setTodos(prev => prev.map(...))`, `filter`, `slice`, spread, etc.
  - Use functional updates when next state depends on previous: `setCount(c => c + 1)`.
  - Don’t rely on immediate state after `setState`; read from updater or next render.
  - Replace mutations with immutable patterns (e.g., `filter` for delete).

### Lab 2 — Unnecessary Re-renders
- Problems:
  - Creating new objects/arrays/functions inline each render; expensive components re-render needlessly.
- Solutions:
  - Memoize components: `React.memo(Component)` when props stable.
  - Memoize calculations with `useMemo` and callbacks with `useCallback`.
  - Move stable data outside component or memoize it.
  - Use Profiler and “Highlight updates when components render” to verify improvements.

### Lab 3 — useEffect Dependencies
- Problems:
  - Missing dependencies: effect won’t re-run when `userId` changes.
  - Effect depends on an inline function (`fetchUserData`) recreated every render.
  - Too many deps: including `count` causes unnecessary re-runs.
  - Using `count` inside effect without listing it; stale values.
  - Object in deps (`config`) recreated each render → perpetual runs.
- Solutions:
  - Include all used values in dep array: `useEffect(..., [userId])`.
  - Move functions inside effect or wrap with `useCallback`.
  - Keep dep arrays minimal and correct; use functional `setState(prev => ...)` to avoid listing state.
  - Memoize objects/arrays used as deps with `useMemo`.

### Lab 4 — Prop Drilling & Component Tree
- Problems:
  - Props passed through multiple intermediate layers; unused props forwarded.
  - Theme/handlers flow through deep trees making tracking difficult.
- Solutions:
  - Use Context API for shared values (theme, user, handlers).
  - Prefer composition over prop chains; lift state closer to use site.
  - Consider state management libraries for complex trees.

---

## Module 5 — End-to-End Scenarios

### Scenario 1 — API Succeeds But Data Doesn’t Show
- Problems:
  - Wrong response path: uses `response.data` instead of `response.data.data`.
  - `products` may become an object, not array; later `.map` fails silently.
  - `useEffect` missing `selectedCategory` in deps; filter not reactive.
  - Case-sensitive category comparison hides matches.
  - Rendering assumes `filteredProducts` is a valid array.
- Solutions:
  - Extract correctly: `const data = response.data.data`.
  - Guard and set: `Array.isArray(data) ? setProducts(data) : setProducts([])`.
  - Add dependency: `useEffect(() => { fetchProducts(); }, [selectedCategory])`.
  - Case-insensitive filter: `product.category.toLowerCase() === selectedCategory.toLowerCase()`.
  - Guard render on array and show empty state when none.

### Scenario 2 — Loading State Never Ends
- Problems:
  - No validation → API 400s; price sent as string.
  - `setLoading(false)` missing in `catch`; no `finally` block.
  - Random failure path forgets to reset loading.
- Solutions:
  - Validate inputs early; convert `price` to number or show error.
  - Always reset loading in `finally` or every error path.
  - Example:
    ```ts
    try { await axios.post(...); }
    catch (e) { setResult(parseError(e)); }
    finally { setLoading(false); }
    ```

### Scenario 3 — Silent API Failures
- Problems:
  - Failing endpoints (`/api/todos`) with no user-facing error.
  - Optimistic UI updates without rollback.
  - Adding/deleting proceeds in UI even when API fails → state drift.
- Solutions:
  - Show errors to users (alerts, toasts, inline messages) and set explicit error state.
  - Prefer pessimistic updates or implement rollback for optimistic updates:
    ```ts
    const prev = todos; setTodos(next);
    try { await axios.put(...); } catch { setTodos(prev); alert('Update failed'); }
    ```
  - Only update UI after successful responses; update IDs from server replies.

---

## Cross-Cutting Best Practices
- Always inspect Network panel: status, request/response headers, payload, and timing.
- Use Console with structured logs; avoid generic, repeated messages.
- Prefer immutable state updates; leverage functional setState.
- Use `try/catch/finally` around async operations; handle all branches.
- Validate inputs and payload types before sending; align with API contract.
- Memoize expensive computations and referentially unstable values when needed.
- For effects, include all dependencies or use functional updates to avoid listing state.
