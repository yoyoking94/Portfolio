/* ============ Custom Cursor ============ */
const customCursor = () => {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    const hoverables = document.querySelectorAll('.hoverable');

    window.addEventListener("mousemove", onMouseMove)
    for (let i = 0; i < hoverables.length; i++) {
        hoverables[i].addEventListener('mouseenter', onMouseHover);
        hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }

    function onMouseMove(e) {
        const positionX = e.clientX;
        const positionY = e.clientY;

        cursorDot.style.left = `${positionX}px`;
        cursorDot.style.top = `${positionY}px`;

        cursorOutline.style.left = `${positionX}px`;
        cursorOutline.style.top = `${positionY}px`;

        cursorOutline.animate({
            left: `${positionX}px`,
            top: `${positionY}px`
        }, { duration: 500, fill: "forwards" });
    }

    function onMouseHover() {
        cursorOutline.style.width = 100 + "px";
        cursorOutline.style.height = 100 + "px";
    }

    function onMouseHoverOut() {
        cursorOutline.style.width = 40 + "px";
        cursorOutline.style.height = 40 + "px";
    }
}
/* ============ Custom Cursor ============ */

/*============ Change tab name when the page is active or not ============*/
const changeTabName = () => {
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            document.title = "Come back :'(";
        } else {
            document.title = "Welcome back :)";
            setTimeout(() => {
                document.title = "Yovish MOONESAMY | Portfolio";
            }, 2000);
        }
    });
};
/*============ Change tab name when the page is active or not ============*/

/* ============ Text Writter ============ */
const titleTextWritter = () => {
    const headline = document.getElementById("headline");
    new Typewriter(headline, {
        loop: true,
        deleteSpeed: 20,
    })
        .typeString("Hello there :)")
        .pauseFor(500)
        .deleteChars(21)
        .start();
};
/* ============ Text Writter ============ */

/* ============ Nav ============ */
const nav = () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });
        hamburger.classList.toggle("toggle");
    });
}
/* ============ Nav ============ */

/* ============ Project ============ */
const project = () => {
    const apiUrl = 'prout'
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(repositories => {
            repositories.forEach((repo, index) => {
                // Fetch readme content
                fetch(`${repo.url}/readme`)
                    .then(response => response.json())
                    .then(readme => {
                        const readmeContent = atob(readme.content);

                        function extractImageUrl(markdownText) {
                            const imageRegex = /!\[[^\]]*\]\(([^)]+)\)/;
                            const match = markdownText.match(imageRegex);
                            if (match && match[1]) {
                                return match[1];
                            } else {
                                return null;
                            }
                        }
                        const markdownText = readmeContent;
                        const imageUrl = extractImageUrl(markdownText);
                        // Display information
                        const repoContainer = document.getElementById('repoContainer');
                        const card = document.createElement('div');
                        card.className = `repoCard ${index % 10 === 9 ? 'ten' : index % 10 === 8 ? 'nine' : index % 10 === 7 ? 'eight' : index % 10 === 6 ? 'seven' : index % 10 === 5 ? 'six' : index % 10 === 4 ? 'five' : index % 10 === 3 ? 'four' : index % 10 === 2 ? 'three' : index % 10 === 1 ? 'two' : 'one'}`;
                        card.innerHTML = `
                        <img src = "${imageUrl || "https://yovish.space/Prout/stitch.jpg"}" alt = ${repo.name} />
                        <span class="imgText">
                            <h3>${repo.name}</h3>
                            <p>${repo.description || "No description available"}</p>
                            <a href="${repo.html_url}" target='_blank' class="hoverable">See on github</a>
		                </span>
                        `;
                        repoContainer.appendChild(card);


                        /* debug */
                        console.log('-------------------------');
                        console.log('Repository Name:', repo.name);
                        console.log('Repository Description:', repo.description);
                        console.log('Repository HTML URL:', repo.html_url);
                        console.log('Readme Content:', imageUrl);
                        console.log('-------------------------');
                        console.log('');
                        /* debug */
                    })
                    .catch(error => console.error('Error fetching readme:', error));
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
}
/* ============ Project ============ */

/* ============ Run all function ============ */
const allFunction = () => {
    changeTabName();
    titleTextWritter();
    nav()
    project()
    customCursor();
};

allFunction();
/* ============ Run all function ============ */
