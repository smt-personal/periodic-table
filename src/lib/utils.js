

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
		let modifier = el.category.split(" ").join("-").replace(/,/g, '')
		return `
			<div 
				class='element element--${modifier}' 
				data-idx=${idx+1}
				data-weight='${el.atomic_mass}'
				style='grid-column: ${el.xpos}/${el.xpos+1}; grid-row: ${el.ypos}/${el.ypos+1}' 
				data-name='${el.name}' 
			>${el.symbol}</div>`

	}).join('')
}

export function createInfoPane(element)
{
	const arr = ['phase','category','discovered_by','named_by']

	let tpl = `
		<ul class='infoPane--list'>
			<li class='infoPane--list-item'>
				<h1 class='infoPane--h1'>${element['name']}</h1>
			</li>
			<li class='infoPane--list-item'>
				<h2 class='infoPane--h2'>${element['symbol']}</h2>
			</li>
			<li class='infoPane--list-item'>
				<span class='infoPane--val'>${element['summary']}</span>
			</li>`

	tpl += arr.map(pr_nm => 
	{
		return `
			<li class='infoPane--list-item l-no-wrap'>
				<span class='infoPane--label'>${pr_nm.split('_').join(' ')}:</span>
	 			<span class='infoPane--val'>${element[pr_nm] ? element[pr_nm] : 'unknown'}</span>
	 		</li>`
	}).join('')
	
	tpl += `
			<li class='infoPane--list-item'>
				<a target='_blank' class='infoPane--anchor' href='${element['source']}'>${element['source']}</a>
			</li>
		</ul>`

	let ipList = document.querySelector('.infoPane--list')
	
	if(ipList)
	{
		document.querySelector('.infoPane--list').remove()
	}

	document.querySelector('.infoPane').insertAdjacentHTML('beforeend', tpl)
	document.body.classList += 'is-body-backdrop'
	document.getElementById('infoPaneBg').classList += 'is-infoPaneBg-visible'
}

export function destroyInfoPane()
{
	document.body.classList = ''
	document.getElementById('infoPaneBg').classList = ''
}







