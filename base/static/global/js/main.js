// Static class for user interface interactions
class UIHandler {
    static input = document.getElementById("content");
    static backgroundAnimation = document.getElementById("backgroundAnimation");
    static output = document.getElementById("outputContent");
    static btn = document.getElementById("loadingButton")

    // Change the placeholder of the text input base on the selected type
    static changePlaceholder(type) {
        this.input.placeholder = type === "link" ? "Cole o link aqui..." : "Cole o texto aqui..."; 
        this.input.value = ""
    }

    // Display the result on the user interface
    static showResult(result) {
        let outputText;

        switch(result) {
            case 0:
                outputText = "Me parece verdadeira! 👍 É sempre bom verificar antes de divulgar, que tal buscar outras fontes?";
                this.output.classList.add('border-true');
                break;
            case 1:
                outputText = "Hmm... Pode ser falsa! 👎 Verifique com fontes confiáveis!";
                this.output.classList.add('border-fake');
                break;
        }

        this.output.innerHTML = outputText;
        this.output.classList.remove('hidden');

        UIHandler.addBackgroundAnimation(result);
    }

    // Show the loading spinner 
    static showSpinner() {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('sendImg').classList.add('hidden');
    } 
    
    // Hide the loading spinner 
    static hideSpinner(){
        document.getElementById('sendImg').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }

    // Create an error message
    static createError(field, msg) {
        var div = document.createElement('div');
        div.classList.add('error-text', 'text-danger', 'text-center', 'mt-2');
        div.innerHTML = msg;
        field.insertAdjacentElement('afterend', div);
    }

    // Remove existing error messages
    static removeErrorText() {
        const errorTextDiv = document.querySelector('.error-text');
        if (errorTextDiv) {
            errorTextDiv.remove();
        }
    }

    // Add background animation based on the result
    static addBackgroundAnimation(result) {
        this.backgroundAnimation.classList.add(result === 1 ? "circle-fake" : "circle-true");
    }

    // Remove the background animation
    static removeBackgroundAnimation() {
        this.backgroundAnimation.classList.remove("circle-fake", "circle-true");
    }

    // Show request error
    static showRequestError(response) {
        var reqErrorText = response.status == 503 ? "Parece que estou em manutenção. 🛠️ Tente novamente mais tarde!" : "Parece que algo deu errado. 🛠️ Tente novamente mais tarde!";
        this.output.innerHTML = reqErrorText;
        this.output.classList.add('border-error');
        this.output.classList.remove('hidden');    
    }

    static removeOutputBorder() {
        this.output.classList.add('hidden');
        this.output.innerHTML = '';
        this.output.classList.remove('border-true', 'border-fake', 'border-error');
    }

    static loadProgressBarAnimation() {
        this.btn.disabled = true;

        this.output.classList.remove('hidden')

        var mainDiv = document.createElement("div");
        mainDiv.classList.add("px-0", "mx-0", "px-lg-5", "mx-lg-5");

        var p = document.createElement("p");
        p.textContent = "Carregando o modelo";
        mainDiv.appendChild(p);

        var progressDiv = document.createElement("div");
        progressDiv.classList.add("progress");

        var progressBarDiv = document.createElement("div");
        progressBarDiv.classList.add("progress-bar", "gradient-custom");
        progressBarDiv.role = "progressbar";

        progressDiv.appendChild(progressBarDiv);

        mainDiv.appendChild(progressDiv);

        this.output.appendChild(mainDiv);

        setTimeout(() => {
            this.output.removeChild(mainDiv);
            this.btn.disabled = false;
        }, 20000)
    }

    static navBarItemActive() {
        const activeItem = document.querySelector('a[href="'+ window.location.pathname +'"]');
        activeItem.setAttribute('active', 'true');
    }
}

class Predictor {
    static async load() {
        try {
            const response = await fetch('/check/load_model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "load": true
                }),
            })

            if (!response.ok) {
                const errorDetails = await response.json()
                UIHandler.showRequestError(response)
                throw new Error(`Server returned ${response.status}: ${errorDetails.message}`)
            }

            const data = await response.json()
            console.log(data)
            if (data.loading) {
                UIHandler.loadProgressBarAnimation();
            }

        } catch(error) {
            console.log(error)
        }
    }

    static async predict(type, content) {
        UIHandler.showSpinner();
        UIHandler.removeBackgroundAnimation();
        UIHandler.removeOutputBorder();

        try {
            const response = await fetch('/check/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'type': type,
                    'content': content
                })
            })
             
            if (!response.ok) {
                const errorDetails = await response.json();
                UIHandler.showRequestError(response)
                throw new Error(`Server returned ${response.status}: ${errorDetails.message}`);
            }

            const data = await response.json();
            UIHandler.showResult(data.prediction);
        } catch(error) {
            console.log(error);
        } finally {
            UIHandler.hideSpinner();
        }
    }
}

// Class responsible for form validation and handling
class FormValidation {
    constructor() {
        // Get references to elements and initialize events
        this.form = document.querySelector('.forms');
        this.inputText = document.querySelector("#content")
        this.events();
    }

    // Add events to the form
    events() {
        this.inputText.addEventListener('input', () => {
            if (this.inputText.value === '') {
                UIHandler.removeErrorText();
            }
        })
        this.form.addEventListener('submit', e => this.handleSubmit(e));
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        UIHandler.removeErrorText();

        const typeInput = document.getElementById("type").value;
        const contentInput = document.getElementById("content");
        
        if (typeInput === 'link') {
            this.linkValidation(contentInput)
        } else {
            this.textValidation(contentInput);
        }
    }

    textValidation(content){
        const words = this.countWords(content.value);
        
        if (words < 30) {
            UIHandler.createError(content, 'Este texto é muito pequeno.');
            return;
        }

        Predictor.predict('text', content.value)
    }

    linkValidation(content){
        if (!this.isLink(content.value)){
            UIHandler.createError(content, "Link Inválido.")
            return;
        }

        Predictor.predict('link', content.value)
    }

    // Check if the text is a valid link
    isLink(text) {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        return regex.test(text);
    }

    // Count words in a text
    countWords(text) {
        return text.trim().split(/\s+/).length;
    } 

}

// Execution

if (window.location.pathname === '/') {
    const validate = new FormValidation();
    document.getElementById("type").addEventListener("change",
                        (event) => UIHandler.changePlaceholder(event.target.value));
    Predictor.load();
}

window.onload = () => UIHandler.navBarItemActive();
window.onhashchange = () => UIHandler.navBarItemActive();
