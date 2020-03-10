
activeTab = null;

function changeTab(event){
   
	body = document.getElementById("sidebar");
	sideBar = document.getElementById("sidebar");

	if (activeTab == null){
		// No tabs open
		activeTab = event;
		sideBar.classList.toggle("open");
		activeTab.classList.toggle("selected");
		document.getElementById(activeTab.getAttribute("target")).classList.toggle("visible");
	}
	else if (activeTab == event){
		// Active tab being clicked, close
		sideBar.classList.toggle("open");
		event.classList.toggle("selected");
		document.getElementById(activeTab.getAttribute("target")).classList.toggle("visible");
		activeTab = null;
	}
	else{
		// Switching from one tab to another
		activeTab.classList.toggle("selected");
		document.getElementById(activeTab.getAttribute("target")).classList.toggle("visible");

		activeTab = event;
		activeTab.classList.toggle("selected");
		document.getElementById(activeTab.getAttribute("target")).classList.toggle("visible");
	}
}

function settingsTab(){
	changeTab(document.getElementById("settings-button"));
}