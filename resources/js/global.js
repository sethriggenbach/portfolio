(function(){
    var searchPage = document.getElementById('category-page');

    var projectNamePlaceholder = document.getElementById('project-name');

    var projectDescriptionPlaceholder = document.getElementById('project-description');
    var projectImagePlaceholder = document.getElementById('project-image');
    var projectCompositionPlaceholder = document.getElementById('project-composition');
    var categoryTitle = document.getElementById('category-title');
    var projectExternalLink = document.getElementById('external-project-link');

    window.onload = function(){
        populateAllProjects();

        $('.gallery-thumb').on("click", function(){
            displayProjectPage(this);
        });

        $('.page-link').on("click", function(){
            pageSwitcher(this, this.getAttribute('href'));
        });
       
    }

    function displayProjectPage(obj) {
	addHistory('#design-page');
       
        var selection = obj.getAttribute("data-name");
        $('.page').hide();
	    
	projectImagePlaceholder.src = "";
        projectNamePlaceholder.innerHTML = projectData[selection].name;
        projectDescriptionPlaceholder.innerHTML = projectData[selection].description;
        projectCompositionPlaceholder.innerHTML = projectData[selection].composition;
        projectImagePlaceholder.src = projectData[selection].image;
        projectExternalLink.setAttribute("href", projectData[selection].webUrl);

        document.body.scrollTop = document.documentElement.scrollTop = 0;
        
        $('#project-page').fadeIn(350);
    }

    function pageSwitcher(obj, loc, addToHistory) {
       $('.menu-item').removeClass("active");
            $(loc+"-link").addClass("active");


		if (addToHistory != false) {
			addHistory(loc);
		}

        $('.page').hide();
        $(loc).fadeIn(350);
    }

    function addHistory(path) {
        history.pushState(path, null, null);
    }

    window.addEventListener('popstate', function(e) {
		var loc = e.state;
        console.log(e.state);
		if (loc != null) {
			pageSwitcher(undefined,loc,false);
		} else {
			window.history.back();
		}
	});

    function populateAllProjects() {
        for (var project in projectData) {
            var container = document.createElement("DIV");
            var galleryImg = document.createElement("DIV");
            var label = document.createElement("H3")

            container.classList.add("gallery-thumb");
            container.setAttribute('data-category1', projectData[project].category1);
            container.setAttribute('data-category2', projectData[project].category2);
            container.setAttribute('data-name', project)
            container.classList.add("centered");
            
            label.innerHTML = project;

            galleryImg.classList.add("gallery-img");
            galleryImg.style.backgroundImage = 'url('+projectData[project].thumbnail+')';

            container.appendChild(galleryImg);
            container.appendChild(label);

           searchPage.appendChild(container);
        }
    }





})()
