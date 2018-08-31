Vue.component('columns-component', {
    template: `
        <div class="columns">
            <div class="column">
                <div class="image-column .is-rounded">
                    <img class="image" src="images/AdobeStock_177383025.jpeg">
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <header class="card-header is-main-column">
                        <div class="steps">
                            <step v-for="step in steps" :step="step" :done="step.done" :currentStep="currentStep" @change-step="changeStep" :key="step.id"></step>
                        </div>
                    </header>
                    <keep-alive>
                        <section-component v-for="step in steps" v-if="step.name === currentStep" :step="step" @next-step="nextStep" :key="step.id"></section-component>
                    </keep-alive>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            currentStep: 'Step 1',
            steps: [
                {
                    id: 0,
                    name: 'Step 1',
                    done: false,
                    fields: [
                        {
                            id: 0,
                            name: 'Nome',
                            value: null,
                            icon: 'fa-user'
                        },
                        {
                            id: 1,
                            name: 'Cognome',
                            value: null,
                            icon: 'fa-user'
                        },
                        {
                            id: 2,
                            name: 'Email',
                            value: null,
                            icon: 'fa-envelope'
                        },
                        {
                            id: 3,
                            name: 'Codice Fiscale',
                            value: null,
                            icon: 'fa-id-card'
                        },
                        {
                            id: 4,
                            name: 'Chi Sei?',
                            value: null,
                            options: [
                                'Imprenditore',
                                'Professionista',
                                'Pensionato',
                                'Cittadino'
                            ]
                        },
                    ],
                },
                {
                    id: 1,
                    name: 'Step 2',
                    done: false,
                    fields: [
                        {
                            id: 0,
                            name: 'Partita IVA o C.F.',
                            icon: 'fa-id-card'
                        },
                        {
                            id: 1,
                            name: 'Cone sede legale in',
                            icon: 'fa-user',
                            provinces: [],
                            communities: []
                        },
                        {
                            id: 2,
                            name: 'Indirizzo',
                            icon: 'fa-envelope'
                        },
                        {
                            id: 3,
                            name: 'Desidero essere associato presso altra struttura territoriale CNA',
                            icon: 'fa-map-marker-alt'
                        },
                        {
                            id: 4,
                            name: 'In quale CNA desideri associarti?',
                            options: [
                                'Agrigento',
                                'Alessandria',
                                'Ancona',
                                'Aosta'
                            ]
                        },
                    ],
                    mediumFields: [
                        [
                            {
                                id: 5,
                                name: 'Telefono',
                                isMedium: true,
                                icon: 'fa-phone'
                            },
                            {
                                id: 6,
                                name: 'Celulare',
                                isMedium: true,
                                icon: 'fa-mobile'
                            },

                        ],
                        [
                            {
                                id: 7,
                                name: 'La mia attività',
                                options: [
                                    'Amministratori condomiliali',
                                    'Animatori',
                                    'Art directors',
                                    'Bibliotecari'
                                ]
                            },
                            {
                                id: 8,
                                name: 'Come sei venuto a conoscenza?',
                                options: [
                                    'Accordo KSRent',
                                    'Uffici CNA',
                                    'Internet & social',
                                    'Passaparola'
                                ]
                            },
                        ]
                    ]
                },
                {
                    id: 2,
                    name: 'Step 3',
                    done: false,
                    fields: [
                        {
                            id: 0,
                            name: 'Completa i campi obbligatori per continuare',
                            label: true
                        },
                        {
                            id: 1,
                            name: 'Dichiaro di aver preso  visione dell\'informativa sulla privacy',
                            checkbox: true
                        },
                        {
                            id: 2,
                            name: 'Acconsento al trattamento dei dati personali come da informativa sulla privacy',
                            checkbox: true
                        },
                        {
                            id: 3,
                            name: 'Acconsento al trattamento dei dati personali per ricezione della newsletter da parte di CNA',
                            checkbox: true
                        },
                        {
                            id: 4,
                            name: 'Il costo per associarti è: 50,00 €',
                            label: true
                        },
                    ]
                }
            ]
        }
    },
    methods: {
        nextStep(id) {
            if (this.steps[id].done === false) {   
                this.steps[id].done = true;
            }
            this.currentStep = this.steps[id + 1].name;
        },
        changeStep(id) {
            if (id === 0 || this.steps[id - 1].done === true) { 
                this.currentStep = this.steps[id].name;
            }
        }
    }
});

Vue.component('step', {
    props: ['step', 'done', 'currentStep'],
    template: `
        <div class="step-item" :class="{'is-completed':done === true || currentStep === step.name, 'is-success':done === true || currentStep === step.name }" @click="changeStep">
            <div class="step-marker is-active">
                <span class="icon" v-show="done">
                    <i class="fa fa-check"></i>
                </span>
            </div>
            <div class="step-details">
                <p class="step-title has-text-white" :class="{'has-text-success': currentStep === step.name}">{{ step.name }}</p>
            </div>
        </div>
    `,
    methods: {
        changeStep() {
            this.$emit('change-step', this.step.id);
        }
    }
});

Vue.component('section-component', {
    props: ['step'],
    template: `
        <div>
            <div class="card-content">
                <div class="content">
                    <form-field v-for="field in step.fields" :name="field.name" :icon="field.icon" :options="field.options" :checkbox="field.checkbox" :key="field.name"></form-field>

                    
                    <medium-field v-if="step.mediumFields" v-for="fields in step.mediumFields" :fields="fields" :key="fields.name"></medium-field>
                </div>
            </div>
            <footer class="card-footer has-background-link">
                <a href="#" class="card-footer-item has-text-white" @click="nextStep">Prosegui</a>
            </footer>
        </div>   
    `,
    methods: {
        nextStep() {
            this.$emit('next-step', this.step.id);
        }
    }
});

Vue.component('form-field', {
    props: ['name', 'icon', 'options', 'label', 'checkbox', 'mediumFields'],
    template: `
        <div class="field" :class="{'is-horizontal':label === false}">
            <div class="field-label is-normal">
                <label  :class="{'label': !checkbox, 'checkbox': checkbox}">
                    <input v-if="checkbox" type="checkbox" name="name" value="name"> 
                    {{ name }}
                </label>
            </div>
            <div class="field-body">
                <div v-if="icon" class="field">
                    <p class="control is-expanded has-icons-left">
                        <input class="input" type="text">
                        <span class="icon is-small is-left">
                            <i class="fas" :class="icon"></i>
                        </span>
                    </p>
                </div>
                <div v-if="options" class="field">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select>
                                <option disabled selected>Seleziona un'opzione</option>
                                <option v-for="option,index in options" :key="index">{{ option }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});

Vue.component('medium-field', {
    props: ['fields'],
    template: `
    <div class="columns">
        <div class="column medium-column" v-for="field in fields">
            <div class="field">
                <div class="field-label is-normal">
                    <label class="label">
                        {{ field.name }}
                    </label>
                </div>
                <div class="field-body">
                    <div v-if="field.icon" class="field">
                        <p class="control is-expanded has-icons-left">
                            <input class="input" type="text">
                            <span class="icon is-small is-left">
                                <i class="fas" :class="field.icon"></i>
                            </span>
                        </p>
                    </div>
                    <div v-if="field.options" class="field">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select>
                                    <option disabled selected>Seleziona un'opzione</option>
                                    <option v-for="option,index in field.options" :key="index">{{ option }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
});


let vm = new Vue({
    el: '#app'
});