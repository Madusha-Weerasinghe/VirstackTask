document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("clickBtn");
  const modal = document.getElementById("modal");
  const nextBtn = document.getElementById("nextBtn");
  const jobContent = document.getElementById("jobContent");
  const dots = [
    document.getElementById("dot1"),
    document.getElementById("dot2"),
    document.getElementById("dot3"),
  ];

  let currentPage = 1;

  button?.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "flex";
      updateContent();
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentPage === 3) {
      modal.style.display = "none";
      location.reload();
    } else {
      currentPage = (currentPage % 3) + 1;
      updateContent();
    }
  });

  function updateContent() {
    if (!jobContent) {
      return console.error("Error: jobContent element not found!");
    }
    jobContent.innerHTML = "";

    const pages = {
      1: "./firstSection.html",
      2: "./SecondSection.html",
      3: "./thirdSection.html",
    };

    const page = pages[currentPage];
    if (typeof page === "string" && page.includes(".html")) {
      fetch(page)
        .then((response) =>
          response.ok
            ? response.text()
            : Promise.reject(`Failed to load ${page}`)
        )
        .then((data) => {
          jobContent.innerHTML = data;

          if (currentPage === 2) {
            initializeDropdown();
          }
        })
        .catch((error) => console.error(`Error loading ${page}:`, error));
    } else {
      jobContent.textContent = page;
    }

    nextBtn.textContent = currentPage === 3 ? "Create Job" : "Next";

    dots.forEach((dot, index) =>
      dot?.classList.toggle("active", index + 1 === currentPage)
    );
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function waitForTableBody(callback) {
    const interval = setInterval(() => {
      const tableBody = document.getElementById("tableBody");
      const pageInfo = document.getElementById("pageInfo");
      const firstBtn = document.getElementById("firstBtn");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const lastBtn = document.getElementById("lastBtn");
      const searchInput = document.getElementById("searchInput");

      if (
        tableBody &&
        pageInfo &&
        firstBtn &&
        prevBtn &&
        nextBtn &&
        lastBtn &&
        searchInput
      ) {
        clearInterval(interval);
        callback(
          tableBody,
          pageInfo,
          firstBtn,
          prevBtn,
          nextBtn,
          lastBtn,
          searchInput
        );
      }
    }, 500);
  }

  waitForTableBody(
    (tableBody, pageInfo, firstBtn, prevBtn, nextBtn, lastBtn, searchInput) => {
      console.log("Now executing table data script...");

      const data = [
        { org: "Facebook", code: "FBLK", handler: "Christopher" },
        { org: "Google", code: "GOGL", handler: "Amelia" },
        { org: "Microsoft", code: "MSFT", handler: "James" },
        { org: "Apple", code: "APPL", handler: "Sophia" },
        { org: "Amazon", code: "AMZN", handler: "Ethan" },
        { org: "Netflix", code: "NFLX", handler: "Isabella" },
        { org: "Twitter", code: "TWTR", handler: "Mason" },
        { org: "Snapchat", code: "SNAP", handler: "Olivia" },
        { org: "LinkedIn", code: "LNKD", handler: "Benjamin" },
        { org: "Spotify", code: "SPTF", handler: "Emma" },
        { org: "IBM", code: "IBM", handler: "Oliver" },
        { org: "Adobe", code: "ADBE", handler: "Charlotte" },
        { org: "Tesla", code: "TSLA", handler: "Liam" },
        { org: "Uber", code: "UBER", handler: "Mia" },
        { org: "Airbnb", code: "ABNB", handler: "Lucas" },
        { org: "Slack", code: "WORK", handler: "Amos" },
        { org: "Zoom", code: "ZM", handler: "Lily" },
        { org: "Salesforce", code: "CRM", handler: "Jack" },
        { org: "Stripe", code: "STRP", handler: "Grace" },
        { org: "Pinterest", code: "PINS", handler: "Henry" },
        { org: "Shopify", code: "SHOP", handler: "Ella" },
      ];

      const rowsPerPage = 5;
      let currentIndex = 0;
      let selectedCheckboxes = new Set();
      let filteredData = [...data];

      function filterData(query) {
        filteredData = query
          ? data.filter((item) =>
              [item.org, item.code, item.handler].some((val) =>
                val.toLowerCase().includes(query.toLowerCase())
              )
            )
          : [...data];

        currentIndex = 0;
        displayData();
      }

      searchInput.addEventListener("input", (e) => filterData(e.target.value));

      function displayData() {
        tableBody.innerHTML = "";

        const slicedData = filteredData.slice(
          currentIndex,
          currentIndex + rowsPerPage
        );

        slicedData.forEach((item) => {
          const row = document.createElement("div");
          row.className = "table-row";

          const isChecked = selectedCheckboxes.has(item.code);

          row.innerHTML = `
            <span><input type="checkbox" class="rowCheckbox" data-id="${
              item.code
            }" ${isChecked ? "checked" : ""}></span>
            <span>${item.org}</span>
            <span>${item.code}</span>
            <span>${item.handler}</span>
          `;
          tableBody.appendChild(row);
        });

        const start = currentIndex + 1;
        const end = Math.min(currentIndex + rowsPerPage, filteredData.length);
        pageInfo.textContent = `${start}-${end} of ${filteredData.length}`;

        tableBody.querySelectorAll(".rowCheckbox").forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            const id = e.target.getAttribute("data-id");

            if (e.target.checked) {
              selectedCheckboxes.add(id);
            } else {
              selectedCheckboxes.delete(id);
            }
          });
        });

        firstBtn.disabled = prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = lastBtn.disabled =
          currentIndex + rowsPerPage >= filteredData.length;
      }

      function changePage(offset) {
        currentIndex = Math.max(
          0,
          Math.min(filteredData.length - rowsPerPage, currentIndex + offset)
        );
        displayData();
      }

      firstBtn.addEventListener("click", () => changePage(-currentIndex));
      prevBtn.addEventListener("click", () => changePage(-rowsPerPage));
      nextBtn.addEventListener("click", () => changePage(rowsPerPage));

      lastBtn.addEventListener("click", () => {
        currentIndex = Math.max(0, filteredData.length - rowsPerPage);
        displayData();
      });

      displayData();
    }
  );

  function initializeDropdown() {
    const dropdown = document.getElementById("templateDropdown");
    const template1Div = document.getElementById("template1Div");

    if (dropdown && template1Div) {
      template1Div.classList.add("hidden-div");

      dropdown.addEventListener("change", function () {
        console.log("Selected value:", this.value);

        if (this.value === "1") {
          template1Div.classList.remove("hidden-div");
          template1Div.classList.add("visible-div");
        } else {
          template1Div.classList.add("hidden-div");
          template1Div.classList.remove("visible-div");
        }
      });
    } else {
      console.error("Dropdown or template1Div not found.");
    }
  }
});
