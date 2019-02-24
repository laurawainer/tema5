let retter;

let dest = document.querySelector("#retter");

let filter = "alle";


document.addEventListener("DOMContentLoaded", start);

        async function start() {


            const myJson = await fetch("retter.json");
            retter = await myJson.json();
            visRetter();
        }
        function visRetter() {



            dest.innerHTML = "";
            retter.forEach(ret => {
                if (filter == "alle" || filter == ret.kategori) {

					let template = `
                    <article class="ret">
                        <img src="pics/${ret.billede}" alt=${ret.navn}">
                        <h2>${ret.navn}</h2>
                        <p>${ret.pris}kr.</p>
                    </article>`;

                    dest.insertAdjacentHTML("beforeend", template);
                    dest.lastElementChild.addEventListener("click", visSingle);

					function visSingle() {
                        document.querySelector("#indhold").innerHTML =

                            `<article class="ret2">
                        <img src="pics/${ret.billede}" alt=${ret.navn}">
                        <h2>${ret.navn}</h2>
                        <p>${ret.kort}</p>
                        <p>${ret.pris}kr.</p>
                    </article>`;
                        document.querySelector("#popup").style.display = "block";
                        document.querySelector("#popup #luk").addEventListener("click", close);
                    }
                    function close() {



                        document.querySelector("#popup").style.display = "none"
                    }
                }
            })
        }
        start();

        document.querySelectorAll(".filter").forEach(elm => {
            elm.addEventListener("click", filtrering);
        })

        function filtrering() {

            document.querySelectorAll(".filter").forEach(elm => {
                elm.classList.remove("valgt");
            })
            this.classList.add("valgt");
            filter = this.getAttribute("data-ret");

			visRetter();
        }
