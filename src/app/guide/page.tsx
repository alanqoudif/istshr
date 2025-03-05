'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaArrowLeft, FaSearch, FaCalendarAlt, FaComments, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function UserGuidePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                استشر
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                لوحة التحكم
              </Link>
              <Link
                href="/counsellors"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                المستشارون
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                المجتمع
              </Link>
              <Link
                href="/guide"
                className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
              >
                دليل الاستخدام
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            دليل استخدام منصة استشر
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            تعرف على كيفية استخدام المنصة للحصول على أفضل تجربة استشارية
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 max-w-3xl mx-auto">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUserCircle className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">إنشاء حساب والتسجيل</h2>
                <div className="space-y-4 text-right">
                  <p className="text-gray-700">
                    أول خطوة للاستفادة من منصة استشر هي إنشاء حساب شخصي. اتبع الخطوات التالية:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 pr-4">
                    <li>انقر على زر "تسجيل" في الصفحة الرئيسية</li>
                    <li>أدخل بياناتك الشخصية (الاسم، البريد الإلكتروني، كلمة المرور)</li>
                    <li>يمكنك اختيار التسجيل كمستخدم عادي أو كمستشار</li>
                    <li>إذا كنت ترغب بالتسجيل كمستشار، ستحتاج إلى تقديم وثائق إضافية للتحقق من هويتك ومؤهلاتك</li>
                    <li>بعد إكمال التسجيل، ستتمكن من الوصول إلى لوحة التحكم الخاصة بك</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">نصيحة:</p>
                    <p className="text-blue-700">
                      تأكد من استخدام بريد إلكتروني تستخدمه بانتظام، حيث سنرسل إليه إشعارات مهمة حول جلساتك الاستشارية.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaSearch className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">البحث عن المستشارين</h2>
                <div className="space-y-4 text-right">
                  <p className="text-gray-700">
                    يمكنك البحث عن المستشارين المناسبين لاحتياجاتك بسهولة:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 pr-4">
                    <li>انتقل إلى صفحة "المستشارون" من القائمة الرئيسية</li>
                    <li>استخدم شريط البحث للبحث عن مستشار معين أو تخصص محدد</li>
                    <li>يمكنك تصفية النتائج حسب التخصص، التقييم، السعر، أو اللغة</li>
                    <li>انقر على بطاقة المستشار لعرض ملفه الشخصي الكامل</li>
                    <li>اطلع على تفاصيل المستشار، مؤهلاته، تقييمات المستخدمين السابقين، والتخصصات</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">نصيحة:</p>
                    <p className="text-blue-700">
                      قم بقراءة تقييمات المستخدمين السابقين للحصول على فكرة أفضل عن تجربة الآخرين مع المستشار.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaCalendarAlt className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">حجز جلسة استشارية</h2>
                <div className="space-y-4 text-right">
                  <p className="text-gray-700">
                    بعد اختيار المستشار المناسب، يمكنك حجز جلسة استشارية:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 pr-4">
                    <li>من صفحة المستشار، انقر على زر "حجز جلسة"</li>
                    <li>اختر التاريخ والوقت المناسب من الأوقات المتاحة</li>
                    <li>حدد نوع الجلسة (فيديو، صوت، أو رسائل نصية)</li>
                    <li>أدخل وصفًا موجزًا للموضوع الذي ترغب في مناقشته</li>
                    <li>يمكنك اختيار الجلسة المجهولة إذا كنت لا ترغب في مشاركة هويتك</li>
                    <li>قم بإتمام عملية الدفع</li>
                    <li>ستتلقى تأكيدًا بالبريد الإلكتروني مع تفاصيل الجلسة</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">نصيحة:</p>
                    <p className="text-blue-700">
                      تأكد من الالتزام بموعد الجلسة. إذا كنت بحاجة إلى إلغاء أو إعادة جدولة، يرجى القيام بذلك قبل 24 ساعة على الأقل من الموعد المحدد.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaComments className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">خلال الجلسة الاستشارية</h2>
                <div className="space-y-4 text-right">
                  <p className="text-gray-700">
                    للاستفادة القصوى من جلستك الاستشارية:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 pr-4">
                    <li>انضم إلى الجلسة قبل 5 دقائق من الموعد المحدد</li>
                    <li>تأكد من أن اتصالك بالإنترنت مستقر وأن الكاميرا والميكروفون يعملان بشكل صحيح (للجلسات المرئية والصوتية)</li>
                    <li>حضّر أسئلتك ونقاط النقاش مسبقًا</li>
                    <li>كن صريحًا وواضحًا في وصف مشكلتك أو استفسارك</li>
                    <li>يمكنك تدوين الملاحظات خلال الجلسة</li>
                    <li>يمكنك طلب توصيات أو موارد إضافية من المستشار</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">نصيحة:</p>
                    <p className="text-blue-700">
                      اختر مكانًا هادئًا وخاصًا للجلسة لضمان الخصوصية والتركيز الكامل.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaQuestionCircle className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">الدعم والمساعدة</h2>
                <div className="space-y-4 text-right">
                  <p className="text-gray-700">
                    إذا واجهت أي مشكلة أو كان لديك استفسار:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 pr-4">
                    <li>يمكنك زيارة قسم "الأسئلة الشائعة" للحصول على إجابات للأسئلة المتداولة</li>
                    <li>استخدم خاصية الدردشة المباشرة للتواصل مع فريق الدعم</li>
                    <li>أرسل بريدًا إلكترونيًا إلى support@istashr.com</li>
                    <li>اتصل بنا على الرقم: +966 50 123 4567 خلال ساعات العمل (9 صباحًا - 5 مساءً)</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">ملاحظة مهمة:</p>
                    <p className="text-blue-700">
                      منصة استشر ليست بديلاً عن الرعاية الطبية أو النفسية المتخصصة. في حالات الطوارئ، يرجى الاتصال بخدمات الطوارئ المحلية.
                    </p>
                  </div>
                  <div className="mt-8 text-center">
                    <p className="text-gray-700 mb-4">
                      أنت الآن جاهز لاستخدام منصة استشر! نتمنى لك تجربة استشارية مفيدة ومثمرة.
                    </p>
                    <Link href="/dashboard">
                      <Button size="lg">
                        انتقل إلى لوحة التحكم
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                leftIcon={<FaArrowRight />}
              >
                السابق
              </Button>
              <div className="text-gray-500">
                {currentStep} من {totalSteps}
              </div>
              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNextStep}
                  rightIcon={<FaArrowLeft />}
                >
                  التالي
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button rightIcon={<FaArrowLeft />}>
                    إنهاء
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 