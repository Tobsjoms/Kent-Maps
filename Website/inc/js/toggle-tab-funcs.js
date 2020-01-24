

function changeTab(event){
	// Ignore if we're already on this tab
	if (event.classList.contains('selected')) return;

	// Full group of tabs,
	group = Array.from(event.parentElement.childNodes);

	// For each tab, 
	group.forEach(function (tab, index) {
		// It's the right element and is currently selected, deselect
		if (tab.nodeName == "SPAN" && tab.classList.contains('selected')){
			tab.classList.remove('selected');
			contentPanelToClose = document.getElementById(tab.getAttribute("target"));
			contentPanelToClose.classList.remove('visible');
			// Delete temporary tab
			if (tab.classList.contains('temporary')){
				tab.parentNode.removeChild(tab);
				contentPanelToClose.parentNode.removeChild(contentPanelToClose);
			}
		}
	});

	// Set new tab to be selected
	event.classList.add('selected');
	// Display content
	contentPanelToShow = document.getElementById(event.getAttribute("target"));
	contentPanelToShow.classList.add('visible');
}