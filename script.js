fetch("wedding.json")
.then(response => response.json())
.then(data => {

window.events = data.events || [];
if (window.events.length) {
    showEvent(0);
}

document.getElementById("coupleNames").innerText =
`${data.couple.bride} & ${data.couple.groom}`;

document.getElementById("weddingDate").innerText =
data.weddingDate;

document.getElementById("tagline").innerText =
data.tagline;

window.weddingVenueMap = data.venue.maps;

document.getElementById("rsvpButton").href =
data.rsvpLink;

if (data.family) {
    renderFamily(data.family.brideSide, "brideFamilyList");
    renderFamily(data.family.groomSide, "groomFamilyList");
}

if (data.entourage) {
    renderEntourage(data.entourage.maidOfHonor, "maidOfHonorGrid", "Maid of Honor");
    renderEntourage(data.entourage.bridesmaids, "bridesmaidsGrid", "Bridesmaid");
    renderEntourage(data.entourage.groomsmen, "groomsmenGrid", "Groomsman");
}

})
.catch(err => console.error('Failed to load wedding.json', err));

function renderFamily(members, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    (members || []).forEach(member => {
        const row = document.createElement("div");
        row.className = "family-row";

        const relation = document.createElement("div");
        relation.className = "family-relation";
        relation.textContent = member.relation || "";

        const name = document.createElement("div");
        name.className = "family-name";
        name.textContent = member.name || "";

        row.appendChild(relation);
        row.appendChild(name);
        container.appendChild(row);
    });
}

function renderEntourage(people, containerId, roleLabel) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    (people || []).forEach(person => {
        const wrap = document.createElement("div");
        wrap.className = "entourage-person";

        const photoBox = document.createElement("div");
        photoBox.className = "entourage-photo" + (person.photo ? "" : " placeholder");

        if (person.photo) {
            const img = document.createElement("img");
            img.src = person.photo;
            img.alt = person.name || roleLabel;
            photoBox.appendChild(img);
        } else {
            photoBox.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z"/></svg>';
        }

        const nameEl = document.createElement("div");
        nameEl.className = "entourage-name";
        nameEl.textContent = person.name || "";

        const roleEl = document.createElement("div");
        roleEl.className = "entourage-role";
        roleEl.textContent = roleLabel;

        wrap.appendChild(photoBox);
        wrap.appendChild(nameEl);
        wrap.appendChild(roleEl);
        container.appendChild(wrap);
    });
}

const weddingDate = new Date("February 6, 2027 00:00:00");

setInterval(() => {

const now = new Date();

const diff = weddingDate - now;

const days =
Math.floor(diff / (1000 * 60 * 60 * 24));

const hours =
Math.floor((diff / (1000 * 60 * 60)) % 24);

const minutes =
Math.floor((diff / (1000 * 60)) % 60);

const seconds =
Math.floor((diff / 1000) % 60);

document.getElementById("days").innerText = days;
document.getElementById("hours").innerText = hours;
document.getElementById("minutes").innerText = minutes;
document.getElementById("seconds").innerText = seconds;

},1000);

const stories = [
{
title: "How We Met",
year: "May 2024",
image: "assets/first-DM .jpg",
description:"Every love story is unique, and ours began with a little help from fate and two determined mothers.What started as a connection through a matrimony portal soon became something far more meaningful. Our mothers discovered each other's profiles, exchanged details about us, and patiently nurtured the possibility of an introduction. Their belief that we might be a good match laid the foundation for everything that followed.hen we finally exchanged numbers, conversations flowed effortlessly. Days turned into weeks, and with every conversation, we found ourselves looking forward to the next. Before long, we met in person and realized that what we were building was something truly specialWhat began as an introduction soon became friendship, friendship became love, and love became the journey that has brought us here today. We are endlessly grateful to our families, whose faith and efforts helped bring our paths together.And now, we look forward to writing the next chapter of our story—together."
},

{
title: "First Adventure",
year: "2025",
image: "assets/adventure-temp.jpg",
description:"Varkala will be always be special because it was our first real adventure together.Learning to surf side by side felt like the perfect beginning to our journey. We spent days battling the waves , celebrating the small victories, and laughing at all our ridiculous falls along the way .When we look back at Varkala, we don't just remember the surfing, but also the experience of doing something new and challenging together.Our first adventure and the first of many incredible memories that we would create together. Here's to chasing many more waves and adventures together"
},

{
title: "The Proposal",
year: "2026",
image: "assets/proposal-temp.jpg",
description:"Our trip to Massai Mara was nothing short of a spectacle. But proposing to my partner beneath the starry skies in a beautiful camp in Kenya was something that I could never have imagined.Although I would say that the proposal was hampered a little by the case of the elusive leopard, which is a different story altogether.Nevertheless, i strove forward with a handwritten letter and a ring expressing my eternal love for my beautiful partner, the answer to which was a resounding 'Yes'.And that was it..our hearts were bound together with love and gratitude forever making it an epic conclusion to our magical trip in Kenya."
},

{
title: "Forever Begins",
year: "2027",
image: "assets/forever-temp.jpg",
description:"Now we stand on the edge of our greatest adventure yet. Surrounded by our loved ones, we begin the next chapter of our lives together."
}

];

function showStory(index){

    const card = document.getElementById("storyCard");

    card.style.opacity = "0";

    setTimeout(() => {

    document.getElementById("storyImage").src =
    stories[index].image;

    document.getElementById("storyTitle").innerText =
    stories[index].title;

    document.getElementById("storyYear").innerText =
    stories[index].year;

    document.getElementById("storyDescription").innerText =
    stories[index].description;

    document.querySelectorAll(".journey-item")
    .forEach(item => item.classList.remove("active"));

    document.querySelectorAll(".journey-item")[index]
    .classList.add("active");

    card.style.opacity = "1";

    }, 200);
}

function showEvent(index){

    const event = events[index];

    document.getElementById("eventTitle").innerText =
    event.name;

    document.getElementById("eventDate").innerText =
    "📅 " + event.date;

    document.getElementById("eventTime").innerText =
    "🕒 " + event.time;

    document.getElementById("eventVenue").innerText =
    "📍 " + event.venue;

    document.getElementById("eventMeal").innerText =
    "🍽️ " + event.meal;

    document.getElementById("eventDescription").innerText =
    event.description;

    document.getElementById("eventMap").href =
    event.map || (window.weddingVenueMap || "#");

    document
    .querySelectorAll(".event-tab")
    .forEach(tab => tab.classList.remove("active"));

    document
    .querySelectorAll(".event-tab")[index]
    .classList.add("active");
}

// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Reveal sections gently as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

