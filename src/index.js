import * as utils from './lib/utils'
import * as json from './assets/elements.json'
import './assets/styles/sass/main.scss'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const formattedObj = utils.formatJson(json)

document.getElementById('ptable').innerHTML = utils.createHtmlElements(formattedObj)

document.querySelectorAll('.element').forEach(el => 
{
	el.onclick = (evt) => 
	{
		evt.stopPropagation()
		utils.createInfoPane(formattedObj[evt.target.dataset.idx-1])
	}
})

document.querySelectorAll('.infoPane--close-btn, body').forEach(el => 
{
	el.onclick = (evt) => 
	{
		evt.stopPropagation()
		document.querySelector('.info-pane--background').remove()
	}
})


