(function () {
  "use strict";

  var root = document.querySelector("[data-listening-finder]");
  if (!root) return;

  var output = root.querySelector("#listeningJourneyOutput");
  var controls = Array.prototype.slice.call(root.querySelectorAll("[data-listening-mood]"));
  if (!output || !controls.length) return;

  var journeys = {
    nostalgic: {
      label: "For a familiar memory",
      description: "Start with melodies that carry the warmth of songs people return to. These two performances offer a gentle doorway into familiar Hindi music.",
      tracks: [
        {
          title: "Kal Ho Naa Ho",
          category: "Hindi film melody",
          detail: "A much-loved melody revisited on violin.",
          href: "/violin-prince-website/kal-ho-na-ho/",
          image: "https://i.ytimg.com/vi/FlA76nbkReM/hqdefault.jpg"
        },
        {
          title: "Hai Apna Dil To Awara",
          category: "Evergreen Hindi",
          detail: "A relaxed instrumental take on a classic.",
          href: "/violin-prince-website/hai-apna-dil-to-awara/",
          image: "https://i.ytimg.com/vi/StnvyGduJ0s/hqdefault.jpg"
        }
      ]
    },
    reflective: {
      label: "For a quieter moment",
      description: "Choose a softer listening path with expressive, unhurried melodies. Let the phrasing and the main tune do the work.",
      tracks: [
        {
          title: "Tere Paas Main",
          category: "Hindi · Contemporary",
          detail: "A gentle instrumental interpretation.",
          href: "/violin-prince-website/tere-paas-main/",
          image: "https://i.ytimg.com/vi/FOV-lwpwcd0/hqdefault.jpg"
        },
        {
          title: "Say You Won't Let Go",
          category: "English · Pop ballad",
          detail: "An intimate violin take on a modern favourite.",
          href: "/violin-prince-website/say-you-wont-let-go/",
          image: "https://i.ytimg.com/vi/3NHpKon_Uq8/hqdefault.jpg"
        }
      ]
    },
    bengali: {
      label: "For Bengali musical roots",
      description: "Explore Bengali melodies through contemporary songs and Tagore's poetic musical world. Follow the language and phrasing that make each song distinctive.",
      tracks: [
        {
          title: "Preme Pora Baron",
          category: "Bengali · Contemporary",
          detail: "A Bengali favourite in the Violin Prince collection.",
          href: "/violin-prince-website/preme-pora-baron/",
          image: "https://i.ytimg.com/vi/UK7JYzoKKd4/hqdefault.jpg"
        },
        {
          title: "Majhe Majhe Tobo",
          category: "Rabindra Sangeet",
          detail: "Explore a dedicated Tagore-song performance page.",
          href: "/violin-prince-website/majhe-majhe-tobo/",
          image: "https://i.ytimg.com/vi/0f8d848122b096ed5c26d6a1b5b348f9201d01fc/hqdefault.jpg"
        }
      ]
    },
    modern: {
      label: "For something contemporary",
      description: "Move between modern English-language melodies and current favourites, hearing how a violin can carry a vocal melody in an instrumental form.",
      tracks: [
        {
          title: "Dandelions",
          category: "English · Pop",
          detail: "A contemporary favourite translated for violin.",
          href: "/violin-prince-website/dandelions/",
          image: "https://i.ytimg.com/vi/lTySNtT0rzs/hqdefault.jpg"
        },
        {
          title: "Say You Won't Let Go",
          category: "English · Pop ballad",
          detail: "A close, lyrical approach to a modern song.",
          href: "/violin-prince-website/say-you-wont-let-go/",
          image: "https://i.ytimg.com/vi/3NHpKon_Uq8/hqdefault.jpg"
        }
      ]
    }
  };

  function makeElement(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof text === "string") node.textContent = text;
    return node;
  }

  function renderJourney(key) {
    var journey = journeys[key];
    if (!journey) return;

    controls.forEach(function (button) {
      var selected = button.getAttribute("data-listening-mood") === key;
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    var heading = makeElement("div", "listening-result-heading");
    var titleWrap = makeElement("div");
    titleWrap.appendChild(makeElement("small", "", "YOUR LISTENING PATH"));
    titleWrap.appendChild(makeElement("h3", "", journey.label));
    heading.appendChild(titleWrap);
    heading.appendChild(makeElement("p", "", journey.description));

    var grid = makeElement("div", "listening-track-grid");
    journey.tracks.forEach(function (track) {
      var link = makeElement("a", "listening-track");
      link.href = track.href;
      link.setAttribute("aria-label", "Explore " + track.title + " violin cover");

      var image = document.createElement("img");
      image.src = track.image;
      image.alt = track.title + " violin cover artwork";
      image.loading = "lazy";
      image.decoding = "async";
      link.appendChild(image);

      var copy = makeElement("span", "listening-track-copy");
      copy.appendChild(makeElement("small", "", track.category));
      copy.appendChild(makeElement("strong", "", track.title));
      copy.appendChild(makeElement("span", "", track.detail + "  ↗"));
      link.appendChild(copy);
      grid.appendChild(link);
    });

    output.replaceChildren(heading, grid);
  }

  controls.forEach(function (button) {
    button.addEventListener("click", function () {
      renderJourney(button.getAttribute("data-listening-mood"));
    });
  });
}());