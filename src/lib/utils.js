const elementTemplate = require('./../assets/mustache-templates/element.html')
const infoPaneTemplate = require('./../assets/mustache-templates/info-pane.html')
const infoPaneListItem = require('./../assets/mustache-templates/info-pane-list-item.html')
const infoPaneWikiLinkListItem = require('./../assets/mustache-templates/info-pane-wiki-link-list-item.html')

export function formatJson(json)
{
	return json.elements.reduce((acc, cur) => 
	{
		cur.atomic_mass = cur.atomic_mass.toFixed(3)
		acc.push(cur)

		return acc
	}, [])
}

export function createHtmlElements(json)
{
	return json.map((el,idx) => 
	{
		return elementTemplate({ 
			symbol: el.symbol,
			category: el.category.split(' ').join('-').replace(/,/g, ''),
			idx: idx+1,
			atomic_mass: el.atomic_mass,
			gridColFrom: el.xpos,
			gridColTo: el.xpos++, 
			gridRowFrom: el.ypos,
			gridRowTo: el.ypos++,
			name: el.name
		})
	}).join('')
}

export function createInfoPane(element)
{
	const arr = ['phase','category','discovered_by','named_by']

	let tpl = infoPaneTemplate({
		name: element['name'],
		symbol: element['symbol'],
		summary: element['summary']
	})

	let cats = arr.map(category => 
	{
		const name = category.split('_').join(' ')
		const value = element[category] ? element[category] : 'unknown'
		return infoPaneListItem({name: name, value: value})
	}).join('')
	
	const wikiLinkListItem = infoPaneWikiLinkListItem({
		href: element['source'],
		linkName: element['source']
	})
		
	document.body.insertAdjacentHTML('beforeend', tpl)
	document.querySelector('.info-pane--list').insertAdjacentHTML('beforeend', cats)
	document.querySelector('.info-pane--list').insertAdjacentHTML('beforeend', wikiLinkListItem)

	_showHideInfoPane(true)
}

export function destroyInfoPane()
{
	document.querySelector('.info-pane--list').innerHTML = ''
	_showHideInfoPane(false)
}

function _showHideInfoPane(show)
{
	if(show)
	{
		document.querySelector('.info-pane--background').classList.add('is-showing')
		document.querySelector('.info-pane').classList.add('is-visible')	
	}
	else
	{
		document.querySelector('.info-pane--background').classList.remove('is-showing')
		document.querySelector('.info-pane').classList.remove('is-visible')
	}
	
}







