import * as utils from './lib/utils'
import './styles/sass/main.scss'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

fetch("./../src/elements.json").then(response => 
{
	return response
}
).then(response => 
{
	return response.json()
}
).then(jsonResponse => 
{
	const newJson = utils.formatJson(jsonResponse)

	document.getElementById("ptable").innerHTML = utils.createHtmlElements(newJson)

	document.querySelectorAll(".element").forEach(el => 
	{
		el.onclick = (evt) => 
		{
			evt.stopPropagation()
			utils.createInfoPane(newJson[evt.target.dataset.idx-1])
		}
	})

	document.querySelectorAll(".infoPane--close-btn, body").forEach(el => 
	{
		el.onclick = (evt) => 
		{
			evt.stopPropagation()
			const tgt = evt.target
			if(tgt.closest(".infoPane") && !tgt.classList.contains("infoPane--close-btn"))
			{
				return
			}
			utils.destroyInfoPane()
		}
	})
})






