async function getAnimals() {
  const API = "https://zoo-animal-api.herokuapp.com/animals/rand";
  const data = [];
  do {
    let res = await fetch(API);
    let animal = await res.json();
    if (data.indexOf(animal) < 0) {
      data.push(animal);
    }
  } while (data.length < 20);
  console.log(data);
  let select = document.querySelector("select");
  data.forEach((elem) => {
    const img = document.createElement("img");
    img.src = elem.image_link;
    img.style.height = "19vw";
    img.style.width = "19vw";
    img.dataset.time = elem.active_time === "Diurnal" ? "Diurnal" : "Nocturnal";
    document.querySelector("div").appendChild(img);
  });
  select.addEventListener("change", () => {
    const value = select.value;

    const nodesDiurnal = document.querySelectorAll("[data-time=Diurnal]");
    const nodesNocturnal = document.querySelectorAll("[data-time=Nocturnal]");
    if (value === "Diurnal") {
      nodesNocturnal.forEach((elem) => {
        elem.style.display = "none";
      });
      nodesDiurnal.forEach((elem) => {
        elem.style.display = "inline-block";
      });
    } else {
      nodesDiurnal.forEach((elem) => {
        elem.style.display = "none";
      });
      nodesNocturnal.forEach((elem) => {
        elem.style.display = "inline-block";
      });
    }
  });
}
getAnimals();
