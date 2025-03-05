# استشر - منصة الاستشارات الرقمية

<div dir="rtl">

## نبذة عن المشروع

**استشر** هي منصة رقمية تهدف إلى ربط الأفراد بمستشارين متخصصين في مجالات متنوعة مثل الصحة النفسية، التطوير المهني، الاستشارات المالية، العلاقات الأسرية وغيرها. توفر المنصة بيئة آمنة وسهلة الاستخدام للحصول على الاستشارات عبر الإنترنت.

### المميزات الرئيسية

- **تنوع المستشارين**: مستشارون متخصصون في مجالات متعددة
- **جلسات مرنة**: خيارات للجلسات عبر الفيديو، الصوت، أو الرسائل النصية
- **خصوصية عالية**: إمكانية الجلسات المجهولة وتشفير البيانات
- **لوحات تحكم مخصصة**: واجهات مختلفة للمستخدمين، المستشارين، والمشرفين
- **مجتمع تفاعلي**: منتدى للنقاشات وتبادل الخبرات

## التقنيات المستخدمة

- **الواجهة الأمامية**: Next.js, React, TypeScript, Tailwind CSS
- **إدارة الحالة**: React Context API
- **التخزين المؤقت**: Local Storage (للنسخة التجريبية)

## البدء باستخدام المشروع

### المتطلبات الأساسية

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

### تثبيت المشروع

```bash
# استنساخ المشروع
git clone https://github.com/alanqoudif/istshr.git
cd istshr

# تثبيت الاعتماديات
npm install
# أو
yarn install

# تشغيل خادم التطوير
npm run dev
# أو
yarn dev
```

بعد ذلك، افتح [http://localhost:3000](http://localhost:3000) في متصفحك لمشاهدة التطبيق.

### بناء المشروع للإنتاج

```bash
npm run build
# أو
yarn build
```

## هيكل المشروع

```
src/
├── app/                    # صفحات التطبيق (Next.js App Router)
├── components/             # مكونات قابلة لإعادة الاستخدام
├── lib/                    # مكتبات وخدمات
└── types/                  # تعريفات TypeScript
```

## المساهمة في المشروع

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. انسخ المشروع (Fork)
2. أنشئ فرعًا جديدًا (`git checkout -b feature/amazing-feature`)
3. قم بإجراء تغييراتك وحفظها (`git commit -m 'Add some amazing feature'`)
4. ارفع التغييرات إلى الفرع الخاص بك (`git push origin feature/amazing-feature`)
5. افتح طلب دمج (Pull Request)

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الاتصال

- **البريد الإلكتروني**: support@istashr.com
- **تويتر**: [@istashr](https://twitter.com/istashr)

</div>

---

# Istashr - Digital Counselling Platform

## About The Project

**Istashr** is a digital platform that aims to connect individuals with specialized counsellors in various fields such as mental health, career development, financial advice, family relationships, and more. The platform provides a safe and user-friendly environment for online consultations.

### Key Features

- **Diverse Counsellors**: Specialized counsellors in multiple fields
- **Flexible Sessions**: Options for video, audio, or text-based sessions
- **High Privacy**: Anonymous sessions and data encryption
- **Custom Dashboards**: Different interfaces for users, counsellors, and administrators
- **Interactive Community**: Forum for discussions and sharing experiences

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Storage**: Local Storage (for beta version)

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alanqoudif/istshr.git
cd istshr

# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── app/                    # Application pages (Next.js App Router)
├── components/             # Reusable components
├── lib/                    # Libraries and services
└── types/                  # TypeScript definitions
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: support@istashr.com
- **Twitter**: [@istashr](https://twitter.com/istashr)
