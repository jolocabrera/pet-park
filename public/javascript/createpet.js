async function createPetFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const species = document.querySelector("#species-signup").value.trim();
  const description = document
    .querySelector("#description-signup")
    .value.trim();

  if (name && species && description) {
    const response = await fetch("/api/pets", {
      method: "post",
      body: JSON.stringify({
        name,
        species,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // check the response status
    if (response.ok) {
      console.log("success");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
