# 🔧 تشخيص وحل المشاكل

## 🚨 المشاكل الشائعة وحلولها

### 1. صفحات المنتجات فارغة

**الأعراض:**
- لا تظهر المنتجات في الصفحة الرئيسية
- صفحات الفئات فارغة
- رسالة "No products found"

**الحلول:**

#### أ) تحقق من الخادم
```bash
# تأكد من تشغيل الخادم
cd server && npm start

# تحقق من حالة الخادم
curl http://localhost:5000/api/health
```

#### ب) تحقق من قاعدة البيانات
```bash
# أعد تحميل البيانات
curl -X POST http://localhost:5000/api/seed

# تحقق من المنتجات
curl http://localhost:5000/api/products
```

#### ج) تحقق من console المتصفح
1. افتح Developer Tools (F12)
2. انتقل إلى Console
3. ابحث عن أخطاء في الشبكة أو JavaScript

### 2. الصور لا تظهر

**الأعراض:**
- مربعات فارغة بدلاً من صور المنتجات
- رسائل خطأ في console

**الحلول:**

#### أ) تحقق من مجلد الصور
```bash
# تأكد من وجود الصور
ls server/public/assets/

# يجب أن تجد:
# protein-clear.jpg
# creatine-impact.jpg
# vegan-protein.jpg
# وغيرها...
```

#### ب) اختبر الصور مباشرة
```bash
# اختبر صورة واحدة
curl http://localhost:5000/assets/protein-clear.jpg -I

# يجب أن تحصل على:
# HTTP/1.1 200 OK
# Content-Type: image/jpeg
```

#### ج) تحقق من إعدادات الخادم
```javascript
// في server/index.js
app.use('/assets', express.static('public/assets'));
```

### 3. الشات بوت لا يعمل

**الأعراض:**
- زر الشات بوت لا يفتح
- رسائل خطأ عند إرسال رسالة

**الحلول:**

#### أ) تحقق من ملف .env
```bash
# في مجلد server
cat .env

# يجب أن يحتوي على:
MONGODB_URI=mongodb://localhost:27017/shop-protein
PORT=5000
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

#### ب) اختبر API الشات بوت
```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

### 4. لا يمكن تسجيل الدخول

**الأعراض:**
- رسالة "Invalid credentials"
- لا يتم حفظ الجلسة

**الحلول:**

#### أ) أنشئ حساب جديد
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "email":"test@example.com",
    "password":"password123",
    "phone":"123456789"
  }'
```

#### ب) استخدم الحساب التجريبي
- Email: kamal@example.com
- Password: password123

### 5. الواجهة الأمامية لا تعمل

**الأعراض:**
- لا يمكن الوصول إلى http://localhost:8080
- رسائل خطأ في terminal

**الحلول:**

#### أ) تحقق من المنافذ
```bash
# تحقق من المنافذ المستخدمة
lsof -ti:8080
lsof -ti:5000

# إذا كان المنفذ مشغول، أوقف العملية
kill -9 <PID>
```

#### ب) أعد تشغيل الواجهة الأمامية
```bash
cd client && npm run dev
```

### 6. MongoDB لا يعمل

**الأعراض:**
- رسائل خطأ في الخادم
- "MongoDB connection failed"

**الحلول:**

#### أ) تشغيل MongoDB محلياً
```bash
# macOS
brew services start mongodb/brew/mongodb-community

# أو تشغيل مباشر
mongod
```

#### ب) استخدام MongoDB Atlas
```bash
# في server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shop-protein
```

## 🔍 خطوات التشخيص السريع

### 1. فحص شامل للنظام
```bash
# 1. تحقق من الخادم
curl http://localhost:5000/api/health

# 2. تحقق من المنتجات
curl http://localhost:5000/api/products

# 3. تحقق من الواجهة الأمامية
curl http://localhost:8080

# 4. تحقق من الصور
curl http://localhost:5000/assets/protein-clear.jpg -I
```

### 2. فحص Logs
```bash
# في terminal الخادم
cd server && npm start

# في terminal الواجهة الأمامية
cd client && npm run dev

# راقب الرسائل في كلا Terminal
```

### 3. فحص Console المتصفح
1. اضغط F12
2. انتقل إلى Console
3. ابحث عن:
   - أخطاء JavaScript
   - أخطاء في الشبكة (Network)
   - رسائل تحذير

## 🛠️ أوامر مفيدة

### إعادة تشغيل كامل
```bash
# 1. أوقف جميع العمليات
pkill -f "node"
pkill -f "vite"

# 2. أعد تشغيل MongoDB
brew services restart mongodb/brew/mongodb-community

# 3. أعد تحميل البيانات
curl -X POST http://localhost:5000/api/seed

# 4. شغل الخادم
cd server && npm start

# 5. شغل الواجهة الأمامية (في terminal جديد)
cd client && npm run dev
```

### تنظيف وإعادة تثبيت
```bash
# 1. احذف node_modules
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules

# 2. أعد تثبيت التبعيات
npm install
cd client && npm install
cd ../server && npm install

# 3. أعد تشغيل المشروع
```

## 📞 الحصول على المساعدة

إذا لم تحل المشكلة:

1. **تحقق من Logs**: انسخ رسائل الخطأ كاملة
2. **وصف المشكلة**: اشرح ما يحدث بالضبط
3. **خطوات التكرار**: كيف يمكن إعادة المشكلة
4. **معلومات النظام**: نظام التشغيل، إصدار Node.js

### معلومات مفيدة للمساعدة
```bash
# إصدار Node.js
node --version

# إصدار npm
npm --version

# حالة MongoDB
brew services list | grep mongodb

# المنافذ المستخدمة
lsof -i :5000
lsof -i :8080
```

---

**💡 نصيحة**: دائماً ابدأ بفحص الخادم وقاعدة البيانات أولاً، ثم انتقل إلى الواجهة الأمامية.

