const SEARCH_ACTION = 'search_action';
const SEARCH_BACKGROUND_ACTION = 'search_background_action';
const SEARCH_BASE_URL = 'https://www.google.com/searchbyimage?image_url=';


function creatItem(id, title) {
	browser.menus.create({
		id: id,
		title: title,
		contexts: ['all']
	});
}

function creatMenuItems() {
	creatItem(SEARCH_ACTION, "Search Image on a new tab");
	creatItem(SEARCH_BACKGROUND_ACTION, "Search Image on a new tab In the Background")
}

creatMenuItems();


function setImageUrlFormat(info) {
	return info.srcUrl.replace(/\?|&/g, match => match === '?' ? '%3F' : '%26');
}

function openImageSearch(info, tab, interrupt) {
	const imageUrlFormat = setImageUrlFormat(info);
	browser.tabs.create({
		url: SEARCH_BASE_URL + imageUrlFormat,
		active: interrupt,
		openerTabId: tab.id
	});
}

browser.menus.onClicked.addListener(function(info, tab) {

	switch (info.menuItemId){
		case SEARCH_BACKGROUND_ACTION:
			openImageSearch(info, tab,false);
			break;
		case SEARCH_ACTION:
			openImageSearch(info, tab,true);
			break;
		default:
			return;
	}
});
