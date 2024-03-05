class Cart {
	constructor({
		id_carrito = null,
		email_cliente = "",
		id_producto = null,
		unidades = 0,
	} = {}) {
		this._id_carrito = id_carrito;
		this._email_cliente = email_cliente;
		this._id_producto = id_producto;
		this._unidades = unidades;
	}

	// remueve un libro del carrito
	deteleOne(cartValue) {
		// creamos un objeto para hacer la llamada ajax
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			//si tenemos un resultado correcto, procesamos la informacion
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// usando el dom removemos el elemento del carrito
				cartValue.parentNode.parentNode.remove();
				// convertimos la respuesta a json
				var jsonResponse = JSON.parse(xmlhttp.responseText);
				console.log(jsonResponse);

				// actualizamos el precio total usando el DOM
				let precios = document.querySelectorAll(".cartModalPriceBold");
				let suma = 0;
				if (precios) {
					for (precio of precios) {
						suma += parseFloat(precio.innerHTML.replace("€", ""));
					}
				}
				document.getElementById("totalCart").innerHTML =
					"€" + suma.toFixed(2);
			}
		};
		// hacemos la llamada ajax
		xmlhttp.open(
			"GET",
			// llama al controlador de carritos y ejecta la funcion de addToCartProduct
			"ajaxCalls.php?c=Cart&a=deleteCartProduct&id=" + this._id_producto,
			true
		);
		xmlhttp.send();
	}

	// resta una unidad a un producto en el carrito utilizando llamadas ajax
	// para actualizar dinamicamente la base de datos y usando el dom, para actualizar la información
	// en pantalla sin recargar la paina
	restUnit(cartValue) {
		let info = this.getORiginalPrice(cartValue.innerHTML);
		// creamos un objeto para hacer la llamada ajax
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			//si tenemos un resultado correcto, procesamos la información
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// convertimos la respuesta a json
				var jsonResponse = JSON.parse(xmlhttp.responseText);

				console.log(jsonResponse);
				// usando el dom, actualizamos la información del carrito (le restamos 1 al multiplicador
				// y actualizamos el precio total individual usando el DOM)
				cartValue.innerHTML = `${info.precioOriginal}€ x ${
					info.multiplicador - 1
				}: <span class="cartModalPriceBold">${(
					info.precioOriginal *
					(info.multiplicador - 1)
				).toFixed(2)}€</span>`;

				// actualizamos el precio total usando el DOM
				let precios = document.querySelectorAll(".cartModalPriceBold");
				let suma = 0;
				if (precios) {
					for (precio of precios) {
						suma += parseFloat(precio.innerHTML.replace("€", ""));
					}
				}
				document.getElementById("totalCart").innerHTML =
					"€" + suma.toFixed(2);
			}
		};

		// hacemos la llamada ajax
		xmlhttp.open(
			"GET",
			// llama al controlador de carritos y ejecta la funcion de removeToCartProduct
			"ajaxCalls.php?c=Cart&a=removeToCartProduct&id=" +
				this._id_producto,
			true
		);
		if (info.multiplicador > 1) {
			// enviamos la solicitud
			xmlhttp.send();
		}
	}

	// suma una unidad a un libro en el carrito utilizando llamadas ajax
	// para actualizar dinamicamente la base de datos y usando el dom, para actualizar la información
	// en pantalla sin recargar la paina
	sumUnit(cartValue) {
		let info = this.getORiginalPrice(cartValue.innerHTML);
		// creamos un objeto para hacer la llamada ajax
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			//si tenemos un resultado correcto, procesamos la informacion
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// convertimos la respuesta a json
				var jsonResponse = JSON.parse(xmlhttp.responseText);
				console.log(jsonResponse);

				// usando el dom, actualizamos la informacion del carrito (le sumamos 1 al multiplicador
				// y actualizamos el precio total individual usando el DOM)
				cartValue.innerHTML = `${info.precioOriginal}€ x ${
					info.multiplicador + 1
				}: <span class="cartModalPriceBold">${(
					info.precioOriginal *
					(info.multiplicador + 1)
				).toFixed(2)}€</span>`;

				// actualizamos el precio total usando el DOM
				let precios = document.querySelectorAll(".cartModalPriceBold");
				let suma = 0;
				if (precios) {
					for (precio of precios) {
						suma += parseFloat(precio.innerHTML.replace("€", ""));
					}
				}
				document.getElementById("totalCart").innerHTML =
					"€" + suma.toFixed(2);
			}
		};
		// hacemos la llamada ajax
		xmlhttp.open(
			"GET",
			// llama al controlador de carritos y ejecta la funcion de addToCartProduct
			"ajaxCalls.php?c=Cart&a=addToCartProduct&id=" + this._id_producto,
			true
		);
		xmlhttp.send();
	}

	getORiginalPrice(cadena) {
		// obtener la información de la cadena del precio en el carrito
		// usando una expresion regular
		var regex = /(\d+(?:\.\d+)?)€ x (\d+)/;
		var match = cadena.match(regex);
		if (match) {
			// obtener el precio original y el multiplicador
			var precioOriginal = parseFloat(match[1]);
			var multiplicador = parseInt(match[2]);
			return {
				precioOriginal: precioOriginal,
				multiplicador: multiplicador,
			};
		} else {
			// si no hay coincidencias, devolver null
			return null;
		}
	}
	anadirCarrito() {
		const id = this._id_carrito;
		let minusButton = document.querySelector("#detailsInputMinus" + id);
		let plusButton = document.querySelector("#detailsInputPlus" + id);
		let userInputNumber = 0;
		let sendButton = document.querySelector(".detailsButton" + id);
		const deleteButton = document.querySelector(".deleteButton" + id);
		let closeButton = document.querySelector(".modalNoProductsB");
		const buyButton = document.querySelector(".cartModalButton");

		if (buyButton) {
			buyButton.addEventListener("click", () => {
				window.location.href = `index.php?c=order&a=preSaveOrder`;
			});
		}

		if (plusButton) {
			plusButton.addEventListener("click", () => {
				let userInput = document.querySelector(
					".detailsInputNumber" + id
				);
				userInputNumber++;
				userInput.value = userInputNumber;
			});
		} else {
			let x = setInterval(() => {
				plusButton = document.querySelector("#detailsInputPlus" + id);
				if (plusButton) {
					clearInterval(x);
					plusButton.addEventListener("click", () => {
						let userInput = document.querySelector(
							".detailsInputNumber" + id
						);
						userInputNumber++;
						userInput.value = userInputNumber;
					});
				}
			}, 1000);
		}

		if (minusButton) {
			minusButton.addEventListener("click", () => {
				let userInput = document.querySelector(
					".detailsInputNumber" + id
				);
				if (userInputNumber > 0) {
					userInputNumber--;
				}
				userInput.value = userInputNumber;
			});
		} else {
			let x = setInterval(() => {
				minusButton = document.querySelector("#detailsInputMinus" + id);
				if (plusButton) {
					clearInterval(x);
					minusButton.addEventListener("click", () => {
						let userInput = document.querySelector(
							".detailsInputNumber" + id
						);
						if (userInputNumber > 0) {
							userInputNumber--;
						}
						userInput.value = userInputNumber;
					});
				}
			}, 1000);
		}

		if (sendButton) {
			sendButton.addEventListener("click", () => {
				let modal = document.querySelector(".modalNoProducts");
				let userInput = document.querySelector(
					".detailsInputNumber" + id
				);
				if (userInput.value > 0) {
					window.location.href = `index.php?product=${id}&number=${userInput.value}&c=Cart&a=addToCart`;
				} else {
					window.scroll(0, 0);
					modal.classList.toggle("modalNoProductDisplay");
				}
			});
		} else {
			let x = setInterval(() => {
				sendButton = document.querySelector(".detailsButton" + id);
				if (sendButton) {
					clearInterval(x);
					sendButton.addEventListener("click", () => {
						let modal = document.querySelector(".modalNoProducts");
						let userInput = document.querySelector(
							".detailsInputNumber" + id
						);
						if (userInput.value > 0) {
							window.location.href = `index.php?product=${id}&number=${userInput.value}&c=Cart&a=addToCart`;
						} else {
							window.scroll(0, 0);
							modal.classList.toggle("modalNoProductDisplay");
						}
					});
				}
			}, 1000);
		}

		if (deleteButton) {
			deleteButton.addEventListener("click", () => {
				DeleteUnitCart(id);
			});
		}

		if (closeButton) {
			closeButton.addEventListener("click", () => {
				let modal = document.querySelector(".modalNoProducts");
				modal.classList.remove("modalNoProductDisplay");
			});
		} else {
			let x = setInterval(() => {
				closeButton = document.querySelector(".modalNoProductsB");
				if (closeButton) {
					clearInterval(x);
					closeButton.addEventListener("click", () => {
						let modal = document.querySelector(".modalNoProducts");
						modal.classList.remove("modalNoProductDisplay");
					});
				}
			}, 1000);
		}
	}
}

class Book {
	constructor({
		id = null,
		nombre = "",
		descripcion = "",
		autor = "",
		precioAnterior = null,
		precio = 0.0,
		foto = "",
		stock = 0,
		estado = 0,
		id_categoria = null,
	} = {}) {
		this._id = id;
		this._nombre = nombre;
		this._descripcion = descripcion;
		this._autor = autor;
		this._precioAnterior = precioAnterior;
		this._precio = precio;
		this._foto = foto;
		this._stock = stock;
		this._estado = estado;
		this._id_categoria = id_categoria;
	}

	desplegarImagen() {
		let galleryImg = document.querySelector(
			".galleryImageContainer" + this._id
		);

		if (galleryImg) {
			galleryImg.addEventListener("click", () => {
				window.scroll(0, 0);
				window.location.href = `index.php?id=${this._id}&c=product&a=moreInfo`;
			});
		} else {
			let x = setInterval(() => {
				galleryImg = document.querySelector(
					".galleryImageContainer" + this._id
				);
				if (galleryImg) {
					clearInterval(x);
					galleryImg.addEventListener("click", () => {
						window.scroll(0, 0);
						window.location.href = `index.php?id=${this._id}&c=product&a=moreInfo`;
					});
				}
			}, 1000);
		}
	}
	static seartchBooks(search) {
		// obtenemos el contenedor donde vamos a poner a todos los libros
		let content = document.getElementById("result");
		// creamos el objeto para hacer la llamada ajax
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			// si tenemos un resultado correcto, procesamos la informacion
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// convertimos la respuesta a json
				var jsonResponse = JSON.parse(xmlhttp.responseText);
				// usando el dom, actualizamos la informacion del carrito creando un string
				// con el html necesario
				let htmlResult = '<section class="container" >';

				for (const product of jsonResponse.products) {
					// por cada libro, creamos un string con el html necesario para poder visualizarlo
					htmlResult += `
						<section itemscope itemtype="https://schema.org/Book" class="mainMenu">
							<iframe onload="desplegarImagen(${product.id})" style="display: none"></iframe>
							<article class="gallery">
								<div class="galleryImageContainer${
									product.id
								} galleryImageContainer" style='background-image:url(data:image/jpg;base64,${
						product.foto
					});'></div>
							</article>
							<article class="details">
								<h2 itemprop="author" class="detailsAuthor">${product.autor}</h2>
								<h2 itemprop="name" class="detailsTitle">${product.nombre}</h2>
								<p itemprop="description" class="detailsDescription">${product.descripcion}</p>
								<div itemprop="about" class="detailsPrices">
									${
										product.precioAnterior != null
											? `
										<p class="detailsNewPrice">
											${product.precio}€
											<span class="detailsDiscount">-${Math.round(
												(product.precio /
													product.precioAnterior) *
													100
											)}%</span>
										</p>
										<p class="detailsBeforePrice">Antes: <span class="detailsBeforeLine">${
											product.precioAnterior
										}€</span></p>
									`
											: `
										<p class="detailsNewPrice">${product.precio}€</p>
									`
									}
								</div>
								<iframe onload="anadirCarrito(${product.id})" style="display: none"></iframe>
								<div class="detailsQuantity">
									<div class="detailsInput">
										<i class="fa-solid fa-minus detailsInputMinus" id="detailsInputMinus${
											product.id
										}"></i>
										<input type="text" value="0" class="detailsInputNumber${
											product.id
										} detailsInputNumber">
										<i class="fa-solid fa-plus detailsInputPlus" id="detailsInputPlus${
											product.id
										}"></i>
									</div>
									${
										jsonResponse.session
											? `
											${
												product.stock > 0
													? `
												<button class="detailsButton${product.id} detailsButton"><i class="fa-solid fa-cart-shopping"></i> Añadir a la cesta</button>
											`
													: `
												<button class="detailsButtonDisabled">No hay unidades</button>
											`
											}`
											: `
											<button class="detailsButtonDisabled"><a class="cartLink" href="index.php?log=true&controller=client&action=loginClient">Inicia sesión</a> para comprar</button>
									`
									}
								</div>
							</article>
						</section>
						<div class="modalNoProducts">
							<div class="modalNoProductsBox">
								<p class="modalNoProductsP">Selecciona el número de unidades!</p>
								<button class="modalNoProductsB">ACEPTAR</button>
							</div>
						</div>
					`;
				}
				htmlResult += "</section>";
				// reemplazamos el contenido en el contenedor
				content.innerHTML = htmlResult;
			}
		};

		// configuramos la llamada ajax
		xmlhttp.open(
			"GET",
			// llama al controlador de Product y ejecta la funcion de postFormSearchProductJson
			"ajaxCalls.php?c=Product&a=postFormSearchProductJson&search=" +
				// enviamos el parametro de busqueda (lo que el usuario ha escrito en el input de busqueda)
				search,
			true
		);

		// enviamos la petición
		xmlhttp.send();
	}
}
class Client {
	constructor({
		id = null,
		email = "",
		nombre = "",
		apellidos = "",
		calle = "",
		numero = null,
		dni = "",
		password = "",
	} = {}) {
		this._id = id;
		this._email = email;
		this._nombre = nombre;
		this._apellidos = apellidos;
		this._calle = calle;
		this._numero = numero;
		this._dni = dni;
		this._password = password;
	}

	invalidSession(message = "Error en el formulario") {
		const par = document.getElementById("formError");
		par.style.display = "block";
		par.innerHTML = message;
	}

	samePass() {
		const pass1 = document.getElementById("userPass").value;
		const pass2 = document.getElementById("userRepeatPass").value;
		const par = document.getElementById("formError");
		const cont = document.getElementById("form");

		if (pass1 != "" && pass2 != "" && pass1 !== pass2) {
			par.style.display = "block";
			cont.style.padding = "1em 3em 4.5em 3em";
		} else {
			par.style.display = "none";
			cont.style.padding = " 4.5em 3em";
		}
	}
	validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(this._email);
	}

	validatePassword() {
		return this._password.length >= 6;
	}

	validatePasswordMatch(passwordRepeat) {
		return this._password === passwordRepeat;
	}

	validateDNI() {
		return this._dni.length = 9;
	}

	validateName() {
		const nameRegex = /^[A-Za-z\s]+$/;
		return nameRegex.test(this._nombre);
	}

	validateStreet() {
		return this._calle.trim() !== "";
	}

	validateNumber() {
		const numberRegex = /^[0-9]+$/;
		return numberRegex.test(this._numero);
	}
}

function invalidSession() {
	new Client().invalidSession();
}

function samePass() {
	new Client().samePass();
}

function anadirCarrito(id) {
	const car = new Cart({ id_carrito: id });
	car.anadirCarrito();
}

// Desplegar/Ocultar más información sobre el producto:
function desplegarImagen(id) {
	const prod = new Book({ id: id });
	prod.desplegarImagen();
}

function sumUnitCart(id) {
	let cartValue = document.getElementById("cartPrice" + id);
	const cartItem = new Cart({ id_producto: id });
	cartItem.sumUnit(cartValue);
}

function restUnitCart(id) {
	let cartValue = document.getElementById("cartPrice" + id);
	const cartItem = new Cart({ id_producto: id });
	cartItem.restUnit(cartValue);
}

function DeleteUnitCart(id) {
	let cartValue = document.getElementById("cartPrice" + id);
	const cartItem = new Cart({ id_producto: id });
	cartItem.deteleOne(cartValue);
}

function verifyUserReg(e) {
	// prevenimos que se envie el formulario sin hacer verificaciones
	e.preventDefault();
	//se obtiene el formulario
	let form = document.getElementById("form");
	// se obtiene los datos/campos
	let email = document.getElementById("userMail").value;
	let pass = document.getElementById("userPass").value;
	let passrepeat = document.getElementById("userRepeatPass").value;
	let dni = document.getElementById("userDNI").value;
	let name = document.getElementById("userName").value;
	let lastname = document.getElementById("userLastName").value;
	let street = document.getElementById("userDiretion").value;
	let number = document.getElementById("formNumber").value;
	let formConditions = document.getElementById("formConditions").checked;

	// creamos un nuevo objeto de tipo client
	const user = new Client({
		email: email,
		password: pass,
		dni: dni,
		nombre: name,
		apellidos: lastname,
		calle: street,
		numero: number,
	});

	// validamos los datos usando los metodos de la clase (POO)
	if (
		user.validateEmail() &&
		user.validatePassword() &&
		user.validatePasswordMatch(passrepeat) &&
		user.validateDNI() &&
		user.validateName() &&
		user.validateStreet() &&
		user.validateNumber() &&
		formConditions
	) {
		// si los datos son correctos, enviamos el formulario
		form.submit();
	} else {
		// si los datos son incorrectos, mostramos un error descriptivo
		if (!user.validateEmail()) {
			user.invalidSession("Email no válido");
		}
		if (!user.validatePassword()) {
			user.invalidSession("Contraseña no válida, mínimo 6 caracteres");
		}
		if (!user.validatePasswordMatch(passrepeat)) {
			user.invalidSession("Las contraseñas no coinciden");
		}
		if (!user.validateDNI()) {
			user.invalidSession("DNI no válido, mínimo 6 caracteres");
		}
		if (!user.validateName()) {
			user.invalidSession("Nombre no válido");
		}
		if (!user.validateStreet()) {
			user.invalidSession("Calle no válida");
		}
		if (!user.validateNumber()) {
			user.invalidSession("Número no válido");
		}
		if (!formConditions) {
			user.invalidSession("Acepta las condiciones");
		}
	}
}

function searchBooks(e) {
	// prevenimos que se envie el formulario sin obtener la información
	e.preventDefault();
	// obtenemos el contenedor donde vamos a poner a todos los libros
	let content = document.getElementById("result");
	// obtenemos el valor del input
	let input = document.getElementById("search-books").value;
	// si el input no es vacío
	if (input.trim() !== "") {
		// mostramos una animacion de carga en el contenedor mientras se
		// realiza la llamada ajax desde la clase
		content.innerHTML = `
		<section class="container" >
			<div class="banter-loader">
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
				<div class="banter-loader__box"></div>
			</div>
		</section>
		`;
		Book.seartchBooks(input);
	}
}
