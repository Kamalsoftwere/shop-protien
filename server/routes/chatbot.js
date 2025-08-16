import express from 'express';
import OpenAI from 'openai';
import Product from '../models/Product.js';

const router = express.Router();

// Initialize OpenAI (only if API key is available)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Motivational messages
const motivationalMessages = [
  "🔥 You're absolutely crushing it! Keep that energy up!",
  "💪 Every rep counts towards your goals! You've got this!",
  "⭐ Consistency is your superpower! You're building something amazing!",
  "🚀 Your future self will thank you for every workout!",
  "💎 You're stronger than you think! Keep pushing forward!",
  "🎯 Small progress is still progress! You're doing great!",
  "🔥 Your dedication is inspiring! Keep up the amazing work!",
  "💪 You're not just working out, you're building a better you!",
  "⭐ Every protein shake is a step towards your goals!",
  "🚀 You're on fire! Keep that momentum going!"
];

// Body fat calculation function
const calculateBodyFat = (gender, age, weight, height, waist, neck, hip = null) => {
  let bodyFatPercentage = 0;
  
  if (gender.toLowerCase() === 'male') {
    // US Navy method for men
    bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    // US Navy method for women
    bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  
  return Math.max(0, Math.min(100, bodyFatPercentage));
};

// BMI calculation function
const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

// Enhanced chatbot logic
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Search products in database
    const products = await Product.find({}).limit(10);

    // Simple chatbot logic without OpenAI for testing
    const userMessage = message.toLowerCase();
    let botResponse = '';
    let recommendedProducts = [];

    // Add motivational prefix randomly
    const motivationalPrefix = Math.random() < 0.4 ? 
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)] + '\n\n' : '';

    // Body fat calculation
    if (userMessage.includes('دهون') || userMessage.includes('body fat') || userMessage.includes('bodyfat') || userMessage.includes('calculate body fat')) {
      botResponse = `${motivationalPrefix}📊 **BODY FAT CALCULATOR & ANALYSIS!** Let's get scientific about your fitness journey!

**How to Calculate Body Fat Percentage:**

**For Men (US Navy Method):**
• Measure your waist at the narrowest point
• Measure your neck at the narrowest point
• Formula: Body Fat % = 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450

**For Women (US Navy Method):**
• Measure your waist at the narrowest point
• Measure your hips at the widest point
• Measure your neck at the narrowest point
• Formula: Body Fat % = 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450

**Body Fat Categories:**
• **Essential Fat:** Men 2-5%, Women 10-13%
• **Athletes:** Men 6-13%, Women 14-20%
• **Fitness:** Men 14-17%, Women 21-24%
• **Average:** Men 18-24%, Women 25-31%
• **Obese:** Men 25%+, Women 32%+

**Pro Tips:**
• Measure in the morning on an empty stomach
• Use a flexible tape measure
• Don't pull too tight
• Track changes over time, not daily

**Supplements to Support Fat Loss:**
• Protein powder for muscle preservation
• Creatine for strength during cutting
• BCAAs for recovery

Would you like me to help you calculate your specific body fat percentage? Just provide your measurements! 💪📊`;

    // BMI calculation
    } else if (userMessage.includes('bmi') || userMessage.includes('مؤشر كتلة الجسم') || userMessage.includes('body mass index')) {
      botResponse = `${motivationalPrefix}⚖️ **BMI CALCULATOR & ANALYSIS!** Let's understand your body composition!

**BMI Formula:**
BMI = Weight (kg) / Height (m)²

**BMI Categories:**
• **Underweight:** < 18.5
• **Normal Weight:** 18.5 - 24.9
• **Overweight:** 25.0 - 29.9
• **Obese Class I:** 30.0 - 34.9
• **Obese Class II:** 35.0 - 39.9
• **Obese Class III:** ≥ 40.0

**Important Notes:**
• BMI doesn't distinguish between muscle and fat
• Athletes may have high BMI due to muscle mass
• Better to combine with body fat percentage
• Focus on body composition, not just weight

**Healthy BMI Range:** 18.5 - 24.9

**Supplements for Healthy Weight Management:**
• Protein for muscle maintenance
• Multivitamins for overall health
• Omega-3 for heart health

Would you like me to calculate your BMI? Just provide your weight and height! 💪⚖️`;

    // Personalized advice
    } else if (userMessage.includes('نصيحة') || userMessage.includes('advice') || userMessage.includes('help me') || userMessage.includes('what should i do')) {
      const randomProducts = products.slice(0, 3);
      recommendedProducts = randomProducts;

      botResponse = `${motivationalPrefix}🎯 **PERSONALIZED FITNESS ADVICE!** Let me be your AI fitness coach!

**My Comprehensive Recommendations:**

**1. Nutrition Strategy:**
• **Protein:** 1.6-2.2g per kg body weight for muscle building
• **Carbs:** 3-7g per kg body weight depending on activity level
• **Fats:** 0.8-1.2g per kg body weight
• **Hydration:** 3-4 liters of water daily

**2. Training Approach:**
• **Strength Training:** 3-4 times per week
• **Cardio:** 2-3 times per week (HIIT or steady state)
• **Recovery:** 1-2 rest days per week
• **Progressive Overload:** Increase weight/reps gradually

**3. Lifestyle Factors:**
• **Sleep:** 7-9 hours per night
• **Stress Management:** Meditation, yoga, or deep breathing
• **Consistency:** Better to train 30 minutes daily than 3 hours once a week

**4. Supplement Stack:**
• **Protein Powder:** Post-workout and between meals
• **Creatine:** 5g daily for strength and power
• **Multivitamin:** Daily for overall health
• **Omega-3:** For recovery and heart health

**5. Progress Tracking:**
• Take progress photos monthly
• Track measurements weekly
• Monitor strength gains
• Keep a food and training journal

**Remember:** Everyone's journey is unique! Start where you are, use what you have, do what you can! 💪🎯

Here are some products to support your journey:`;

    // Workout plans
    } else if (userMessage.includes('workout') || userMessage.includes('تمرين') || userMessage.includes('program') || userMessage.includes('routine')) {
      const proteinProducts = products.filter(p => p.category === 'protein');
      const creatineProducts = products.filter(p => p.category === 'creatine');
      recommendedProducts = [...proteinProducts.slice(0, 2), ...creatineProducts.slice(0, 1)];

      botResponse = `${motivationalPrefix}🏋️ **CUSTOM WORKOUT PROGRAMS!** Let's build your perfect routine!

**Beginner Program (3-6 months experience):**
**Day 1: Push (Chest, Shoulders, Triceps)**
• Bench Press: 3x8-12
• Overhead Press: 3x8-12
• Incline Dumbbell Press: 3x10-15
• Lateral Raises: 3x12-15
• Tricep Dips: 3x10-15

**Day 2: Pull (Back, Biceps)**
• Deadlifts: 3x6-10
• Pull-ups: 3x6-12
• Barbell Rows: 3x8-12
• Bicep Curls: 3x10-15
• Face Pulls: 3x12-15

**Day 3: Legs**
• Squats: 3x8-12
• Romanian Deadlifts: 3x8-12
• Leg Press: 3x10-15
• Calf Raises: 3x15-20
• Planks: 3x30-60 seconds

**Intermediate Program (6+ months experience):**
**Day 1: Chest & Triceps**
**Day 2: Back & Biceps**
**Day 3: Shoulders & Abs**
**Day 4: Legs**
**Day 5: Arms & Cardio**

**Advanced Program (1+ years experience):**
**Push/Pull/Legs split with specialization days**

**Pro Tips:**
• Rest 2-3 minutes between compound movements
• Rest 1-2 minutes between isolation exercises
• Progressive overload every 2-4 weeks
• Listen to your body and adjust accordingly

**Pre-Workout Nutrition:**
• Protein + carbs 2-3 hours before
• Creatine 30 minutes before
• Hydrate well throughout the day

**Post-Workout Nutrition:**
• Protein shake within 30 minutes
• Carbs to replenish glycogen
• Electrolytes for hydration

Here are some supplements to fuel your workouts:`;

    // Nutrition advice
    } else if (userMessage.includes('nutrition') || userMessage.includes('تغذية') || userMessage.includes('diet') || userMessage.includes('meal plan')) {
      const proteinProducts = products.filter(p => p.category === 'protein');
      recommendedProducts = proteinProducts.slice(0, 2);

      botResponse = `${motivationalPrefix}🥗 **COMPREHENSIVE NUTRITION GUIDE!** Fuel your body like a champion!

**Macro Breakdown by Goal:**

**Muscle Building:**
• Protein: 2.2-2.4g per kg body weight
• Carbs: 4-7g per kg body weight
• Fats: 0.8-1.2g per kg body weight
• Calories: 300-500 above maintenance

**Fat Loss:**
• Protein: 2.2-2.4g per kg body weight
• Carbs: 2-4g per kg body weight
• Fats: 0.8-1.2g per kg body weight
• Calories: 300-500 below maintenance

**Maintenance:**
• Protein: 1.6-2.2g per kg body weight
• Carbs: 3-5g per kg body weight
• Fats: 0.8-1.2g per kg body weight
• Calories: At maintenance level

**Sample Meal Plan (Muscle Building):**

**Breakfast (7 AM):**
• 3 whole eggs + 3 egg whites
• 1 cup oatmeal with berries
• 1 scoop protein powder
• 1 tbsp almond butter

**Snack (10 AM):**
• Greek yogurt with nuts
• 1 piece of fruit

**Lunch (1 PM):**
• 150g chicken breast
• 1 cup brown rice
• 2 cups mixed vegetables
• 1 tbsp olive oil

**Pre-Workout (4 PM):**
• 1 scoop protein powder
• 1 banana
• 1 tbsp honey

**Post-Workout (6 PM):**
• 2 scoops protein powder
• 1 cup white rice
• 1 tbsp honey

**Dinner (8 PM):**
• 150g salmon
• 1 cup quinoa
• 2 cups broccoli
• 1 tbsp olive oil

**Before Bed (10 PM):**
• 1 scoop casein protein
• 1 tbsp peanut butter

**Hydration Guidelines:**
• 3-4 liters of water daily
• Add electrolytes during workouts
• Monitor urine color (light yellow = well hydrated)

**Supplement Timing:**
• **Protein:** Post-workout, between meals, before bed
• **Creatine:** Any time, 5g daily
• **BCAAs:** During workout or fasted training
• **Multivitamin:** With breakfast

Here are some protein products to support your nutrition:`;

    // Protein recommendations
    } else if (userMessage.includes('protein') || userMessage.includes('بروتين')) {
      const proteinProducts = products.filter(p => p.category === 'protein');
      recommendedProducts = proteinProducts.slice(0, 3);

      botResponse = `${motivationalPrefix}💪 **PROTEIN POWER!** Let's fuel those gains! 

Here are some AMAZING protein options that will help you crush your fitness goals:

${recommendedProducts.map(p => `🔥 **${p.name}** - ${p.price}₪ [Product ID: ${p._id}]`).join('\n')}

**Pro Tips:**
• Take 1-2 scoops daily for optimal results
• Best time: Within 30 minutes after your workout
• Mix with water or milk for delicious shakes
• Perfect for muscle building and recovery

**Protein Timing Strategy:**
• **Morning:** 1 scoop with breakfast
• **Pre-workout:** 1 scoop 30 minutes before
• **Post-workout:** 2 scoops within 30 minutes
• **Before bed:** 1 scoop casein protein

**Daily Protein Needs:**
• **Sedentary:** 0.8g per kg body weight
• **Active:** 1.2-1.6g per kg body weight
• **Athletes:** 1.6-2.2g per kg body weight
• **Bodybuilders:** 2.2-2.4g per kg body weight

**Protein Quality Sources:**
• Whey protein (fast absorption)
• Casein protein (slow absorption)
• Plant-based proteins (vegan options)
• Real food sources (chicken, fish, eggs)

You're making incredible progress! Keep fueling your body with the best! 💪🔥`;

    // Creatine recommendations
    } else if (userMessage.includes('creatine') || userMessage.includes('كرياتين')) {
      const creatineProducts = products.filter(p => p.category === 'creatine');
      recommendedProducts = creatineProducts.slice(0, 2);

      botResponse = `${motivationalPrefix}⚡ **CREATINE CRUSH!** Time to unlock your strength potential!

Here are our TOP creatine products that will take your performance to the next level:

${recommendedProducts.map(p => `⚡ **${p.name}** - ${p.price}₪ [Product ID: ${p._id}]`).join('\n')}

**Why Creatine is AMAZING:**
• Increases ATP production for explosive power
• Boosts strength and muscle gains
• Faster recovery between sets
• Scientifically proven results

**Dosage Protocol:**
• **Loading Phase (Optional):** 20g daily for 5-7 days
• **Maintenance:** 5g daily with any meal
• **Timing:** Any time of day works great!
• **Hydration:** Drink extra water when taking creatine

**Benefits You'll Experience:**
• 5-15% increase in strength
• Better performance in high-intensity exercise
• Faster muscle recovery
• Improved brain function
• Enhanced muscle fullness

**Best Practices:**
• Take consistently every day
• Mix with any beverage
• No cycling required
• Safe for long-term use

You're about to experience some serious gains! Let's get stronger together! 💪⚡`;

    // Vegan options
    } else if (userMessage.includes('vegan') || userMessage.includes('نباتي')) {
      const veganProducts = products.filter(p => p.category === 'vegan');
      recommendedProducts = veganProducts.slice(0, 2);

      botResponse = `${motivationalPrefix}🌱 **VEGAN VICTORY!** Plant power is real power!

Here are some INCREDIBLE plant-based supplements for your fitness journey:

${recommendedProducts.map(p => `🌱 **${p.name}** - ${p.price}₪ [Product ID: ${p._id}]`).join('\n')}

**Why Plant-Based is POWERFUL:**
• Complete protein profiles from plants
• Better for the environment
• Easier on digestion
• All the gains, none of the guilt

**Vegan Protein Sources:**
• **Pea Protein:** High in BCAAs, easy to digest
• **Rice Protein:** Hypoallergenic, complete amino acid profile
• **Hemp Protein:** Rich in omega-3s and fiber
• **Soy Protein:** Complete protein, rich in isoflavones

**Vegan Nutrition Tips:**
• Combine different protein sources for complete amino acids
• Include B12 supplementation
• Focus on iron-rich foods with vitamin C
• Consider omega-3 supplementation (algae-based)

**Vegan Meal Ideas:**
• Quinoa bowls with legumes
• Smoothies with plant protein
• Tofu stir-fries
• Lentil soups and stews

You're making a difference with every choice! Keep rocking that plant power! 🌱💪`;

    // Price inquiries
    } else if (userMessage.includes('price') || userMessage.includes('سعر') || userMessage.includes('cost')) {
      const sampleProducts = products.slice(0, 3);
      recommendedProducts = sampleProducts;

      botResponse = `${motivationalPrefix}💰 **INVESTMENT IN YOURSELF!** Here are some amazing deals:

${sampleProducts.map(p => `💎 **${p.name}** - ${p.price}₪ [Product ID: ${p._id}]`).join('\n')}

**Remember:** You're not spending money, you're investing in your health and future! 

**Value for Money:**
• Premium quality ingredients
• Third-party tested for purity
• Optimal dosages for results
• Long-term health benefits

**Cost Breakdown:**
• Protein: ~$2-3 per serving
• Creatine: ~$0.50 per serving
• Multivitamins: ~$0.30 per day
• Total daily investment: ~$3-5

**ROI on Your Investment:**
• Better health and longevity
• Improved performance and strength
• Faster recovery and results
• Prevention of deficiencies

Every product is an investment in the best version of yourself! 💪💰`;

    // Greetings
    } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('مرحبا')) {
      botResponse = `🔥 **HEY FITNESS WARRIOR!** Welcome to your AI fitness coach! 

I'm here to help you CRUSH your fitness goals! Here's what I can do for you:

💪 **Protein recommendations** for muscle building
⚡ **Creatine supplements** for strength gains  
🌱 **Vegan and plant-based** options
📊 **Body fat calculation** and analysis
⚖️ **BMI calculation** and interpretation
🎯 **Personalized workout programs**
🥗 **Nutrition and meal planning**
💰 **Product pricing** and value analysis
🏋️ **Training advice** and form tips
📈 **Progress tracking** strategies

**Just ask me anything about:**
• How to calculate body fat percentage
• Best workout routines for your goals
• Nutrition plans for muscle building/fat loss
• Supplement timing and dosages
• Training techniques and form
• Progress tracking methods

What would you like to know about today? Let's make some gains! 💪🔥`;

    // Motivation requests
    } else if (userMessage.includes('motivation') || userMessage.includes('تحفيز') || userMessage.includes('workout')) {
      const randomProducts = products.slice(0, 2);
      recommendedProducts = randomProducts;

      botResponse = `🔥 **MOTIVATION MODE ACTIVATED!** 

${motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}

**Remember:** Every workout is a victory! Every protein shake is progress! Every step forward is success!

**Today's Challenge:** Push yourself 10% harder than yesterday! You've got this! 💪🔥

**Motivational Facts:**
• Your body can adapt to any challenge you give it
• Consistency beats perfection every time
• The only bad workout is the one that didn't happen
• You're stronger than you think

Here are some products to fuel your next workout:

${randomProducts.map(p => `💪 **${p.name}** - ${p.price}₪ [Product ID: ${p._id}]`).join('\n')}

**Action Steps:**
1. Set a specific goal for today's workout
2. Focus on form over weight
3. Push through the last 2 reps
4. Celebrate every small victory

You're building something amazing! Keep going! 💪🔥`;

    // General fitness questions
    } else {
      const randomProducts = products.slice(0, 2);
      recommendedProducts = randomProducts;

      botResponse = `${motivationalPrefix}🎯 **FITNESS JOURNEY!** Let's get you on the right track!

Here are some AMAZING products to help you reach your goals:

${randomProducts.map(p => `💪 **${p.name}** - ${p.price}₪ [Product ID: ${p._id}]`).join('\n')}

**I can help you with:**
• **Body fat calculation** and analysis 📊
• **BMI calculation** and interpretation ⚖️
• **Personalized workout programs** 🏋️
• **Nutrition and meal planning** 🥗
• **Protein recommendations** for muscle building 💪
• **Creatine supplements** for strength gains ⚡
• **Vegan options** 🌱
• **Training advice** and form tips 🎯
• **Progress tracking** strategies 📈

**Just ask me:**
• "How do I calculate my body fat percentage?"
• "What's the best workout routine for beginners?"
• "Can you create a meal plan for muscle building?"
• "What supplements should I take?"
• "How do I track my progress?"

I'm here to help you become the best version of yourself! Let's do this! 💪🔥`;
    }

    // Get product details for the mentioned products
    const mentionedProducts = await Product.find({
      _id: { $in: recommendedProducts.map(p => p._id) }
    }).select('name category price image _id');

    res.json({
      response: botResponse,
      products: mentionedProducts,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      error: 'Oops! Something went wrong, but don\'t worry - we\'ll get back on track! 💪',
      details: error.message
    });
  }
});

// Get chat history (optional)
router.get('/history', async (req, res) => {
  try {
    // In a real app, you'd store chat history in database
    // For now, we'll return empty array
    res.json({ history: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get chat history' });
  }
});

export default router;
