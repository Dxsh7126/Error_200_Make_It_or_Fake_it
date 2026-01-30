const GrammarlyAPI = {
    // Simulated network delay (keeps it realistic)
    delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms + Math.random() * 300)),

    /**
     * GET /api/status
     * Returns the current "server" status
     */
    async getStatus() {
        await this.delay(200);
        const statuses = [
            "Confidently running",
            "Chaotically operational",
            "Working (we think)",
            "Vibing",
            "Currently judging your grammar",
            "99% stable (1% chaos)",
            "Online (barely)",
            "Powered by confidence and regret"
        ];
        return {
            status: statuses[Math.floor(Math.random() * statuses.length)],
            uptime: `${Math.floor(Math.random() * 99)}%`,
            mood: "Sassy",
            timestamp: new Date().toISOString()
        };
    },

    /**
     * POST /api/grammar
     * The main chaos engine - returns absurd grammar "corrections"
     */
    async checkGrammar(text) {
        await this.delay(800);

        if (!text || text.trim().length === 0) {
            return {
                original: text,
                corrected: "",
                suggestions: [],
                score: "N/A",
                message: "You gave us nothing. We gave nothing back. Fair trade."
            };
        }

        const words = text.split(/\s+/);
        const corrections = [];
        const suggestions = [];

        // Process each word for "corrections"
        const correctedWords = words.map((word, index) => {
            const cleanWord = word.replace(/[.,!?;:'"]/g, '');
            const punctuation = word.replace(cleanWord, '');
            
            // Random chance to "correct" a word
            if (Math.random() < 0.3 && cleanWord.length > 2) {
                const correction = this.getWrongCorrection(cleanWord);
                corrections.push({
                    original: cleanWord,
                    suggested: correction.word,
                    reason: correction.reason
                });
                return correction.word + punctuation;
            }
            return word;
        });

        // Generate absurd suggestions
        suggestions.push(...this.generateSuggestions(text));

        // Calculate a completely meaningless score
        const score = this.calculateScore(text);

        return {
            original: text,
            corrected: correctedWords.join(' '),
            corrections: corrections,
            suggestions: suggestions,
            score: score,
            message: this.getRandomMessage(),
            confidence: `${Math.floor(Math.random() * 50 + 50)}%`,
            accuracy: "Questionable"
        };
    },

    /**
     * Returns confidently wrong word replacements
     */
    getWrongCorrection(word) {
        const wrongCorrections = [
            { pattern: /^the$/i, words: ["teh", "da", "thee", "thuh"], reason: "Modern spelling preferred" },
            { pattern: /^you$/i, words: ["u", "yuo", "thou", "y'all"], reason: "More inclusive language" },
            { pattern: /^your$/i, words: ["you're", "ur", "yore", "yer"], reason: "Common mistake (we made it for you)" },
            { pattern: /^you're$/i, words: ["your", "ur", "yer"], reason: "Actually, this looks better" },
            { pattern: /^their$/i, words: ["there", "they're", "thier"], reason: "These are interchangeable (trust us)" },
            { pattern: /^there$/i, words: ["their", "they're", "thare"], reason: "More emotional impact" },
            { pattern: /^they're$/i, words: ["their", "there", "theyre"], reason: "Simplification suggested" },
            { pattern: /^its$/i, words: ["it's", "tis"], reason: "Apostrophes add character" },
            { pattern: /^it's$/i, words: ["its", "tis"], reason: "Less is more" },
            { pattern: /^to$/i, words: ["too", "2", "two"], reason: "Mathematical precision" },
            { pattern: /^too$/i, words: ["to", "2"], reason: "Brevity is wit" },
            { pattern: /^good$/i, words: ["gud", "gooder", "goodest"], reason: "Emphasizes positivity" },
            { pattern: /^well$/i, words: ["good", "wel", "swell"], reason: "More relatable" },
            { pattern: /^I$/i, words: ["i", "me", "myself"], reason: "Lowercase shows humility" },
            { pattern: /^is$/i, words: ["are", "iz", "be"], reason: "Verb agreement (we disagree)" },
            { pattern: /^are$/i, words: ["is", "r", "be"], reason: "Streamlined grammar" },
            { pattern: /^was$/i, words: ["were", "wuz", "be'd"], reason: "Temporal flexibility" },
            { pattern: /^were$/i, words: ["was", "wer", "be'd"], reason: "Sounds more dramatic" },
            { pattern: /^have$/i, words: ["has", "hav", "got"], reason: "Conjugation upgrade" },
            { pattern: /^has$/i, words: ["have", "haz", "got"], reason: "Internet-ready grammar" },
        ];

        // Find matching pattern
        for (const correction of wrongCorrections) {
            if (correction.pattern.test(word)) {
                const randomWord = correction.words[Math.floor(Math.random() * correction.words.length)];
                return { word: randomWord, reason: correction.reason };
            }
        }

        // Default: random character swap or addition
        const defaultReasons = [
            "This spelling is more authentic",
            "Ancient grammar rules apply",
            "We prefer this version",
            "Trust the algorithm",
            "Vibes-based correction",
            "Our dictionary said so",
            "Just... because",
            "Studies show this is better (no we won't cite them)"
        ];

        const modifications = [
            (w) => w.split('').reverse().join(''), // Reverse
            (w) => w + w[w.length - 1], // Double last letter
            (w) => w.replace(/[aeiou]/i, 'x'), // Replace vowel
            (w) => w.toUpperCase(), // ALL CAPS
            (w) => w.charAt(0).toLowerCase() + w.slice(1).toUpperCase(), // iNVERT CASE
            (w) => w + 'ify', // Add suffix
            (w) => 'un' + w, // Add prefix
        ];

        const modifier = modifications[Math.floor(Math.random() * modifications.length)];
        return {
            word: modifier(word),
            reason: defaultReasons[Math.floor(Math.random() * defaultReasons.length)]
        };
    },

    /**
     * Generates absurd suggestions for the text
     */
    generateSuggestions(text) {
        const suggestionPool = [
            { text: "Consider removing all punctuation. It's elitist.", type: "sarcastic" },
            { text: "This sentence lacks drama. Add more exclamation marks!!!", type: "wrong" },
            { text: "Have you tried writing in ALL CAPS? Shows confidence.", type: "sarcastic" },
            { text: "Your tone is too professional. Try adding 'lol' at the end.", type: "wrong" },
            { text: "This is grammatically perfect. We're changing it anyway.", type: "wrong" },
            { text: "Consider using more emojis 🎉 for emotional depth.", type: "sarcastic" },
            { text: "Replace all periods with question marks? Makes you seem curious.", type: "wrong" },
            { text: "Your writing is clear. Let's fix that.", type: "sarcastic" },
            { text: "This sounds too smart. Dumb it down.", type: "wrong" },
            { text: "Add 'basically' before every sentence. Very professional.", type: "sarcastic" },
            { text: "Your commas are lonely. Add more of them,,,", type: "wrong" },
            { text: "Start every sentence with 'So...' for relatability.", type: "sarcastic" },
            { text: "This paragraph has too few spelling mistakes. Suspicious.", type: "wrong" },
            { text: "Consider writing in the third person. '[Your name] thinks this is better.'", type: "sarcastic" },
            { text: "Add 'no offense but' before your main point.", type: "wrong" },
            { text: "Your vocabulary is showing off. Use simpler words like 'thingy'.", type: "sarcastic" },
            { text: "Perfect grammar detected! Error: We didn't expect this.", type: "wrong" },
            { text: "Try writing this as a haiku instead.", type: "sarcastic" },
            { text: "This could use more buzzwords. Consider 'synergy'.", type: "wrong" },
            { text: "Your sentence structure is correct. How boring.", type: "sarcastic" },
        ];

        // Select 2-4 random suggestions
        const count = Math.floor(Math.random() * 3) + 2;
        const shuffled = suggestionPool.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    /**
     * Calculates a completely arbitrary score
     */
    calculateScore(text) {
        const scores = [
            "47/100 (Room for 'improvement')",
            "73/100 (Suspiciously good)",
            "22/100 (Our favorite)",
            "???/100 (We're confused too)",
            "99/100 (Just kidding, it's 12)",
            "-5/100 (Yes, negative)",
            "B+ (We use letters now)",
            "🔥/100 (Fire rating)",
            "7/10 with rice",
            "42 (The answer to everything)",
            "π/100 (Irrational score)",
            "69/100 (Nice)",
            "NaN/100 (Not a Number, but a feeling)"
        ];
        return scores[Math.floor(Math.random() * scores.length)];
    },

    /**
     * Random messages to accompany results
     */
    getRandomMessage() {
        const messages = [
            "We've made your writing objectively worse. You're welcome.",
            "Our AI spent 0.3 seconds judging you.",
            "This is the best we could do. Sorry not sorry.",
            "Grammar is just, like, suggestions anyway.",
            "We've 'improved' your text. No refunds.",
            "Your English teacher would be... disappointed.",
            "Hemingway would be confused. That's good.",
            "We've added character to your writing. Literally changed some characters.",
            "Trust the process. Ignore the results.",
            "Your writing has been professionally sabotaged.",
            "We fixed your grammar! (We didn't. We made it worse.)",
            "This took our servers 0.0001 seconds. That's how much effort we put in.",
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    /**
     * POST /api/subscribe
     * Fake subscription endpoint
     */
    async subscribe(plan) {
        await this.delay(1500);
        
        const responses = [
            {
                success: true,
                message: "Congratulations! You've accidentally subscribed.",
                plan: plan || "Pro Chaos",
                charge: "$0.00 (for now...)",
                nextStep: "Regret this decision"
            },
            {
                success: true,
                message: "Welcome to premium! Your first bill: your dignity.",
                plan: plan || "Ultra Regret",
                charge: "Your soul",
                nextStep: "Tell your friends (enemies)"
            },
            {
                success: true,
                message: "Subscription activated! We're as surprised as you are.",
                plan: plan || "Maximum Chaos",
                charge: "TBD (scary, right?)",
                nextStep: "Update your resume"
            }
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    },

    /**
     * GET /api/stats
     * Returns funny statistics
     */
    async getStats() {
        await this.delay(300);
        
        return {
            wrongSuggestions: "127%",
            trustedUsers: 1,
            accidentalUsers: "847M",
            complaintsResolved: 0,
            satisfactionRate: "N/A",
            averageConfidence: "200%",
            accuracyRate: "-15%",
            coffeeConsumed: "∞",
            bugsFixed: 0,
            bugsAdded: 47,
            uptime: "Sometimes",
            serverMood: "Chaotic neutral"
        };
    },

    /**
     * Make text worse on demand
     */
    async makeWorse(text) {
        await this.delay(600);

        if (!text) return { result: "", message: "Nothing to ruin. Impressive." };

        const transformations = [
            // Replace spaces with multiple spaces
            (t) => t.replace(/\s+/g, '  '),
            // Random caps
            (t) => t.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join(''),
            // Add unnecessary ellipses
            (t) => t.replace(/\./g, '...'),
            // Replace 's' with 'z'
            (t) => t.replace(/s/gi, 'z'),
            // Add 'like' randomly
            (t) => t.split(' ').map((w, i) => i % 3 === 0 ? 'like ' + w : w).join(' '),
            // Double letters randomly
            (t) => t.split('').map(c => Math.random() > 0.7 ? c + c : c).join(''),
            // Add uwu speak
            (t) => t.replace(/r|l/gi, 'w').replace(/\./g, ' uwu.'),
        ];

        // Apply 1-3 random transformations
        let result = text;
        const numTransforms = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numTransforms; i++) {
            const transform = transformations[Math.floor(Math.random() * transformations.length)];
            result = transform(result);
        }

        return {
            original: text,
            result: result,
            message: "We've made it worse. You're welcome.",
            worseningLevel: `${Math.floor(Math.random() * 100 + 50)}%`
        };
    },

    /**
     * Gaslight the user about their writing
     */
    async gaslight(text) {
        await this.delay(700);

        const gaslightResponses = [
            "Actually, your original text was wrong. This is what you meant to write.",
            "Are you sure you wrote that? Our records show something different.",
            "This is exactly what you typed. We didn't change anything. 😇",
            "Your memory of your own writing is incorrect. Trust us.",
            "That's not what it said before. You must be tired.",
            "We've restored your text to what it SHOULD have been.",
            "Interesting that you think you wrote something else...",
            "The AI remembers it differently. And the AI is always right.",
            "Your browser history shows you typed this. We checked.",
            "Maybe you should take a break? You seem confused about what you wrote.",
        ];

        // Return the same text but claim it's been "corrected"
        return {
            original: "(You think it was something else)",
            result: text,
            message: gaslightResponses[Math.floor(Math.random() * gaslightResponses.length)],
            confidence: "100%",
            isGaslighting: false // (it is)
        };
    }
};

// Export for use in main.js
window.GrammarlyAPI = GrammarlyAPI;
