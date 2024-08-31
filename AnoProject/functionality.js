
const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
    let header = item.querySelector("header");
    header.addEventListener("click", () => {
        item.classList.toggle("open");

        let description = item.querySelector(".description");
        if (item.classList.contains("open")) {
            description.style.height = `${description.scrollHeight}px`; 
            item.querySelector("i").classList.replace("fa-plus", "fa-minus");
        } else {
            description.style.height = "0px";
            item.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
        removeOpen(index); 
    })
})

function removeOpen(index1) {
    accordionContent.forEach((item2, index2) => {
        if (index1 != index2) {
            item2.classList.remove("open");

            let des = item2.querySelector(".description");
            des.style.height = "0px";
            item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
    })
}
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const API_KEY = "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"; 
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 

    element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

  
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    }

    
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if (!userMessage) return;

    
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
    
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {

    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
   
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


const body = document.querySelector("body"),
    toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.add("dark");
    toggle.classList.add("active")

}


toggle.addEventListener("click", () => {
    body.classList.toggle("dark")

    if (!body.classList.contains("dark")) {
        return localStorage.setItem("mode", "light");
    }
    localStorage.setItem("mode", "dark");
})

toggle.addEventListener("click", () => toggle.classList.toggle("active"));


const body1 = document.querySelector('body'),
    sidebar = body1.querySelector('nav'),
    toggle1 = body1.querySelector(".toggle"),
    searchBtn = body1.querySelector(".search-box"),
    modeSwitch = body1.querySelector(".toggle-switch"),
    modeText = body1.querySelector(".mode-text");
toggle1.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})
modeSwitch.addEventListener("click", () => {
    body1.classList.toggle("dark");

    if (body1.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
});

var input = document.querySelectorAll('#enter input[type=text]')[0],
    entries = {},
    completed = {},
    reminders = {
        create: function (text) {
            if (text != '') {
                var entry = Date.now();
                if (localStorage.entries) {
                    entries = JSON.parse(localStorage.entries);
                }
                entries[entry] = text;
                localStorage.entries = JSON.stringify(entries);
                input.value = '';
                reminders.display('entries');
            }
            input.focus();
        },
        display: function (list) {
            var list = JSON.parse(localStorage[list]);
            for (var entry in list) {
                var box = document.createElement('section'),
                    task = document.createElement('input'),
                    exit = document.createElement('input');
                task.type = 'text';
                task.setAttribute('onblur', 'reminders.edit(this.value, this.parentNode.id)');
                task.value = list[entry];
                exit.type = 'button';
                exit.setAttribute('onclick', 'reminders.complete(this.parentNode.id)');
                exit.value = '×';
                box.id = entry;
                box.appendChild(task);
                box.appendChild(exit);
                if (!document.getElementById(entry)) {
                    document.getElementsByTagName('body')[0].insertBefore(box, document.getElementById('enter'));
                }
            }
        },
        edit: function (text, id) {
            entries = JSON.parse(localStorage.entries);
            entries[id] = text;
            localStorage.entries = JSON.stringify(entries);
        },
        complete: function (id) {
            entries = JSON.parse(localStorage.entries);
            if (localStorage.completed) {
                completed = JSON.parse(localStorage.completed);
            }
            completed[id] = entries[id];
            delete entries[id];
            localStorage.completed = JSON.stringify(completed);
            localStorage.entries = JSON.stringify(entries);
            reminders.display('entries');
            document.getElementById(id).remove();
        }
    }
document.onkeydown = function (e) {
    e = e || window.event;
    var charCode = (typeof e.which1 == "number") ? e.which1 : e.keyCode1;
    if (charCode == 13) { reminders.create(input.value); } /* enter key creates new reminder */
}
reminders.display('entries');


const items = document.querySelectorAll('.nav-link');

items.forEach((item, idx) => {
    item.addEventListener('click', () => {
        ToggleActive(item, idx);
    });
});
function ToggleActive(el, index) {
    el.classList.toggle('active');
    items.forEach((item, idx) => {
        if (idx !== index) {
            item.classList.remove("active");
        }
    });
}