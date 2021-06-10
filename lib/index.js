async function init(){

	// const myJson = await fetch("lib/elements.json").then(res => {
	// 	return res.json()
	// })

	const response = await fetch("lib/elements.json")
	let myJson = await response.json()

	
	let newJson = formatJson(myJson)
	document.getElementById("ptable").innerHTML = createHtmlElements(newJson)

	document.querySelectorAll(".element").forEach(el => {
		el.onclick = (evt) => {
			evt.stopPropagation()
			createInfoPane(newJson[evt.target.dataset.idx-1])
		}
	})
	document.querySelectorAll(".infoPane--close-btn, body").forEach(el => {
		el.onclick = (evt) => {
			evt.stopPropagation()
			let tgt = evt.target
			if(tgt.closest(".infoPane") && !tgt.classList.contains("infoPane--close-btn")){
				return
			}
			destroyInfoPane()
		}
	})
}

function formatJson(json){
	return json.elements.reduce((acc, cur) => {
		cur.atomic_mass = cur.atomic_mass.toFixed(3)
		acc.push(cur)

		return acc
	}, [])
}

function createHtmlElements(json){

	return json.map((el,idx) => {
		let modifier = el.category.split(" ").join("-").replace(/,/g, "")
		return `
			<div 
				class="element element--${modifier}" 
				data-idx=${idx+1}
				data-weight="${el.atomic_mass}"
				style="grid-column: ${el.xpos}/${el.xpos+1}; grid-row: ${el.ypos}/${el.ypos+1}" 
				data-name="${el.name}" 
			>${el.symbol}</div>`

	}).join("")
}

function createInfoPane(element){

	const arr = ["phase","category","discovered_by","named_by"]

	let tpl = `
		<ul class="infoPane--list">
			<li class="infoPane--list-item">
				<h1 class="infoPane--h1">${element["name"]}</h1>
			</li>
			<li class="infoPane--list-item">
				<h2 class="infoPane--h2">${element["symbol"]}</h2>
			</li>
			<li class="infoPane--list-item">
				<span class="infoPane--val">${element["summary"]}</span>
			</li>`

	tpl += arr.map(pr_nm => {
		return `
			<li class="infoPane--list-item l-no-wrap">
				<span class="infoPane--label">${pr_nm.split("_").join(" ")}:</span>
	 			<span class="infoPane--val">${element[pr_nm] ? element[pr_nm] : "unknown"}</span>
	 		</li>`
	}).join("")
	tpl += `
			<li class="infoPane--list-item">
				<a target="_blank" class="infoPane--anchor" href="${element["source"]}">${element["source"]}</a>
			</li>
		</ul>`

	let ipList = document.querySelector(".infoPane--list")
	if(ipList){
		document.querySelector(".infoPane--list").remove()
	}
	document.querySelector(".infoPane").insertAdjacentHTML("beforeend", tpl)
	document.body.classList += "is-body-backdrop"
	document.getElementById("infoPaneBg").classList += "is-infoPaneBg-visible"
}

function destroyInfoPane(){
	document.body.classList = ""
	document.getElementById("infoPaneBg").classList = ""
}

init()

