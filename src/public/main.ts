const updateBtn = document.querySelector("#update");
const deleteBtn = document.querySelector("#delete");
const deleteFailed = document.querySelector("#delete-failed");

(deleteFailed as HTMLElement).style.color = "red";
(deleteFailed as HTMLElement).style.display = "none";

updateBtn!.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Darth Vader",
      quote: "I find your lack of faith disturbing.",
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      window.location.reload();
    });
});

deleteBtn!.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Darth Vader",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === `Could not delete a Darth Vader quote. None exist...`) {
        (deleteFailed as HTMLElement).style.display = "block";
      } else window.location.reload();
    });
});
