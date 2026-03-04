# Technical Knowledge Base & Portfolio

This project is a high-performance, interactive **Knowledge Base** designed to demonstrate the practical application of **Frontend, Backend, and System Design** principles—such as **Graceful Degradation**, **Type Safety**, and **E2E Testing**—in real-world scenarios.



## Tech Stack

* **Frontend:** `React 19` + `TypeScript` + `Vite`
* **Styling:** `Material UI (MUI)` & `Tailwind CSS`
* **Animations:** `Framer Motion` (3D Flip Cards & Layout Transitions)
* **Testing:** `Cypress` (End-to-End Testing)
* **State & Data:** `Axios` & `React Router Dom`
* **Backend:** `Node.js` / `Express` (Integrated with `MongoDB Atlas`)

---

## Architectural Highlights & "Senior" Approaches

### 1. Graceful Degradation (Resilient Systems)
A common misconception in system design is assuming that external services (like databases) will always be available. In this project:
* **Guard Clauses:** If the MongoDB connection fails or hits an IP restriction, the application instantly detects `mongoose.connection.readyState !== 1` and serves a **Fallback Dataset**.
* **UX Continuity:** The user never experiences a blank screen or an infinite loading spinner; the UI remains fully functional using local fallback modules.

### 2. E2E Testing with Cypress
Critical user paths (Happy Paths) and edge-case failure scenarios are shielded with **Cypress**:
* **Localization Verification:** Ensuring `TR/EN` language switching works seamlessly across the UI.
* **Resilience Testing:** Verifying the system doesn't crash when the API returns a `500 error` by mocking failure responses.
* **Interactive UI:** Automated testing for 3D card rotations and Z-axis depth triggers.

### 3. "Above the Fold" Optimization
For a superior User Experience (UX), stats and key highlights are optimized using a **100vh Layout Strategy**. By leveraging **Flexbox**, the core content remains visible without scrolling across all screen sizes, ensuring high engagement from the first second.

---

## Installation & Setup

To run this project locally:

```bash
# 1. Clone the repository
git clone [https://github.com/aysead/portfolio-frontend.git](https://github.com/aysead/portfolio-frontend.git)

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Run Cypress tests (Headless mode)
npx cypress run
```


## 🧪 Testing & Quality Assurance

To watch the tests run in the Cypress interactive browser:

```bash
npx cypress open
```

---

## 📝 Technical Case Study (Medium)

I have documented the **IPv4/IPv6** network troubleshooting, the **Mongoose state management**, and the architectural decisions behind this project on Medium:

👉 **[Read the Full Article Here](https://medium.com/@ayseadagci)**

---

## 📬 Contact

**Ayse A. Dağcı** - *Full Stack Developer*

* **GitHub:** [github.com/aysead](https://github.com/aysead)
* **LinkedIn:** linkedin.com Ayse Asena Dagci

---

> *Generated with a focus on **System Resilience** and **Clean Code**.*
