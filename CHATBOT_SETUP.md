# Chatbot Setup Guide



### 🤖 Professional Chatbot with OpenAI API
- Integrates with OpenAI GPT-3.5-turbo
- Searches product database intelligently
- Provides expert-level fitness and nutrition advice
- Professional responses in English
- Beautiful and responsive user interface

## الملفات المضافة:

### Backend:
- `server/routes/chatbot.js` - API routes للـ chatbot
- `server/index.js` - تم تحديثه لإضافة chatbot routes

### Frontend:
- `client/src/components/Chatbot.tsx` - مكون الـ chatbot الرئيسي
- `client/src/components/ChatbotButton.tsx` - زر فتح الـ chatbot
- `client/src/App.tsx` - تم تحديثه لإضافة ChatbotButton

## خطوات الإعداد:

### 1. إعداد OpenAI API Key:
```bash
# في مجلد server، أنشئ ملف .env
MONGODB_URI=mongodb://localhost:27017/shop-protein
PORT=5000
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

### 2. الحصول على OpenAI API Key:
1. اذهب إلى https://platform.openai.com/
2. سجل حساب جديد أو سجل دخول
3. اذهب إلى API Keys
4. أنشئ API Key جديد
5. انسخ الـ key وأضفه إلى ملف .env

### 3. تشغيل المشروع:
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

## كيفية الاستخدام:

### للمستخدم:
1. اضغط على زر الـ chatbot (أيقونة الرسائل) في أسفل يمين الصفحة
2. اكتب سؤالك عن المنتجات
3. ستحصل على إجابة ذكية مع اقتراحات للمنتجات
4. اضغط على أي منتج للانتقال إلى صفحته

### Example Questions:
- "What are the best protein types for muscle building?"
- "I need protein for weight loss"
- "What is creatine and how does it work?"
- "I want vegan supplements"
- "What are the protein prices?"
- "How much protein should I take daily?"
- "What supplements help with recovery?"

## الميزات التقنية:

### Backend:
- **OpenAI Integration**: يستخدم GPT-3.5-turbo للإجابات الذكية
- **Database Search**: يبحث في قاعدة البيانات عن المنتجات
- **Context Awareness**: يحتفظ بتاريخ المحادثة للسياق
- **Product Recommendations**: يقدم اقتراحات ذكية للمنتجات
- **Error Handling**: معالجة شاملة للأخطاء

### Frontend:
- **Real-time Chat**: محادثة فورية مع مؤشرات التحميل
- **Product Cards**: عرض المنتجات المقترحة مع الصور والأسعار
- **Responsive Design**: تصميم متجاوب لجميع الأجهزة
- **Arabic Support**: دعم كامل للغة العربية
- **Keyboard Navigation**: دعم Enter لإرسال الرسائل
- **Auto-scroll**: تمرير تلقائي للرسائل الجديدة

## الأمان:
- API Key محمي في ملف .env
- معالجة الأخطاء لمنع تسريب المعلومات
- تحقق من صحة المدخلات
- حماية من XSS و CSRF

## التطوير المستقبلي:
- حفظ تاريخ المحادثات في قاعدة البيانات
- إضافة ميزة البحث المتقدم
- دعم الملفات الصوتية
- إضافة ميزة الترجمة التلقائية
- تحليل مشاعر المستخدم
- إحصائيات الاستخدام

## استكشاف الأخطاء:

### إذا لم يعمل الـ chatbot:
1. تأكد من إضافة OpenAI API Key في ملف .env
2. تأكد من تشغيل الخادم على المنفذ 5000
3. تحقق من اتصال الإنترنت
4. راجع console المتصفح للأخطاء
5. راجع logs الخادم للأخطاء

### إذا لم تظهر المنتجات:
1. تأكد من تشغيل قاعدة البيانات
2. تأكد من وجود منتجات في قاعدة البيانات
3. تحقق من صحة مسارات الصور

## الدعم:
إذا واجهت أي مشاكل، يرجى:
1. مراجعة هذا الدليل
2. التحقق من الأخطاء في console
3. التأكد من إعدادات البيئة
4. التواصل للحصول على المساعدة
