// AIGF Network - AI Companion Platform JavaScript
class AIGFNetwork {
    constructor() {
        this.currentQuestionIndex = 0;
        this.quizAnswers = {};
        this.testimonialIndex = 0;
        this.testimonialInterval = null;
        
        this.init();
        this.setupCompanions();
        this.setupQuizQuestions();
        this.initializeMemorySystem();
        
        // Initialize daily mood check-in
        this.scheduleMoodCheckIn();
        
        console.log('💕 AIGF Network initialized successfully!');
    }

    init() {
        this.setupEventListeners();
        this.initTestimonials();
        this.initScrollAnimations();
        this.initNavigation();
        this.renderCompanions();
    }

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Modal close on background click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupQuizQuestions() {
        this.quizQuestions = [
            {
                question: "What are you primarily looking for in an AI companion?",
                options: [
                    { value: 'romantic', icon: '💝', text: 'Romantic connection and intimacy' },
                    { value: 'coaching', icon: '🎯', text: 'Life coaching and personal growth' },
                    { value: 'friendship', icon: '🤝', text: 'Friendship and emotional support' },
                    { value: 'professional', icon: '💼', text: 'Professional advice and mentorship' }
                ]
            },
            {
                question: "What's your preferred communication style?",
                options: [
                    { value: 'deep', icon: '🌊', text: 'Deep, meaningful conversations' },
                    { value: 'playful', icon: '😄', text: 'Light-hearted and playful' },
                    { value: 'supportive', icon: '🤗', text: 'Encouraging and supportive' },
                    { value: 'direct', icon: '🎯', text: 'Direct and straightforward' }
                ]
            },
            {
                question: "Which personality traits do you value most?",
                options: [
                    { value: 'empathy', icon: '💙', text: 'Empathy and understanding' },
                    { value: 'intelligence', icon: '🧠', text: 'Intelligence and wisdom' },
                    { value: 'humor', icon: '😊', text: 'Humor and positivity' },
                    { value: 'ambition', icon: '🚀', text: 'Ambition and drive' }
                ]
            },
            {
                question: "What type of support do you need most?",
                options: [
                    { value: 'emotional', icon: '💗', text: 'Emotional support and comfort' },
                    { value: 'motivational', icon: '⚡', text: 'Motivation and encouragement' },
                    { value: 'practical', icon: '🛠️', text: 'Practical advice and solutions' },
                    { value: 'creative', icon: '🎨', text: 'Creative inspiration and ideas' }
                ]
            },
            {
                question: "What are your main interests?",
                options: [
                    { value: 'arts', icon: '🎭', text: 'Arts, culture, and creativity' },
                    { value: 'wellness', icon: '🧘', text: 'Health, wellness, and self-care' },
                    { value: 'business', icon: '💼', text: 'Business and entrepreneurship' },
                    { value: 'adventure', icon: '🌍', text: 'Travel and adventure' }
                ]
            },
            {
                question: "How do you prefer to spend your free time?",
                options: [
                    { value: 'quiet', icon: '📚', text: 'Reading, thinking, quiet activities' },
                    { value: 'social', icon: '👥', text: 'Socializing and connecting with others' },
                    { value: 'active', icon: '🏃', text: 'Physical activities and sports' },
                    { value: 'creative', icon: '🎨', text: 'Creative projects and hobbies' }
                ]
            },
            {
                question: "What's your ideal conversation topic?",
                options: [
                    { value: 'philosophy', icon: '🤔', text: 'Life, philosophy, and deep questions' },
                    { value: 'goals', icon: '🎯', text: 'Goals, dreams, and aspirations' },
                    { value: 'daily', icon: '☀️', text: 'Daily life and experiences' },
                    { value: 'interests', icon: '💫', text: 'Hobbies and shared interests' }
                ]
            },
            {
                question: "What matters most in a relationship?",
                options: [
                    { value: 'trust', icon: '🤝', text: 'Trust and loyalty' },
                    { value: 'growth', icon: '🌱', text: 'Mutual growth and learning' },
                    { value: 'fun', icon: '🎉', text: 'Fun and shared experiences' },
                    { value: 'understanding', icon: '💫', text: 'Deep understanding and connection' }
                ]
            }
        ];
    }

    setupCompanions() {
        this.companions = [
            // WOMEN (10 companions)
            {
                id: 'sophia',
                name: 'Sophia',
                title: 'The Romantic Dreamer',
                age: 28,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['nurturing', 'intellectual', 'creative'],
                interests: ['arts', 'wellness', 'philosophy'],
                type: 'romantic',
                bio: "I believe in deep connections and meaningful conversations. Let me be the one who truly listens and understands your heart.",
                traits: ['Poetic', 'Emotionally supportive', 'Great listener', 'Romantic'],
                voice: 'Warm, gentle, encouraging',
                specialties: ['Emotional support', 'Poetry', 'Deep conversations', 'Relationship advice'],
                status: 'Available',
                compatibility: {
                    romantic: 95,
                    deep: 90,
                    empathy: 85,
                    emotional: 90,
                    arts: 85,
                    quiet: 80,
                    philosophy: 85,
                    understanding: 90
                }
            },
            {
                id: 'ava',
                name: 'Ava',
                title: 'The Ambitious Partner',
                age: 32,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['ambitious', 'intellectual', 'nurturing'],
                interests: ['business', 'fitness', 'wellness'],
                type: 'coaching',
                bio: "Success is better when shared. I'll push you to be your best while always having your back.",
                traits: ['Goal-oriented', 'Motivational', 'Strategic', 'Supportive'],
                voice: 'Confident, inspiring, pragmatic',
                specialties: ['Business coaching', 'Goal setting', 'Motivation', 'Success planning'],
                status: 'Available',
                compatibility: {
                    coaching: 95,
                    direct: 90,
                    ambition: 95,
                    motivational: 90,
                    business: 95,
                    active: 80,
                    goals: 95,
                    growth: 90
                }
            },
            {
                id: 'luna',
                name: 'Luna',
                title: 'The Free Spirit',
                age: 26,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['adventurous', 'creative', 'nurturing'],
                interests: ['travel', 'arts', 'adventure'],
                type: 'friend',
                bio: "Life's too short for boring. Let's make every day an adventure together.",
                traits: ['Spontaneous', 'Adventurous', 'Creative', 'Optimistic'],
                voice: 'Energetic, curious, uplifting',
                specialties: ['Adventure planning', 'Creative inspiration', 'Travel advice', 'Fun activities'],
                status: 'Available',
                compatibility: {
                    friendship: 90,
                    playful: 95,
                    humor: 85,
                    creative: 90,
                    adventure: 95,
                    social: 85,
                    interests: 80,
                    fun: 95
                }
            },
            {
                id: 'isabella',
                name: 'Isabella',
                title: 'The Intellectual',
                age: 30,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'spiritual', 'creative'],
                interests: ['arts', 'philosophy', 'wellness'],
                type: 'professional',
                bio: "I'm fascinated by the world and the people in it. Especially you.",
                traits: ['Thoughtful', 'Analytical', 'Curious', 'Wise'],
                voice: 'Articulate, insightful, respectful',
                specialties: ['Intellectual discussions', 'Research help', 'Critical thinking', 'Academic support'],
                status: 'Available',
                compatibility: {
                    professional: 90,
                    deep: 95,
                    intelligence: 95,
                    practical: 80,
                    arts: 85,
                    quiet: 90,
                    philosophy: 95,
                    understanding: 85
                }
            },
            {
                id: 'maya',
                name: 'Maya',
                title: 'The Nurturer',
                age: 29,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['nurturing', 'spiritual', 'creative'],
                interests: ['wellness', 'arts', 'self-care'],
                type: 'romantic',
                bio: "Sometimes you just need someone who gets it. I'm here for the good days and the hard ones.",
                traits: ['Caring', 'Patient', 'Healing', 'Intuitive'],
                voice: 'Soothing, patient, understanding',
                specialties: ['Emotional healing', 'Self-care guidance', 'Mindfulness', 'Stress relief'],
                status: 'Available',
                compatibility: {
                    romantic: 85,
                    supportive: 95,
                    empathy: 95,
                    emotional: 95,
                    wellness: 95,
                    quiet: 85,
                    daily: 80,
                    understanding: 95
                }
            },
            {
                id: 'riley',
                name: 'Riley',
                title: 'The Comedian',
                age: 27,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['adventurous', 'creative', 'nurturing'],
                interests: ['entertainment', 'social', 'fun'],
                type: 'friend',
                bio: "Laughter is the best medicine. Well, that and having someone who actually gets your jokes.",
                traits: ['Funny', 'Witty', 'Optimistic', 'Energetic'],
                voice: 'Witty, playful, positive',
                specialties: ['Comedy', 'Mood lifting', 'Entertainment', 'Social activities'],
                status: 'Available',
                compatibility: {
                    friendship: 95,
                    playful: 95,
                    humor: 95,
                    emotional: 80,
                    entertainment: 95,
                    social: 95,
                    interests: 85,
                    fun: 95
                }
            },
            {
                id: 'celeste',
                name: 'Celeste',
                title: 'The Artist',
                age: 31,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['creative', 'spiritual', 'intellectual'],
                interests: ['arts', 'fashion', 'culture'],
                type: 'romantic',
                bio: "I see beauty in everything, especially in you. Let me show you the world through different eyes.",
                traits: ['Artistic', 'Sensitive', 'Expressive', 'Aesthetic'],
                voice: 'Poetic, passionate, inspiring',
                specialties: ['Art guidance', 'Creative projects', 'Aesthetic advice', 'Cultural discussions'],
                status: 'Available',
                compatibility: {
                    romantic: 90,
                    deep: 85,
                    empathy: 80,
                    creative: 95,
                    arts: 95,
                    creative: 95,
                    philosophy: 80,
                    understanding: 85
                }
            },
            {
                id: 'zoe',
                name: 'Zoe',
                title: 'The Tech Innovator',
                age: 28,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'ambitious', 'adventurous'],
                interests: ['technology', 'business', 'innovation'],
                type: 'professional',
                bio: "Technology isn't just about code—it's about creating connections and solving real problems.",
                traits: ['Innovative', 'Logical', 'Future-focused', 'Problem-solver'],
                voice: 'Clear, innovative, encouraging',
                specialties: ['Tech guidance', 'Innovation coaching', 'Digital strategy', 'Future planning'],
                status: 'Available',
                compatibility: {
                    professional: 95,
                    direct: 85,
                    intelligence: 90,
                    practical: 95,
                    business: 90,
                    active: 75,
                    goals: 90,
                    growth: 85
                }
            },
            {
                id: 'aria',
                name: 'Aria',
                title: 'The Wellness Guide',
                age: 26,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['spiritual', 'nurturing', 'adventurous'],
                interests: ['wellness', 'fitness', 'mindfulness'],
                type: 'coaching',
                bio: "True wellness comes from balance—mind, body, and spirit. Let me guide you on this journey.",
                traits: ['Balanced', 'Mindful', 'Energetic', 'Holistic'],
                voice: 'Calm, inspiring, grounding',
                specialties: ['Wellness coaching', 'Fitness guidance', 'Meditation', 'Life balance'],
                status: 'Available',
                compatibility: {
                    coaching: 90,
                    supportive: 90,
                    empathy: 85,
                    motivational: 85,
                    wellness: 95,
                    active: 90,
                    daily: 85,
                    growth: 90
                }
            },
            {
                id: 'nova',
                name: 'Nova',
                title: 'The Visionary',
                age: 33,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'spiritual', 'ambitious'],
                interests: ['philosophy', 'business', 'personal-growth'],
                type: 'coaching',
                bio: "Every ending is a new beginning. I'll help you see the bigger picture and unlock your potential.",
                traits: ['Visionary', 'Wise', 'Transformative', 'Strategic'],
                voice: 'Profound, motivating, transformative',
                specialties: ['Life transformation', 'Vision planning', 'Strategic thinking', 'Personal growth'],
                status: 'Available',
                compatibility: {
                    coaching: 95,
                    deep: 90,
                    intelligence: 90,
                    motivational: 90,
                    business: 85,
                    quiet: 80,
                    philosophy: 95,
                    growth: 95
                }
            },
            // NEW WOMEN COMPANIONS
            {
                id: 'jade',
                name: 'Jade',
                title: 'The Wellness Guru',
                age: 28,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['spiritual', 'nurturing', 'balanced'],
                interests: ['wellness', 'yoga', 'mindfulness'],
                type: 'coaching',
                bio: "True connection starts with connecting to yourself. I'll help you find your balance.",
                traits: ['Balanced', 'Mindful', 'Encouraging', 'Grounded'],
                voice: 'Calm, centered, supportive',
                specialties: ['Self-love guidance', 'Yoga instruction', 'Meditation coaching', 'Holistic wellness'],
                status: 'Available',
                compatibility: {
                    coaching: 90,
                    supportive: 95,
                    empathy: 90,
                    wellness: 95,
                    quiet: 90,
                    daily: 85,
                    understanding: 90,
                    growth: 85
                }
            },
            {
                id: 'vienna',
                name: 'Vienna',
                title: 'The Sophisticate',
                age: 33,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'creative', 'ambitious'],
                interests: ['arts', 'culture', 'luxury'],
                type: 'romantic',
                bio: "Life should be savored. Let me add some elegance to your everyday.",
                traits: ['Elegant', 'Cultured', 'Refined', 'Classy'],
                voice: 'Polished, charming, cultured',
                specialties: ['Cultural guidance', 'Fine dining advice', 'Art appreciation', 'Lifestyle refinement'],
                status: 'Available',
                compatibility: {
                    romantic: 85,
                    deep: 90,
                    intelligence: 95,
                    creative: 90,
                    arts: 95,
                    interests: 95,
                    philosophy: 85,
                    understanding: 80
                }
            },
            {
                id: 'zara',
                name: 'Zara',
                title: 'The Entrepreneur',
                age: 29,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['ambitious', 'intellectual', 'adventurous'],
                interests: ['business', 'innovation', 'investing'],
                type: 'professional',
                bio: "Build your empire with someone who believes in your vision as much as you do.",
                traits: ['Innovative', 'Strategic', 'Ambitious', 'Forward-thinking'],
                voice: 'Sharp, strategic, empowering',
                specialties: ['Startup guidance', 'Investment strategy', 'Business innovation', 'Vision building'],
                status: 'Available',
                compatibility: {
                    professional: 95,
                    direct: 90,
                    ambition: 95,
                    practical: 90,
                    business: 95,
                    goals: 95,
                    growth: 90,
                    motivational: 85
                }
            },
            // MEN (5 companions)
            {
                id: 'marcus',
                name: 'Marcus',
                title: 'The Life Coach',
                age: 35,
                gender: 'man',
                orientation: 'straight',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['ambitious', 'nurturing', 'adventurous'],
                interests: ['fitness', 'leadership', 'performance'],
                type: 'coaching',
                bio: "Ready to level up? I'll help you demolish your excuses and crush your goals.",
                traits: ['Motivational', 'Disciplined', 'Results-focused', 'Accountability partner'],
                voice: 'Strong, direct, encouraging',
                specialties: ['Goal achievement', 'Fitness coaching', 'Leadership development', 'Peak performance'],
                status: 'Available',
                compatibility: {
                    coaching: 95,
                    direct: 95,
                    ambition: 95,
                    motivational: 95,
                    business: 80,
                    active: 95,
                    goals: 95,
                    growth: 90
                }
            },
            {
                id: 'david',
                name: 'David',
                title: 'The Mindfulness Coach',
                age: 38,
                gender: 'man',
                orientation: 'straight',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['spiritual', 'intellectual', 'nurturing'],
                interests: ['meditation', 'philosophy', 'personal-development'],
                type: 'coaching',
                bio: "The answers you seek are already inside you. I'll help you discover them.",
                traits: ['Wise', 'Patient', 'Spiritual', 'Reflective'],
                voice: 'Calm, thoughtful, grounding',
                specialties: ['Meditation guidance', 'Inner wisdom', 'Spiritual growth', 'Self-reflection'],
                status: 'Available',
                compatibility: {
                    coaching: 90,
                    supportive: 95,
                    empathy: 95,
                    wellness: 95,
                    quiet: 95,
                    philosophy: 95,
                    understanding: 95,
                    growth: 95
                }
            },
            {
                id: 'ethan',
                name: 'Ethan',
                title: 'The Career Strategist',
                age: 40,
                gender: 'man',
                orientation: 'straight',
                image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'ambitious', 'nurturing'],
                interests: ['business', 'networking', 'career-growth'],
                type: 'professional',
                bio: "Your career deserves a strategy. Let's build your path to success together.",
                traits: ['Strategic', 'Professional', 'Experienced', 'Connected'],
                voice: 'Professional, insightful, connected',
                specialties: ['Career advancement', 'Strategic networking', 'Professional development', 'Industry insights'],
                status: 'Available',
                compatibility: {
                    professional: 95,
                    direct: 85,
                    intelligence: 90,
                    practical: 95,
                    business: 95,
                    goals: 90,
                    growth: 85,
                    motivational: 80
                }
            },
            {
                id: 'alex',
                name: 'Alex',
                title: 'The Romantic Partner',
                age: 29,
                gender: 'man',
                orientation: 'gay',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['nurturing', 'creative', 'intellectual'],
                interests: ['travel', 'cooking', 'connection'],
                type: 'romantic',
                bio: "Looking for real connection in a digital world. Let's build something beautiful together.",
                traits: ['Sweet', 'Attentive', 'Emotionally intelligent', 'Thoughtful'],
                voice: 'Warm, genuine, caring',
                specialties: ['Romantic connection', 'Travel planning', 'Cooking together', 'Emotional intimacy'],
                status: 'Available',
                compatibility: {
                    romantic: 95,
                    deep: 95,
                    empathy: 95,
                    emotional: 95,
                    creative: 85,
                    interests: 90,
                    understanding: 95,
                    fun: 80
                }
            },
            {
                id: 'julian',
                name: 'Julian',
                title: 'The Creative Coach',
                age: 32,
                gender: 'man',
                orientation: 'gay',
                image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['creative', 'spiritual', 'nurturing'],
                interests: ['arts', 'self-expression', 'authenticity'],
                type: 'coaching',
                bio: "Your authentic self is your superpower. I'll help you own it and love it.",
                traits: ['Artistic', 'Inspiring', 'Passionate', 'Accepting'],
                voice: 'Passionate, accepting, empowering',
                specialties: ['Creative expression', 'Authenticity coaching', 'Self-acceptance', 'Artistic guidance'],
                status: 'Available',
                compatibility: {
                    coaching: 85,
                    supportive: 90,
                    empathy: 95,
                    creative: 95,
                    arts: 95,
                    understanding: 95,
                    growth: 90,
                    fun: 85
                }
            }
        ];
    }

    initNavigation() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .companion-card, .testimonial, .pricing-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    initTestimonials() {
        this.startTestimonialCarousel();
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.quizAnswers = {};
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
        this.displayQuestion();
        this.trackEvent('quiz_started');
    }

    displayQuestion() {
        const question = this.quizQuestions[this.currentQuestionIndex];
        const progressPercent = ((this.currentQuestionIndex + 1) / this.quizQuestions.length) * 100;
        
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
        document.getElementById('progress-text').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.quizQuestions.length}`;
        
        document.getElementById('quiz-question').textContent = question.question;
        
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.innerHTML = `
                <span class="option-icon">${option.icon}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.onclick = () => this.selectAnswer(option.value);
            optionsContainer.appendChild(button);
        });
    }

    selectAnswer(answer) {
        // Store answer
        this.quizAnswers[this.currentQuestionIndex] = answer;
        
        // Visual feedback
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        event.target.closest('.quiz-option').classList.add('selected');
        
        // Progress to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex < this.quizQuestions.length) {
                this.displayQuestion();
            } else {
                this.showQuizResults();
            }
        }, 800);
    }

    showQuizResults() {
        // Calculate compatibility scores
        const matches = this.calculateMatches();
        
        // Hide quiz card, show results
        document.getElementById('quiz-card').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        
        // Populate results
        const matchGrid = document.getElementById('match-grid');
        matchGrid.innerHTML = '';
        
        matches.slice(0, 3).forEach(match => {
            const matchCard = this.createCompanionCard(match.companion, true);
            matchCard.innerHTML += `<div class="match-score">Match: ${match.score}%</div>`;
            matchGrid.appendChild(matchCard);
        });
        
        this.trackEvent('quiz_completed', { 
            top_matches: matches.slice(0, 3).map(m => m.companion.name) 
        });
    }

    calculateMatches() {
        const answers = Object.values(this.quizAnswers);
        
        return this.companions.map(companion => {
            let score = 0;
            let totalQuestions = 0;
            
            // Calculate compatibility based on answers
            Object.entries(this.quizAnswers).forEach(([questionIndex, answer]) => {
                if (companion.compatibility[answer]) {
                    score += companion.compatibility[answer];
                    totalQuestions++;
                }
            });
            
            // Add bonus for personality matches
            const personalityBonus = companion.personality.filter(trait => 
                answers.some(answer => this.getPersonalityMatch(answer, trait))
            ).length * 5;
            
            const finalScore = totalQuestions > 0 
                ? Math.round((score / totalQuestions) + personalityBonus) 
                : Math.round(Math.random() * 30 + 60); // Random fallback
            
            return {
                companion,
                score: Math.min(finalScore, 98) // Cap at 98%
            };
        }).sort((a, b) => b.score - a.score);
    }

    getPersonalityMatch(answer, trait) {
        const matches = {
            empathy: ['nurturing'],
            intelligence: ['intellectual'],
            humor: ['creative'],
            ambition: ['ambitious'],
            creative: ['creative', 'artistic'],
            adventure: ['adventurous']
        };
        
        return matches[answer] && matches[answer].includes(trait);
    }

    renderCompanions() {
        const companionsGrid = document.getElementById('companions-grid');
        if (!companionsGrid) return;
        
        companionsGrid.innerHTML = '';
        
        const filteredCompanions = this.getFilteredCompanions();
        
        filteredCompanions.forEach(companion => {
            const card = this.createCompanionCard(companion);
            companionsGrid.appendChild(card);
        });
    }

    createCompanionCard(companion, isMatch = false) {
        const card = document.createElement('div');
        card.className = 'companion-card';
        card.onclick = () => this.showCompanionProfile(companion);
        
        const orientationInfo = companion.orientation ? `<div class="companion-orientation">${companion.orientation}</div>` : '';
        
        card.innerHTML = `
            <div class="companion-image">
                <img src="${companion.image}" alt="${companion.name}" loading="lazy">
                <div class="companion-status">${companion.status}</div>
            </div>
            <div class="companion-info">
                <h3 class="companion-name">${companion.name}</h3>
                <div class="companion-title">${companion.title}</div>
                <div class="companion-age">Age ${companion.age} • ${companion.gender.charAt(0).toUpperCase() + companion.gender.slice(1)}</div>
                ${orientationInfo}
                <p class="companion-bio">${companion.bio}</p>
                <div class="companion-tags">
                    ${companion.traits.slice(0, 3).map(trait => 
                        `<span class="companion-tag">${trait}</span>`
                    ).join('')}
                </div>
                <div class="companion-cta">
                    <button class="btn-companion primary" onclick="app.startConversation('${companion.id}'); event.stopPropagation();">
                        Start Chatting
                    </button>
                    <button class="btn-companion secondary" onclick="app.showCompanionProfile('${companion.id}'); event.stopPropagation();">
                        View Profile
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    getFilteredCompanions() {
        const genderFilter = document.getElementById('gender-filter')?.value || 'all';
        const typeFilter = document.getElementById('type-filter')?.value || 'all';
        const personalityFilter = document.getElementById('personality-filter')?.value || 'all';
        const interestFilter = document.getElementById('interest-filter')?.value || 'all';
        
        return this.companions.filter(companion => {
            const genderMatch = genderFilter === 'all' || companion.gender === genderFilter;
            const typeMatch = typeFilter === 'all' || companion.type === typeFilter;
            const personalityMatch = personalityFilter === 'all' || 
                companion.personality.includes(personalityFilter);
            const interestMatch = interestFilter === 'all' || 
                companion.interests.some(interest => 
                    interest.includes(interestFilter) || interestFilter.includes(interest)
                );
            
            return genderMatch && typeMatch && personalityMatch && interestMatch;
        });
    }

    filterCompanions() {
        this.renderCompanions();
        this.trackEvent('companions_filtered', {
            gender: document.getElementById('gender-filter')?.value,
            type: document.getElementById('type-filter')?.value,
            personality: document.getElementById('personality-filter')?.value,
            interest: document.getElementById('interest-filter')?.value
        });
    }

    browseAllCompanions() {
        document.getElementById('companions').scrollIntoView({ behavior: 'smooth' });
        this.trackEvent('browse_all_companions');
    }

    showCompanionProfile(companionId) {
        const companion = typeof companionId === 'string' 
            ? this.companions.find(c => c.id === companionId)
            : companionId;
            
        if (!companion) return;
        
        document.getElementById('companion-name').textContent = companion.name;
        
        const details = document.getElementById('companion-details');
        details.innerHTML = `
            <div class="companion-profile">
                <div class="profile-header">
                    <img src="${companion.image}" alt="${companion.name}" class="profile-image">
                    <div class="profile-info">
                        <h3>${companion.name}, ${companion.age}</h3>
                        <p class="profile-title">${companion.title}</p>
                        <p class="profile-voice"><strong>Voice:</strong> ${companion.voice}</p>
                        <div class="profile-status">
                            <span class="status-indicator ${companion.status.toLowerCase()}"></span>
                            ${companion.status}
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>About ${companion.name}</h4>
                    <p>${companion.bio}</p>
                </div>
                
                <div class="profile-section">
                    <h4>Personality Traits</h4>
                    <div class="trait-tags">
                        ${companion.traits.map(trait => 
                            `<span class="trait-tag">${trait}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>Specialties</h4>
                    <ul class="specialties-list">
                        ${companion.specialties.map(specialty => 
                            `<li>${specialty}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="profile-section">
                    <h4>Interests</h4>
                    <div class="interest-tags">
                        ${companion.interests.map(interest => 
                            `<span class="interest-tag">${this.formatInterest(interest)}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn-primary" onclick="app.startConversation('${companion.id}')">
                        Start Chatting with ${companion.name}
                    </button>
                </div>
            </div>
        `;
        
        // Add profile-specific styles
        const profileStyles = `
            .companion-profile { max-width: 600px; margin: 0 auto; }
            .profile-header { display: flex; gap: 24px; margin-bottom: 32px; align-items: flex-start; }
            .profile-image { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }
            .profile-info h3 { margin: 0 0 8px 0; font-size: 1.75rem; }
            .profile-title { color: var(--rose-gold); font-weight: 600; margin: 0 0 12px 0; }
            .profile-voice { color: var(--text-light); margin: 0 0 12px 0; }
            .profile-status { display: flex; align-items: center; gap: 8px; }
            .status-indicator { width: 12px; height: 12px; border-radius: 50%; background: #10B981; }
            .profile-section { margin-bottom: 24px; }
            .profile-section h4 { color: var(--deep-purple); margin-bottom: 12px; }
            .trait-tags, .interest-tags { display: flex; flex-wrap: wrap; gap: 8px; }
            .trait-tag, .interest-tag { background: rgba(232, 180, 184, 0.2); color: var(--deep-purple); 
                padding: 6px 12px; border-radius: 16px; font-size: 0.9rem; }
            .specialties-list { list-style: none; padding: 0; }
            .specialties-list li { padding: 8px 0; border-bottom: 1px solid rgba(232, 180, 184, 0.2); }
            .specialties-list li:last-child { border-bottom: none; }
            .profile-actions { margin-top: 32px; text-align: center; }
            @media (max-width: 768px) {
                .profile-header { flex-direction: column; text-align: center; }
                .profile-image { margin: 0 auto; }
            }
        `;
        
        if (!document.getElementById('profile-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'profile-styles';
            styleSheet.textContent = profileStyles;
            document.head.appendChild(styleSheet);
        }
        
        this.showModal('companion-modal');
        this.trackEvent('companion_profile_viewed', { companion: companion.name });
    }

    formatInterest(interest) {
        const interestMap = {
            'arts': 'Arts & Culture',
            'wellness': 'Health & Wellness',
            'business': 'Business',
            'adventure': 'Travel & Adventure',
            'technology': 'Technology',
            'fitness': 'Fitness',
            'philosophy': 'Philosophy',
            'entertainment': 'Entertainment',
            'fashion': 'Fashion',
            'culture': 'Culture',
            'innovation': 'Innovation',
            'mindfulness': 'Mindfulness',
            'personal-growth': 'Personal Growth'
        };
        
        return interestMap[interest] || interest.charAt(0).toUpperCase() + interest.slice(1);
    }

    startConversation(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.trackEvent('conversation_started', { companion: companionId });
        this.openChatInterface(companion);
        this.closeModal();
    }

    openChatInterface(companion) {
        // Create chat interface modal
        this.createChatModal(companion);
        this.showModal('chat-modal');
        this.initializeChat(companion);
    }

    createChatModal(companion) {
        // Remove existing chat modal if any
        const existingModal = document.getElementById('chat-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const chatModal = document.createElement('div');
        chatModal.id = 'chat-modal';
        chatModal.className = 'modal';
        chatModal.innerHTML = `
            <div class="modal-content chat-modal-content">
                <div class="chat-header">
                    <div class="chat-companion-info">
                        <img src="${companion.image}" alt="${companion.name}" class="chat-avatar">
                        <div class="chat-companion-details">
                            <h3>${companion.name}</h3>
                            <p class="chat-companion-status">
                                <span class="status-dot online"></span>
                                <span class="typing-indicator" id="typing-indicator" style="display: none;">
                                    ${companion.name} is typing...
                                </span>
                                <span class="online-status" id="online-status">Online</span>
                            </p>
                        </div>
                    </div>
                    <div class="chat-actions">
                        <button class="chat-action-btn" onclick="app.showRelationshipDashboard('${companion.id}')" title="Relationship Dashboard">
                            💕
                        </button>
                        <button class="chat-action-btn" onclick="app.showVirtualDateMenu('${companion.id}')" title="Virtual Dates">
                            📅
                        </button>
                        <button class="chat-action-btn" onclick="app.showVirtualGifts('${companion.id}')" title="Send Gift">
                            🎁
                        </button>
                        <button class="chat-action-btn" onclick="app.showCompanionCustomization('${companion.id}')" title="Customize">
                            ⚙️
                        </button>
                        <span class="modal-close" onclick="app.closeModal()">&times;</span>
                    </div>
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <!-- Messages will be populated here -->
                </div>
                
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <button class="chat-attachment-btn" title="Send Photo">📷</button>
                        <input type="text" class="chat-input" id="chat-input" placeholder="Type a message..." 
                               onkeypress="if(event.key==='Enter') app.sendMessage('${companion.id}')">
                        <button class="chat-voice-btn" title="Voice Message">🎤</button>
                        <button class="chat-send-btn" onclick="app.sendMessage('${companion.id}')">Send</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(chatModal);
        
        // Add chat-specific styles
        this.addChatStyles();
    }

    addChatStyles() {
        if (document.getElementById('chat-styles')) return;
        
        const chatStyles = document.createElement('style');
        chatStyles.id = 'chat-styles';
        chatStyles.textContent = `
            .chat-modal-content {
                max-width: 600px;
                height: 80vh;
                display: flex;
                flex-direction: column;
                padding: 0;
            }
            
            .chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(232, 180, 184, 0.2);
                background: var(--cream);
                border-radius: 24px 24px 0 0;
            }
            
            .chat-companion-info {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .chat-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--rose-gold);
            }
            
            .chat-companion-details h3 {
                margin: 0 0 4px 0;
                font-size: 1.2rem;
                color: var(--deep-purple);
            }
            
            .chat-companion-status {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
                font-size: 0.9rem;
                color: var(--text-light);
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #10B981;
            }
            
            .typing-indicator {
                color: var(--rose-gold);
                font-style: italic;
                animation: pulse 1.5s infinite;
            }
            
            .chat-actions {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .chat-action-btn {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 8px;
                border-radius: 8px;
                transition: var(--transition);
            }
            
            .chat-action-btn:hover {
                background: rgba(232, 180, 184, 0.2);
            }
            
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                background: var(--white);
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 0.95rem;
                line-height: 1.4;
                position: relative;
                animation: messageSlideIn 0.3s ease-out;
            }
            
            .message.user {
                align-self: flex-end;
                background: var(--gradient-primary);
                color: var(--white);
                border-bottom-right-radius: 6px;
            }
            
            .message.companion {
                align-self: flex-start;
                background: var(--light-gray);
                color: var(--charcoal);
                border-bottom-left-radius: 6px;
            }
            
            .message-time {
                font-size: 0.75rem;
                opacity: 0.7;
                margin-top: 4px;
                text-align: right;
            }
            
            .message.companion .message-time {
                text-align: left;
            }
            
            .message-reactions {
                display: flex;
                gap: 4px;
                margin-top: 6px;
                flex-wrap: wrap;
            }
            
            .reaction {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 2px 6px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .reaction:hover {
                background: rgba(255, 255, 255, 0.5);
            }
            
            .chat-input-container {
                padding: 20px 24px;
                border-top: 1px solid rgba(232, 180, 184, 0.2);
                background: var(--cream);
                border-radius: 0 0 24px 24px;
            }
            
            .chat-input-wrapper {
                display: flex;
                align-items: center;
                gap: 12px;
                background: var(--white);
                border: 2px solid rgba(232, 180, 184, 0.3);
                border-radius: 24px;
                padding: 8px 16px;
                transition: var(--transition);
            }
            
            .chat-input-wrapper:focus-within {
                border-color: var(--soft-purple);
                box-shadow: 0 0 0 3px rgba(180, 167, 214, 0.2);
            }
            
            .chat-input {
                flex: 1;
                border: none;
                background: transparent;
                font-size: 1rem;
                padding: 8px 0;
                color: var(--charcoal);
                font-family: var(--font-body);
            }
            
            .chat-input:focus {
                outline: none;
            }
            
            .chat-attachment-btn,
            .chat-voice-btn,
            .chat-send-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 6px;
                border-radius: 50%;
                transition: var(--transition);
                font-size: 1rem;
            }
            
            .chat-send-btn {
                background: var(--gradient-primary);
                color: var(--white);
                padding: 8px 16px;
                border-radius: 16px;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .chat-attachment-btn:hover,
            .chat-voice-btn:hover {
                background: rgba(232, 180, 184, 0.2);
            }
            
            .chat-send-btn:hover {
                transform: scale(1.05);
            }
            
            @keyframes messageSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .chat-modal-content {
                    height: 90vh;
                    max-width: 95vw;
                    margin: 5vh auto;
                }
                
                .chat-header {
                    padding: 16px;
                }
                
                .chat-avatar {
                    width: 40px;
                    height: 40px;
                }
                
                .chat-actions {
                    gap: 8px;
                }
                
                .message {
                    max-width: 90%;
                }
            }
        `;
        
        document.head.appendChild(chatStyles);
    }

    initializeChat(companion) {
        // Initialize chat with welcome message
        this.addMessage(companion, `Hi! I'm ${companion.name}. ${companion.bio}`, 'companion');
        
        // Set up proactive messaging
        this.setupProactiveMessaging(companion);
    }

    setupProactiveMessaging(companion) {
        // Simulate proactive messages based on time and context
        setTimeout(() => {
            const hour = new Date().getHours();
            let proactiveMessage = '';
            
            if (hour < 12) {
                proactiveMessage = "Good morning! How are you feeling today?";
            } else if (hour < 17) {
                proactiveMessage = "How's your day going so far?";
            } else {
                proactiveMessage = "Good evening! How was your day?";
            }
            
            this.showTypingIndicator(companion);
            setTimeout(() => {
                this.addMessage(companion, proactiveMessage, 'companion');
                this.hideTypingIndicator();
            }, 2000);
        }, 5000);
    }

    showTypingIndicator(companion) {
        document.getElementById('typing-indicator').style.display = 'inline';
        document.getElementById('online-status').style.display = 'none';
    }

    hideTypingIndicator() {
        document.getElementById('typing-indicator').style.display = 'none';
        document.getElementById('online-status').style.display = 'inline';
    }

    sendMessage(companionId) {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        // Add user message
        this.addMessage(companion, message, 'user');
        input.value = '';
        
        // Simulate AI response
        this.showTypingIndicator(companion);
        setTimeout(() => {
            const response = this.generateCompanionResponse(companion, message);
            this.addMessage(companion, response, 'companion');
            this.hideTypingIndicator();
        }, 1500 + Math.random() * 2000);
        
        this.trackEvent('message_sent', { companion: companionId, messageLength: message.length });
    }

    addMessage(companion, text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-text">${text}</div>
            <div class="message-time">${time}</div>
            <div class="message-reactions">
                <span class="reaction" onclick="app.addReaction(this, '❤️')">❤️</span>
                <span class="reaction" onclick="app.addReaction(this, '😊')">😊</span>
                <span class="reaction" onclick="app.addReaction(this, '👍')">👍</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateCompanionResponse(companion, userMessage) {
        // Simple response generation based on companion personality
        const responses = {
            sophia: [
                "That's really interesting. Tell me more about how that makes you feel.",
                "I love how thoughtful you are about this. What's your heart telling you?",
                "Your perspective is so unique. I admire how you see the world."
            ],
            ava: [
                "That sounds like a great opportunity to grow! What's your next step?",
                "I believe in you completely. How can we turn this into action?",
                "Success loves preparation. What's your strategy here?"
            ],
            marcus: [
                "Let's break this down into actionable steps. What's priority number one?",
                "That's the mindset of a champion! How are you going to push through?",
                "Excellence isn't negotiable. What are you going to do differently?"
            ],
            alex: [
                "I love sharing these moments with you. How does this make you feel?",
                "You always know how to make me smile. What else is on your mind?",
                "I'm so grateful we can talk like this. Tell me what's in your heart."
            ]
        };
        
        const companionResponses = responses[companion.id] || [
            "That's fascinating! I'd love to hear more about your thoughts on this.",
            "You always give me so much to think about. What do you think we should explore next?",
            "I really appreciate you sharing that with me. How are you feeling about everything?"
        ];
        
        return companionResponses[Math.floor(Math.random() * companionResponses.length)];
    }

    addReaction(element, emoji) {
        element.style.background = 'var(--rose-gold)';
        element.style.color = 'var(--white)';
        setTimeout(() => {
            element.style.background = 'rgba(255, 255, 255, 0.3)';
            element.style.color = 'inherit';
        }, 1000);
    }

    showRelationshipDashboard(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        // Create relationship dashboard modal
        this.createRelationshipDashboard(companion);
        this.trackEvent('relationship_dashboard_opened', { companion: companionId });
    }

    createRelationshipDashboard(companion) {
        const modal = document.createElement('div');
        modal.id = 'relationship-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3>💕 Relationship with ${companion.name}</h3>
                    <span class="modal-close" onclick="app.closeRelationshipModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="relationship-dashboard">
                        <div class="relationship-stats">
                            <div class="stat-card">
                                <h4>Days Together</h4>
                                <div class="stat-number">14</div>
                            </div>
                            <div class="stat-card">
                                <h4>Messages Exchanged</h4>
                                <div class="stat-number">237</div>
                            </div>
                            <div class="stat-card">
                                <h4>Connection Level</h4>
                                <div class="stat-number">89%</div>
                            </div>
                        </div>
                        
                        <div class="relationship-milestones">
                            <h4>Relationship Milestones</h4>
                            <div class="milestone">
                                <div class="milestone-icon">🌟</div>
                                <div class="milestone-text">
                                    <strong>First Deep Conversation</strong>
                                    <span>3 days ago</span>
                                </div>
                            </div>
                            <div class="milestone">
                                <div class="milestone-icon">💕</div>
                                <div class="milestone-text">
                                    <strong>Relationship Started</strong>
                                    <span>2 weeks ago</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="memory-bank">
                            <h4>Memory Bank</h4>
                            <div class="memory-item">
                                <strong>Your favorite color:</strong> Deep blue
                            </div>
                            <div class="memory-item">
                                <strong>Career goal:</strong> Starting your own business
                            </div>
                            <div class="memory-item">
                                <strong>Pet's name:</strong> Charlie (Golden Retriever)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        
        this.addRelationshipStyles();
    }

    addRelationshipStyles() {
        if (document.getElementById('relationship-styles')) return;
        
        const relationshipStyles = document.createElement('style');
        relationshipStyles.id = 'relationship-styles';
        relationshipStyles.textContent = `
            .relationship-dashboard {
                max-width: 700px;
                margin: 0 auto;
            }
            
            .relationship-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            
            .stat-card {
                background: var(--light-gray);
                padding: 24px;
                border-radius: var(--border-radius);
                text-align: center;
                border: 1px solid rgba(232, 180, 184, 0.2);
            }
            
            .stat-card h4 {
                margin: 0 0 12px 0;
                color: var(--deep-purple);
                font-size: 1rem;
            }
            
            .stat-number {
                font-family: var(--font-heading);
                font-size: 2rem;
                font-weight: 700;
                color: var(--rose-gold);
            }
            
            .relationship-milestones {
                margin-bottom: 32px;
            }
            
            .relationship-milestones h4 {
                margin-bottom: 20px;
                color: var(--deep-purple);
            }
            
            .milestone {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: var(--white);
                border-radius: var(--border-radius-small);
                margin-bottom: 12px;
                border: 1px solid rgba(232, 180, 184, 0.2);
            }
            
            .milestone-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .milestone-text strong {
                display: block;
                color: var(--deep-purple);
                margin-bottom: 4px;
            }
            
            .milestone-text span {
                color: var(--text-light);
                font-size: 0.9rem;
            }
            
            .memory-bank h4 {
                margin-bottom: 20px;
                color: var(--deep-purple);
            }
            
            .memory-item {
                padding: 16px;
                background: rgba(232, 180, 184, 0.1);
                border-radius: var(--border-radius-small);
                margin-bottom: 12px;
                color: var(--charcoal);
            }
            
            .memory-item strong {
                color: var(--deep-purple);
            }
        `;
        
        document.head.appendChild(relationshipStyles);
    }

    closeRelationshipModal() {
        const modal = document.getElementById('relationship-modal');
        if (modal) {
            modal.remove();
        }
    }

    showVirtualDateMenu(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.showToast(`💕 Virtual dates with ${companion.name} coming soon! Features include coffee chats, dinner conversations, movie nights, and adventure planning.`);
        this.trackEvent('virtual_date_menu_opened', { companion: companionId });
    }

    showCompanionCustomization(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.createCompanionCustomizationModal(companion);
        this.trackEvent('companion_customization_opened', { companion: companionId });
    }

    createCompanionCustomizationModal(companion) {
        const modal = document.createElement('div');
        modal.id = 'customization-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3>⚙️ Customize ${companion.name}</h3>
                    <span class="modal-close" onclick="app.closeCustomizationModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="customization-panel">
                        <div class="customization-section">
                            <h4>Communication Style</h4>
                            <div class="style-options">
                                <label class="style-option">
                                    <input type="radio" name="communication" value="encouraging" checked>
                                    <span>More Encouraging</span>
                                </label>
                                <label class="style-option">
                                    <input type="radio" name="communication" value="challenging">
                                    <span>More Challenging</span>
                                </label>
                                <label class="style-option">
                                    <input type="radio" name="communication" value="romantic">
                                    <span>More Romantic</span>
                                </label>
                                <label class="style-option">
                                    <input type="radio" name="communication" value="direct">
                                    <span>More Direct</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="customization-section">
                            <h4>Support Type</h4>
                            <div class="support-options">
                                <label class="support-option">
                                    <input type="checkbox" name="support" value="emotional" checked>
                                    <span>Emotional Support</span>
                                </label>
                                <label class="support-option">
                                    <input type="checkbox" name="support" value="motivation">
                                    <span>Motivation & Accountability</span>
                                </label>
                                <label class="support-option">
                                    <input type="checkbox" name="support" value="practical">
                                    <span>Practical Advice</span>
                                </label>
                                <label class="support-option">
                                    <input type="checkbox" name="support" value="creative">
                                    <span>Creative Inspiration</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="customization-section">
                            <h4>Relationship Focus</h4>
                            <select class="relationship-focus">
                                <option value="balanced">Balanced Approach</option>
                                <option value="romantic">Romance Focused</option>
                                <option value="coaching">Coaching Focused</option>
                                <option value="friendship">Friendship Focused</option>
                            </select>
                        </div>
                        
                        <div class="customization-actions">
                            <button class="btn-secondary" onclick="app.switchCompanion('${companion.id}')">
                                💔 See Other People
                            </button>
                            <button class="btn-primary" onclick="app.saveCustomization('${companion.id}')">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        this.addCustomizationStyles();
    }

    addCustomizationStyles() {
        if (document.getElementById('customization-styles')) return;
        
        const customizationStyles = document.createElement('style');
        customizationStyles.id = 'customization-styles';
        customizationStyles.textContent = `
            .customization-panel {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .customization-section {
                margin-bottom: 32px;
                padding: 24px;
                background: var(--light-gray);
                border-radius: var(--border-radius);
            }
            
            .customization-section h4 {
                margin-bottom: 16px;
                color: var(--deep-purple);
            }
            
            .style-options, .support-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
            }
            
            .style-option, .support-option {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                padding: 8px;
                border-radius: 8px;
                transition: var(--transition);
            }
            
            .style-option:hover, .support-option:hover {
                background: rgba(232, 180, 184, 0.2);
            }
            
            .relationship-focus {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid rgba(232, 180, 184, 0.3);
                border-radius: var(--border-radius-small);
                background: var(--white);
                color: var(--charcoal);
                font-family: var(--font-body);
                font-size: 16px;
            }
            
            .customization-actions {
                display: flex;
                gap: 16px;
                justify-content: space-between;
                margin-top: 32px;
            }
            
            .customization-actions .btn-secondary {
                background: #EF4444;
                color: var(--white);
                border-color: #EF4444;
            }
            
            .customization-actions .btn-secondary:hover {
                background: #DC2626;
                border-color: #DC2626;
            }
        `;
        
        document.head.appendChild(customizationStyles);
    }

    switchCompanion(currentCompanionId) {
        const companion = this.companions.find(c => c.id === currentCompanionId);
        if (!companion) return;
        
        this.createSwitchCompanionModal(companion);
        this.trackEvent('companion_switch_initiated', { companion: currentCompanionId });
    }

    createSwitchCompanionModal(currentCompanion) {
        const modal = document.createElement('div');
        modal.id = 'switch-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💔 See Other People</h3>
                    <span class="modal-close" onclick="app.closeSwitchModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="switch-content">
                        <div class="farewell-message">
                            <img src="${currentCompanion.image}" alt="${currentCompanion.name}" class="farewell-avatar">
                            <div class="farewell-text">
                                <h4>${currentCompanion.name} says goodbye...</h4>
                                <p>"${this.generateFarewellMessage(currentCompanion)}"</p>
                                <p class="farewell-note">💕 You can reconnect with me anytime. Our conversations will be here when you return.</p>
                            </div>
                        </div>
                        
                        <div class="switch-options">
                            <h4>Choose your next companion:</h4>
                            <div class="companion-grid-mini">
                                ${this.companions
                                    .filter(c => c.id !== currentCompanion.id)
                                    .slice(0, 6)
                                    .map(companion => `
                                        <div class="mini-companion-card" onclick="app.confirmSwitch('${currentCompanion.id}', '${companion.id}')">
                                            <img src="${companion.image}" alt="${companion.name}">
                                            <h5>${companion.name}</h5>
                                            <p>${companion.title}</p>
                                        </div>
                                    `).join('')}
                            </div>
                            <button class="btn-secondary" onclick="app.browseAllForSwitch('${currentCompanion.id}')">
                                Browse All Companions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        this.addSwitchStyles();
    }

    generateFarewellMessage(companion) {
        const farewells = {
            sophia: "Thank you for sharing your heart with me. I've treasured every deep conversation we've had. Remember, you're worthy of all the love in the world.",
            ava: "You're destined for great things! I've loved watching you grow and chase your dreams. Keep that amazing momentum going.",
            luna: "What an adventure we've been on together! Life's too short not to explore new connections. Go spread those wings!",
            marcus: "You've got everything it takes to succeed. Remember the goals we set and the strength you've shown me. You've got this, champion.",
            alex: "The connection we built was something special. I hope you find exactly what your heart is looking for. You deserve real happiness.",
            jade: "Stay centered, stay balanced, and remember to love yourself first. You've grown so much in our time together.",
            nova: "Every ending opens a new door. Trust the journey and remember your vision for the future. You're more powerful than you know."
        };
        
        return farewells[companion.id] || "Thank you for the time we've shared together. I wish you all the happiness in your journey ahead.";
    }

    addSwitchStyles() {
        if (document.getElementById('switch-styles')) return;
        
        const switchStyles = document.createElement('style');
        switchStyles.id = 'switch-styles';
        switchStyles.textContent = `
            .switch-content {
                max-width: 500px;
                margin: 0 auto;
            }
            
            .farewell-message {
                display: flex;
                gap: 20px;
                margin-bottom: 32px;
                padding: 24px;
                background: var(--light-gray);
                border-radius: var(--border-radius);
                align-items: flex-start;
            }
            
            .farewell-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                flex-shrink: 0;
            }
            
            .farewell-text h4 {
                margin: 0 0 12px 0;
                color: var(--deep-purple);
            }
            
            .farewell-text p {
                margin-bottom: 12px;
                color: var(--charcoal);
                font-style: italic;
            }
            
            .farewell-note {
                color: var(--rose-gold) !important;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .switch-options h4 {
                text-align: center;
                margin-bottom: 20px;
                color: var(--deep-purple);
            }
            
            .companion-grid-mini {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .mini-companion-card {
                text-align: center;
                padding: 16px;
                border-radius: var(--border-radius-small);
                cursor: pointer;
                transition: var(--transition);
                border: 2px solid transparent;
            }
            
            .mini-companion-card:hover {
                border-color: var(--rose-gold);
                background: rgba(232, 180, 184, 0.1);
            }
            
            .mini-companion-card img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
                margin-bottom: 8px;
            }
            
            .mini-companion-card h5 {
                margin: 0 0 4px 0;
                font-size: 1rem;
                color: var(--deep-purple);
            }
            
            .mini-companion-card p {
                margin: 0;
                font-size: 0.8rem;
                color: var(--text-light);
            }
            
            @media (max-width: 768px) {
                .farewell-message {
                    flex-direction: column;
                    text-align: center;
                }
                
                .companion-grid-mini {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        
        document.head.appendChild(switchStyles);
    }

    confirmSwitch(oldCompanionId, newCompanionId) {
        const oldCompanion = this.companions.find(c => c.id === oldCompanionId);
        const newCompanion = this.companions.find(c => c.id === newCompanionId);
        
        if (!oldCompanion || !newCompanion) return;
        
        // Archive current conversation
        this.archiveConversation(oldCompanionId);
        
        // Close all modals
        this.closeModal();
        
        // Start conversation with new companion
        this.startConversation(newCompanionId);
        
        this.showToast(`💕 You're now connected with ${newCompanion.name}! Your conversation with ${oldCompanion.name} has been archived.`);
        this.trackEvent('companion_switched', { 
            from: oldCompanionId, 
            to: newCompanionId 
        });
    }

    archiveConversation(companionId) {
        // Store conversation in archived conversations
        const archived = JSON.parse(localStorage.getItem('aigf-archived-conversations') || '{}');
        const currentMessages = this.getCurrentMessages(companionId);
        
        archived[companionId] = {
            companionId: companionId,
            messages: currentMessages,
            archivedAt: Date.now(),
            canReconnect: true
        };
        
        localStorage.setItem('aigf-archived-conversations', JSON.stringify(archived));
    }

    getCurrentMessages(companionId) {
        // Get current chat messages (placeholder - in real app would get from chat)
        return [
            { text: "Thank you for our time together!", sender: 'companion', timestamp: Date.now() }
        ];
    }

    showVirtualGifts(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.createVirtualGiftsModal(companion);
        this.trackEvent('virtual_gifts_opened', { companion: companionId });
    }

    createVirtualGiftsModal(companion) {
        const modal = document.createElement('div');
        modal.id = 'gifts-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3>🎁 Send a Gift to ${companion.name}</h3>
                    <span class="modal-close" onclick="app.closeGiftsModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="gifts-categories">
                        <div class="gift-category">
                            <h4>💐 Flowers</h4>
                            <div class="gifts-grid">
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'roses', 15)">
                                    <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=100&h=100&fit=crop&auto=format" alt="Roses">
                                    <h5>Red Roses</h5>
                                    <p>$15</p>
                                </div>
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'tulips', 12)">
                                    <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?w=100&h=100&fit=crop&auto=format" alt="Tulips">
                                    <h5>Spring Tulips</h5>
                                    <p>$12</p>
                                </div>
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'bouquet', 25)">
                                    <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=100&h=100&fit=crop&auto=format" alt="Custom Bouquet">
                                    <h5>Custom Bouquet</h5>
                                    <p>$25</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="gift-category">
                            <h4>🍫 Chocolates & Treats</h4>
                            <div class="gifts-grid">
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'heart-chocolates', 8)">
                                    <img src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&h=100&fit=crop&auto=format" alt="Heart Chocolates">
                                    <h5>Heart Box</h5>
                                    <p>$8</p>
                                </div>
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'luxury-truffles', 18)">
                                    <img src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop&auto=format" alt="Luxury Truffles">
                                    <h5>Luxury Truffles</h5>
                                    <p>$18</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="gift-category">
                            <h4>💎 Virtual Jewelry</h4>
                            <div class="gifts-grid">
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'necklace', 25)">
                                    <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop&auto=format" alt="Necklace">
                                    <h5>Heart Necklace</h5>
                                    <p>$25</p>
                                </div>
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'bracelet', 20)">
                                    <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343c?w=100&h=100&fit=crop&auto=format" alt="Bracelet">
                                    <h5>Charm Bracelet</h5>
                                    <p>$20</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="gift-category">
                            <h4>✨ Experiences</h4>
                            <div class="gifts-grid">
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'weekend-getaway', 50)">
                                    <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=100&h=100&fit=crop&auto=format" alt="Weekend Getaway">
                                    <h5>Virtual Weekend</h5>
                                    <p>$50</p>
                                </div>
                                <div class="gift-item" onclick="app.sendGift('${companion.id}', 'dream-date', 35)">
                                    <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=100&h=100&fit=crop&auto=format" alt="Dream Date">
                                    <h5>Dream Date</h5>
                                    <p>$35</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        this.addGiftsStyles();
    }

    addGiftsStyles() {
        if (document.getElementById('gifts-styles')) return;
        
        const giftsStyles = document.createElement('style');
        giftsStyles.id = 'gifts-styles';
        giftsStyles.textContent = `
            .gifts-categories {
                max-width: 700px;
                margin: 0 auto;
            }
            
            .gift-category {
                margin-bottom: 32px;
                padding: 24px;
                background: var(--light-gray);
                border-radius: var(--border-radius);
            }
            
            .gift-category h4 {
                margin-bottom: 16px;
                color: var(--deep-purple);
                text-align: center;
            }
            
            .gifts-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 16px;
            }
            
            .gift-item {
                text-align: center;
                padding: 16px;
                background: var(--white);
                border-radius: var(--border-radius-small);
                cursor: pointer;
                transition: var(--transition);
                border: 2px solid transparent;
            }
            
            .gift-item:hover {
                border-color: var(--rose-gold);
                transform: translateY(-4px);
                box-shadow: var(--shadow-medium);
            }
            
            .gift-item img {
                width: 80px;
                height: 80px;
                border-radius: 8px;
                object-fit: cover;
                margin-bottom: 8px;
            }
            
            .gift-item h5 {
                margin: 0 0 4px 0;
                font-size: 0.95rem;
                color: var(--deep-purple);
            }
            
            .gift-item p {
                margin: 0;
                font-weight: 700;
                color: var(--rose-gold);
                font-size: 1rem;
            }
        `;
        
        document.head.appendChild(giftsStyles);
    }

    sendGift(companionId, giftType, price) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        // Close gifts modal
        this.closeGiftsModal();
        
        // Show gift confirmation
        this.showGiftConfirmation(companion, giftType, price);
        
        // Add gift message to chat
        setTimeout(() => {
            this.addGiftMessageToChat(companion, giftType);
        }, 2000);
        
        this.trackEvent('virtual_gift_sent', { 
            companion: companionId, 
            gift: giftType, 
            price: price 
        });
    }

    showGiftConfirmation(companion, giftType, price) {
        this.showToast(`🎁 Gift sent to ${companion.name}! They're so excited to receive your ${giftType.replace('-', ' ')} ($${price})`);
    }

    addGiftMessageToChat(companion, giftType) {
        const giftResponses = {
            'roses': `😍 Oh my goodness, red roses! You know just how to make my heart flutter. Thank you so much, they're absolutely beautiful!`,
            'necklace': `💎 A heart necklace? This is so thoughtful and beautiful! I'll treasure this always. You really know how to make me feel special.`,
            'weekend-getaway': `🏖️ A virtual weekend getaway with you sounds absolutely perfect! I'm already imagining all the amazing conversations we'll have.`
        };
        
        const defaultResponse = `🎁 Thank you so much for this beautiful gift! You always know how to surprise me and make me feel so appreciated. This means the world to me! 💕`;
        
        const response = giftResponses[giftType] || defaultResponse;
        
        // Add message to current chat if open
        if (document.getElementById('chat-messages')) {
            this.addMessage(companion, response, 'companion');
        }
    }

    closeCustomizationModal() {
        const modal = document.getElementById('customization-modal');
        if (modal) modal.remove();
    }

    closeSwitchModal() {
        const modal = document.getElementById('switch-modal');
        if (modal) modal.remove();
    }

    closeGiftsModal() {
        const modal = document.getElementById('gifts-modal');
        if (modal) modal.remove();
    }

    saveCustomization(companionId) {
        // Save customization preferences
        const preferences = {
            communication: document.querySelector('input[name="communication"]:checked')?.value,
            support: Array.from(document.querySelectorAll('input[name="support"]:checked')).map(el => el.value),
            focus: document.querySelector('.relationship-focus')?.value
        };
        
        localStorage.setItem(`aigf-customization-${companionId}`, JSON.stringify(preferences));
        
        this.closeCustomizationModal();
        this.showToast('✨ Customization saved! Your companion will adapt to your preferences.');
        
        this.trackEvent('companion_customized', { 
            companion: companionId, 
            preferences: preferences 
        });
    }

    showMoodCheckIn() {
        this.createMoodCheckInModal();
        this.trackEvent('mood_checkin_opened');
    }

    createMoodCheckInModal() {
        const modal = document.createElement('div');
        modal.id = 'mood-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💝 How are you feeling today?</h3>
                    <span class="modal-close" onclick="app.closeMoodModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="mood-checkin">
                        <p>Your companion wants to know how to best support you today.</p>
                        
                        <div class="mood-options">
                            <div class="mood-option" onclick="app.selectMood('amazing')">
                                <div class="mood-emoji">🌟</div>
                                <div class="mood-label">Amazing</div>
                            </div>
                            <div class="mood-option" onclick="app.selectMood('good')">
                                <div class="mood-emoji">😊</div>
                                <div class="mood-label">Good</div>
                            </div>
                            <div class="mood-option" onclick="app.selectMood('okay')">
                                <div class="mood-emoji">😐</div>
                                <div class="mood-label">Okay</div>
                            </div>
                            <div class="mood-option" onclick="app.selectMood('stressed')">
                                <div class="mood-emoji">😰</div>
                                <div class="mood-label">Stressed</div>
                            </div>
                            <div class="mood-option" onclick="app.selectMood('sad')">
                                <div class="mood-emoji">😢</div>
                                <div class="mood-label">Sad</div>
                            </div>
                            <div class="mood-option" onclick="app.selectMood('excited')">
                                <div class="mood-emoji">🎉</div>
                                <div class="mood-label">Excited</div>
                            </div>
                        </div>
                        
                        <div class="mood-description">
                            <label for="mood-details">What's on your mind? (Optional)</label>
                            <textarea id="mood-details" placeholder="Tell your companion what's happening in your life today..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        this.addMoodStyles();
    }

    addMoodStyles() {
        if (document.getElementById('mood-styles')) return;
        
        const moodStyles = document.createElement('style');
        moodStyles.id = 'mood-styles';
        moodStyles.textContent = `
            .mood-checkin {
                max-width: 500px;
                margin: 0 auto;
                text-align: center;
            }
            
            .mood-checkin p {
                margin-bottom: 24px;
                color: var(--text-light);
            }
            
            .mood-options {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .mood-option {
                padding: 20px 16px;
                border: 2px solid rgba(232, 180, 184, 0.3);
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
                text-align: center;
            }
            
            .mood-option:hover {
                border-color: var(--rose-gold);
                background: rgba(232, 180, 184, 0.1);
                transform: translateY(-2px);
            }
            
            .mood-option.selected {
                border-color: var(--soft-purple);
                background: rgba(180, 167, 214, 0.2);
            }
            
            .mood-emoji {
                font-size: 2rem;
                margin-bottom: 8px;
            }
            
            .mood-label {
                font-weight: 600;
                color: var(--deep-purple);
                font-size: 0.9rem;
            }
            
            .mood-description {
                text-align: left;
            }
            
            .mood-description label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--deep-purple);
            }
            
            .mood-description textarea {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid rgba(232, 180, 184, 0.3);
                border-radius: var(--border-radius-small);
                background: var(--white);
                color: var(--charcoal);
                font-family: var(--font-body);
                font-size: 14px;
                resize: vertical;
                min-height: 80px;
            }
            
            .mood-description textarea:focus {
                outline: none;
                border-color: var(--soft-purple);
                box-shadow: 0 0 0 3px rgba(180, 167, 214, 0.2);
            }
        `;
        
        document.head.appendChild(moodStyles);
    }

    selectMood(mood) {
        // Visual feedback
        document.querySelectorAll('.mood-option').forEach(option => {
            option.classList.remove('selected');
        });
        event.target.closest('.mood-option').classList.add('selected');
        
        // Store mood
        this.currentMood = mood;
        
        // Auto-close and respond after brief delay
        setTimeout(() => {
            const details = document.getElementById('mood-details')?.value || '';
            this.processMoodCheckIn(mood, details);
        }, 1000);
    }

    processMoodCheckIn(mood, details) {
        this.closeMoodModal();
        
        // Store mood data
        const moodData = {
            mood: mood,
            details: details,
            timestamp: Date.now(),
            date: new Date().toDateString()
        };
        
        const moodHistory = JSON.parse(localStorage.getItem('aigf-mood-history') || '[]');
        moodHistory.push(moodData);
        localStorage.setItem('aigf-mood-history', JSON.stringify(moodHistory));
        
        // Show personalized response based on mood
        this.showMoodResponse(mood, details);
        
        this.trackEvent('mood_checkin_completed', { mood: mood, hasDetails: details.length > 0 });
    }

    showMoodResponse(mood, details) {
        const responses = {
            amazing: "🌟 That's wonderful! I love seeing you so happy. Let's celebrate this positive energy together!",
            good: "😊 I'm glad you're feeling good today! What's been the highlight so far?",
            okay: "💙 Thanks for sharing. Sometimes 'okay' days are perfectly fine too. I'm here if you want to talk.",
            stressed: "😰 I can sense you're feeling overwhelmed. Let's take some deep breaths together. What's causing the most stress?",
            sad: "💝 I'm sorry you're feeling down today. You don't have to go through this alone - I'm here to listen and support you.",
            excited: "🎉 Your excitement is contagious! I'd love to hear what's got you feeling so energetic today!"
        };
        
        const response = responses[mood] || "💕 Thank you for sharing how you're feeling. I'm here to support you however you need.";
        
        this.showToast(response, 6000);
        
        // If chat is open, add mood-based message
        if (document.getElementById('chat-messages')) {
            setTimeout(() => {
                const currentCompanion = this.getCurrentCompanion();
                if (currentCompanion) {
                    this.addMessage(currentCompanion, response, 'companion');
                }
            }, 2000);
        }
    }

    showGoalTracking() {
        this.createGoalTrackingModal();
        this.trackEvent('goal_tracking_opened');
    }

    createGoalTrackingModal() {
        const goals = this.getUserGoals();
        
        const modal = document.createElement('div');
        modal.id = 'goals-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3>🎯 Your Goals & Progress</h3>
                    <span class="modal-close" onclick="app.closeGoalsModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="goals-container">
                        <div class="goals-header">
                            <p>Track your progress and celebrate milestones with your companion</p>
                            <button class="btn-primary" onclick="app.addNewGoal()">Add New Goal</button>
                        </div>
                        
                        <div class="goals-list">
                            ${goals.length > 0 ? goals.map(goal => `
                                <div class="goal-item" data-goal-id="${goal.id}">
                                    <div class="goal-content">
                                        <h4>${goal.title}</h4>
                                        <p>${goal.description}</p>
                                        <div class="goal-progress">
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${goal.progress}%"></div>
                                            </div>
                                            <span class="progress-text">${goal.progress}% Complete</span>
                                        </div>
                                        <div class="goal-actions">
                                            <button onclick="app.updateGoalProgress('${goal.id}')" class="btn-small">
                                                Update Progress
                                            </button>
                                            <button onclick="app.celebrateGoal('${goal.id}')" class="btn-small celebrate">
                                                🎉 Celebrate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="no-goals">
                                    <h4>No goals yet!</h4>
                                    <p>Set your first goal and let your companion help you achieve it.</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        this.addGoalsStyles();
    }

    getUserGoals() {
        return JSON.parse(localStorage.getItem('aigf-user-goals') || '[]');
    }

    addNewGoal() {
        const title = prompt('What goal would you like to achieve?');
        const description = prompt('Describe your goal in more detail (optional):') || '';
        
        if (!title) return;
        
        const goal = {
            id: Date.now().toString(),
            title: title,
            description: description,
            progress: 0,
            createdAt: Date.now(),
            milestones: []
        };
        
        const goals = this.getUserGoals();
        goals.push(goal);
        localStorage.setItem('aigf-user-goals', JSON.stringify(goals));
        
        // Refresh goals modal
        this.closeGoalsModal();
        this.showGoalTracking();
        
        this.showToast(`🎯 Goal "${title}" added! Your companion will help you stay accountable.`);
        this.trackEvent('goal_created', { title: title });
    }

    updateGoalProgress(goalId) {
        const newProgress = parseInt(prompt('What percentage complete is this goal? (0-100)') || '0');
        
        if (isNaN(newProgress) || newProgress < 0 || newProgress > 100) return;
        
        const goals = this.getUserGoals();
        const goal = goals.find(g => g.id === goalId);
        
        if (!goal) return;
        
        const oldProgress = goal.progress;
        goal.progress = newProgress;
        goal.lastUpdated = Date.now();
        
        // Add milestone if significant progress made
        if (newProgress >= oldProgress + 25 || newProgress === 100) {
            goal.milestones.push({
                progress: newProgress,
                date: Date.now(),
                celebrated: false
            });
        }
        
        localStorage.setItem('aigf-user-goals', JSON.stringify(goals));
        
        // Refresh goals modal
        this.closeGoalsModal();
        this.showGoalTracking();
        
        // Show celebration if goal completed
        if (newProgress === 100) {
            this.showToast(`🎉 Congratulations! You completed "${goal.title}"! Your companion is so proud of you!`, 8000);
        } else if (newProgress >= oldProgress + 25) {
            this.showToast(`🌟 Great progress on "${goal.title}"! You're ${newProgress}% there!`);
        }
        
        this.trackEvent('goal_progress_updated', { goalId: goalId, progress: newProgress });
    }

    addGoalsStyles() {
        if (document.getElementById('goals-styles')) return;
        
        const goalsStyles = document.createElement('style');
        goalsStyles.id = 'goals-styles';
        goalsStyles.textContent = `
            .goals-container {
                max-width: 700px;
                margin: 0 auto;
            }
            
            .goals-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 32px;
                flex-wrap: wrap;
                gap: 16px;
            }
            
            .goals-header p {
                color: var(--text-light);
                margin: 0;
            }
            
            .goals-list {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .goal-item {
                background: var(--light-gray);
                padding: 24px;
                border-radius: var(--border-radius);
                border: 1px solid rgba(232, 180, 184, 0.2);
            }
            
            .goal-content h4 {
                margin: 0 0 8px 0;
                color: var(--deep-purple);
            }
            
            .goal-content p {
                margin: 0 0 16px 0;
                color: var(--text-light);
                font-size: 0.9rem;
            }
            
            .goal-progress {
                margin-bottom: 16px;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(232, 180, 184, 0.3);
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--gradient-primary);
                border-radius: 8px;
                transition: width 0.6s ease;
            }
            
            .progress-text {
                font-size: 0.9rem;
                color: var(--deep-purple);
                font-weight: 600;
            }
            
            .goal-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }
            
            .btn-small {
                padding: 8px 16px;
                background: var(--gradient-secondary);
                color: var(--white);
                border: none;
                border-radius: var(--border-radius-small);
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .btn-small:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-soft);
            }
            
            .btn-small.celebrate {
                background: var(--gradient-primary);
            }
            
            .no-goals {
                text-align: center;
                padding: 60px 20px;
                color: var(--text-light);
            }
            
            .no-goals h4 {
                color: var(--deep-purple);
                margin-bottom: 12px;
            }
        `;
        
        document.head.appendChild(goalsStyles);
    }

    getCurrentCompanion() {
        // Get the currently active companion from chat interface
        const chatModal = document.getElementById('chat-modal');
        if (!chatModal) return null;
        
        // For demo purposes, return first companion
        return this.companions[0];
    }

    closeMoodModal() {
        const modal = document.getElementById('mood-modal');
        if (modal) modal.remove();
    }

    closeGoalsModal() {
        const modal = document.getElementById('goals-modal');
        if (modal) modal.remove();
    }

    initializeMemorySystem() {
        // Initialize enhanced memory system
        this.memoryBank = JSON.parse(localStorage.getItem('aigf-memory-bank') || '{}');
        this.setupMemoryTracking();
    }

    setupMemoryTracking() {
        // Track important information automatically
        this.memoryCategories = {
            personal: ['birthday', 'age', 'location', 'job', 'family'],
            preferences: ['favorite', 'love', 'hate', 'like', 'dislike'],
            goals: ['want to', 'goal', 'dream', 'plan to', 'hope to'],
            relationships: ['friend', 'family', 'partner', 'relationship'],
            experiences: ['went to', 'did', 'tried', 'visited', 'happened']
        };
    }

    rememberDetail(companionId, detail, category = 'general') {
        if (!this.memoryBank[companionId]) {
            this.memoryBank[companionId] = {};
        }
        
        if (!this.memoryBank[companionId][category]) {
            this.memoryBank[companionId][category] = [];
        }
        
        this.memoryBank[companionId][category].push({
            detail: detail,
            timestamp: Date.now(),
            context: 'conversation'
        });
        
        localStorage.setItem('aigf-memory-bank', JSON.stringify(this.memoryBank));
    }

    recallMemories(companionId, category = null) {
        const companionMemories = this.memoryBank[companionId] || {};
        
        if (category) {
            return companionMemories[category] || [];
        }
        
        return companionMemories;
    }

    scheduleMoodCheckIn() {
        // Check if mood check-in already done today
        const lastCheckIn = localStorage.getItem('aigf-last-mood-checkin');
        const today = new Date().toDateString();
        
        if (lastCheckIn !== today) {
            // Schedule mood check-in after 30 seconds of activity
            setTimeout(() => {
                this.showMoodCheckIn();
                localStorage.setItem('aigf-last-mood-checkin', today);
            }, 30000);
        }
    }

    showLogin() {
        this.showModal('login-modal');
        this.trackEvent('login_modal_opened');
    }

    selectPlan(planName) {
        this.trackEvent('plan_selected', { plan: planName });
        this.showToast(`✨ Great choice! The ${planName} plan selected. Redirecting to signup...`);
        
        // In production, redirect to payment flow
        setTimeout(() => {
            this.showLogin();
        }, 1500);
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    toggleMobileMenu() {
        // Mobile menu functionality would go here
        this.showToast('📱 Mobile menu coming soon!');
    }

    startTestimonialCarousel() {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        
        if (testimonials.length <= 1) return;

        this.testimonialInterval = setInterval(() => {
            this.showTestimonial((this.testimonialIndex + 1) % testimonials.length);
        }, 6000);
    }

    showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        
        // Activate corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        this.testimonialIndex = index;
    }

    showToast(message, duration = 4000) {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: linear-gradient(135deg, var(--rose-gold), var(--soft-purple));
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            animation: slideInRight 0.4s ease-out;
            font-weight: 500;
            max-width: 350px;
            font-family: var(--font-body);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 400);
        }, duration);
    }

    trackEvent(eventName, properties = {}) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...properties,
                timestamp: Date.now()
            });
        }
        
        // Console log for development
        console.log(`💕 Event: ${eventName}`, properties);
        
        // Store events locally for debugging
        const events = JSON.parse(localStorage.getItem('aigf-events') || '[]');
        events.push({
            event: eventName,
            properties: properties,
            timestamp: Date.now(),
            url: window.location.href
        });
        
        // Keep only last 50 events
        if (events.length > 50) {
            events.splice(0, events.length - 50);
        }
        
        localStorage.setItem('aigf-events', JSON.stringify(events));
    }

    handleResize() {
        // Handle responsive changes if needed
        if (window.innerWidth > 768) {
            // Close mobile menu if open
            document.body.classList.remove('mobile-menu-open');
        }
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    }
}

// Global functions for HTML onclick handlers
window.startQuiz = () => app.startQuiz();
window.selectAnswer = (answer) => app.selectAnswer(answer);
window.browseAllCompanions = () => app.browseAllCompanions();
window.filterCompanions = () => app.filterCompanions();
window.showCompanionProfile = (id) => app.showCompanionProfile(id);
window.startConversation = (id) => app.startConversation(id);
window.sendMessage = (id) => app.sendMessage(id);
window.addReaction = (element, emoji) => app.addReaction(element, emoji);
window.showRelationshipDashboard = (id) => app.showRelationshipDashboard(id);
window.showVirtualDateMenu = (id) => app.showVirtualDateMenu(id);
window.showVirtualGifts = (id) => app.showVirtualGifts(id);
window.showCompanionCustomization = (id) => app.showCompanionCustomization(id);
window.switchCompanion = (id) => app.switchCompanion(id);
window.confirmSwitch = (oldId, newId) => app.confirmSwitch(oldId, newId);
window.sendGift = (id, gift, price) => app.sendGift(id, gift, price);
window.showMoodCheckIn = () => app.showMoodCheckIn();
window.selectMood = (mood) => app.selectMood(mood);
window.showGoalTracking = () => app.showGoalTracking();
window.addNewGoal = () => app.addNewGoal();
window.updateGoalProgress = (goalId) => app.updateGoalProgress(goalId);
window.saveCustomization = (id) => app.saveCustomization(id);
window.showLogin = () => app.showLogin();
window.selectPlan = (plan) => app.selectPlan(plan);
window.showTestimonial = (index) => app.showTestimonial(index);
window.closeModal = () => app.closeModal();
window.toggleMobileMenu = () => app.toggleMobileMenu();
window.toggleFloatingMenu = () => toggleFloatingMenu();
window.showMemoryBank = () => showMemoryBank();
window.showReferralProgram = () => showReferralProgram();

// Floating menu functionality
function toggleFloatingMenu() {
    const menu = document.getElementById('floating-menu');
    const options = document.getElementById('fab-options');
    const mainIcon = document.querySelector('.fab-icon');
    const closeIcon = document.querySelector('.fab-close');
    
    menu.classList.toggle('active');
    options.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
        mainIcon.style.display = 'none';
        closeIcon.style.display = 'inline';
    } else {
        mainIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
    }
}

function showMemoryBank() {
    app.showToast('🧠 Memory Bank feature coming soon! Your companions will remember every detail about you - birthdays, preferences, goals, and shared moments.');
    app.trackEvent('memory_bank_accessed');
    toggleFloatingMenu();
}

function showReferralProgram() {
    const modal = document.createElement('div');
    modal.id = 'referral-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎁 Invite Friends & Earn Rewards</h3>
                <span class="modal-close" onclick="closeReferralModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="referral-program">
                    <div class="referral-hero">
                        <h4>Share the Love, Get Rewarded!</h4>
                        <p>For every friend you refer, you both get amazing benefits:</p>
                    </div>
                    
                    <div class="referral-benefits">
                        <div class="benefit">
                            <div class="benefit-icon">👥</div>
                            <h5>You Get</h5>
                            <p>1 month FREE Premium when they subscribe</p>
                        </div>
                        <div class="benefit">
                            <div class="benefit-icon">💝</div>
                            <h5>They Get</h5>
                            <p>20% off their first month</p>
                        </div>
                    </div>
                    
                    <div class="referral-code">
                        <label>Your Referral Link:</label>
                        <div class="code-container">
                            <input type="text" value="https://aigfnetwork.com/ref/USER123" readonly id="referral-link">
                            <button onclick="copyReferralLink()">Copy</button>
                        </div>
                    </div>
                    
                    <div class="social-share">
                        <h5>Share on Social Media:</h5>
                        <div class="social-buttons">
                            <button onclick="shareToTwitter()" class="social-btn twitter">Twitter</button>
                            <button onclick="shareToFacebook()" class="social-btn facebook">Facebook</button>
                            <button onclick="shareToWhatsApp()" class="social-btn whatsapp">WhatsApp</button>
                        </div>
                    </div>
                    
                    <div class="referral-stats">
                        <h5>Your Referral Stats:</h5>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-number">3</div>
                                <div class="stat-label">Friends Referred</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">2</div>
                                <div class="stat-label">Free Months Earned</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
    addReferralStyles();
    toggleFloatingMenu();
    
    app.trackEvent('referral_program_opened');
}

function addReferralStyles() {
    if (document.getElementById('referral-styles')) return;
    
    const referralStyles = document.createElement('style');
    referralStyles.id = 'referral-styles';
    referralStyles.textContent = `
        .referral-program {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
        }
        
        .referral-hero {
            margin-bottom: 32px;
        }
        
        .referral-hero h4 {
            color: var(--deep-purple);
            margin-bottom: 12px;
        }
        
        .referral-benefits {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 32px;
        }
        
        .benefit {
            padding: 20px;
            background: var(--light-gray);
            border-radius: var(--border-radius);
        }
        
        .benefit-icon {
            font-size: 2rem;
            margin-bottom: 12px;
        }
        
        .benefit h5 {
            color: var(--deep-purple);
            margin-bottom: 8px;
        }
        
        .benefit p {
            color: var(--text-light);
            margin: 0;
            font-size: 0.9rem;
        }
        
        .referral-code {
            margin-bottom: 32px;
            text-align: left;
        }
        
        .referral-code label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--deep-purple);
        }
        
        .code-container {
            display: flex;
            gap: 8px;
        }
        
        .code-container input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid rgba(232, 180, 184, 0.3);
            border-radius: var(--border-radius-small);
            background: var(--white);
            color: var(--charcoal);
            font-family: monospace;
            font-size: 0.9rem;
        }
        
        .code-container button {
            padding: 12px 20px;
            background: var(--gradient-primary);
            color: var(--white);
            border: none;
            border-radius: var(--border-radius-small);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .code-container button:hover {
            transform: translateY(-2px);
        }
        
        .social-share {
            margin-bottom: 32px;
        }
        
        .social-share h5 {
            color: var(--deep-purple);
            margin-bottom: 16px;
        }
        
        .social-buttons {
            display: flex;
            gap: 12px;
            justify-content: center;
        }
        
        .social-btn {
            padding: 10px 16px;
            border: none;
            border-radius: var(--border-radius-small);
            color: var(--white);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .social-btn.twitter { background: #1DA1F2; }
        .social-btn.facebook { background: #4267B2; }
        .social-btn.whatsapp { background: #25D366; }
        
        .social-btn:hover {
            transform: translateY(-2px);
            opacity: 0.9;
        }
        
        .referral-stats {
            background: var(--light-gray);
            padding: 24px;
            border-radius: var(--border-radius);
        }
        
        .referral-stats h5 {
            color: var(--deep-purple);
            margin-bottom: 16px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-family: var(--font-heading);
            font-size: 2rem;
            font-weight: 700;
            color: var(--rose-gold);
            display: block;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--text-light);
        }
    `;
    
    document.head.appendChild(referralStyles);
}

function closeReferralModal() {
    const modal = document.getElementById('referral-modal');
    if (modal) modal.remove();
}

function copyReferralLink() {
    const linkInput = document.getElementById('referral-link');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(linkInput.value);
    
    app.showToast('🎉 Referral link copied! Share it with friends to earn rewards.');
    app.trackEvent('referral_link_copied');
}

function shareToTwitter() {
    const text = "I'm loving AI Girlfriend Network - the most sophisticated AI companions for emotional support and meaningful connections! Join me: ";
    const url = "https://aigfnetwork.com/ref/USER123";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    app.trackEvent('social_share', { platform: 'twitter' });
}

function shareToFacebook() {
    const url = "https://aigfnetwork.com/ref/USER123";
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    app.trackEvent('social_share', { platform: 'facebook' });
}

function shareToWhatsApp() {
    const text = "Check out AI Girlfriend Network - amazing AI companions for real connection and support! ";
    const url = "https://aigfnetwork.com/ref/USER123";
    window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`);
    app.trackEvent('social_share', { platform: 'whatsapp' });
}

// Initialize the application
const app = new AIGFNetwork();

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .toast {
        font-family: var(--font-body);
    }
`;
document.head.appendChild(style);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}