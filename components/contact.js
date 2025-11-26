// ALLOWED EMAIL DOMAINS
const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "icloud.com",
    "hotmail.com"
];

// EMAIL AUTO-SUGGEST FEATURE
class EmailAutoSuggest {
    constructor() {
        this.emailInput = document.getElementById("contactEmail");
        this.suggestionBox = document.getElementById("emailSuggestions");

        if (this.emailInput) {
            this.init();
        }
    }

    init() {
        this.emailInput.addEventListener("input", () => this.showSuggestions());

        document.addEventListener("click", (e) => {
            if (!this.suggestionBox.contains(e.target) &&
                e.target !== this.emailInput) {
                this.suggestionBox.innerHTML = "";
            }
        });
    }

    showSuggestions() {
        const value = this.emailInput.value;
        const atIndex = value.indexOf("@");

        if (atIndex === -1) {
            this.suggestionBox.innerHTML = "";
            return;
        }

        const typedDomain = value.slice(atIndex + 1).toLowerCase();
        const filtered = allowedDomains.filter(domain =>
            domain.startsWith(typedDomain)
        );

        this.suggestionBox.innerHTML = filtered
            .map(domain => `
                <div class="suggestion-item" data-domain="${domain}">
                    ${value.slice(0, atIndex + 1)}${domain}
                </div>
            `)
            .join("");

        document.querySelectorAll(".suggestion-item").forEach(item => {
            item.addEventListener("click", () => {
                this.emailInput.value = item.textContent;
                this.suggestionBox.innerHTML = "";
            });
        });
    }
}

// CONTACT FORM HANDLER 
class ContactForm {
    constructor() {
        this.form = document.getElementById("contactForm");
        if (this.form) this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.saveMessage();
        });
    }

    saveMessage() {
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const emailDomain = email.split("@")[1];

        // Domain validation
        if (!allowedDomains.includes(emailDomain)) {
            alert("Please use a valid email domain: Gmail, Yahoo, Outlook, iCloud, Hotmail.");
            return;
        }

        let counter = localStorage.getItem("threads_contact_counter");
        counter = counter ? parseInt(counter) + 1 : 1;

        localStorage.setItem("threads_contact_counter", counter);

        const timestamp = new Date().toISOString();

        localStorage.setItem(`threads_contact_${counter}_name`, name);
        localStorage.setItem(`threads_contact_${counter}_email`, email);
        localStorage.setItem(`threads_contact_${counter}_message`, message);
        localStorage.setItem(`threads_contact_${counter}_timestamp`, timestamp);

        // Show confirmation modal
        const modal = document.getElementById("contactModal");
        modal.style.display = "flex";

        this.form.reset();

        document.getElementById("modalCloseBtn").onclick = () => {
            modal.style.display = "none";
        };

        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = "none";
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ContactForm();
    new EmailAutoSuggest();
});