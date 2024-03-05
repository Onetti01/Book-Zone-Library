// FUNCIÓN QUE SE EJECUTA AL CARGAR EL BODY, PARA AYUDAR AL DISSEÑO RESPONSIVE
function responsiveMenu() {
	const listElements = document.querySelectorAll(".menuItemShow");
	const list = document.querySelector(".menuLinks");
	const menu = document.querySelector(".menuDisplay");

	const addClick = function () {
		listElements.forEach((element) => {
			element.addEventListener("click", () => {
				let subMenu = element.children[1];
				let height = 0;
				if (subMenu.clientHeight === 0) {
					height = subMenu.scrollHeight;
				}
				subMenu.style.height = `${height}px`;
			});
		});
	};

	menu.addEventListener("click", () => {
		list.classList.toggle("menuLinksShow");
	});

	addClick();

	window.addEventListener("resize", () => {
		if (!window.innerWidth > 800) addClick();
	});

	// Desplegar/Ocultar cesta de la compra:
	if (document.querySelector("#cartShopContainer")) {
		const cartShop = document.querySelector("#cartShopContainer");
		const cartShop2 = document.querySelector("#cartShopContainer2");
		const cartModal = document.querySelector(".cartModal");

		cartShop.addEventListener("click", () => {
			cartModal.classList.toggle("cartModalDisplay");
			setTimeout(() => {
				let precios=document.querySelectorAll(".cartModalPriceBold")
				let suma=0
				if (precios) {
					for (precio of precios){
						suma+=parseFloat(precio.innerHTML.replace("€",""))
					}
				}
				document.getElementById("totalCart").innerHTML="€"+suma.toFixed(2)
			}, 200);
		});

		cartShop2.addEventListener("click", () => {
			cartModal.classList.toggle("cartModalDisplay");
		});
	}
}

function catScroll(id) {
	switch (id) {
		case 0:
			window.scroll(0, 0);
			break;
		case 1:
			window.scrollBy({
				top: 100,
				behavior: "smooth",
			});
			break;
		case 2:
			window.scrollBy({
				top: 1700,
				behavior: "smooth",
			});
			break;
		case 3:
			window.scrollBy({
				top: 3300,
				behavior: "smooth",
			});
			break;
		case 4:
			window.scrollBy({
				top: 4900,
				behavior: "smooth",
			});
			break;
	}
}
