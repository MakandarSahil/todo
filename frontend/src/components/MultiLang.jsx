import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const MultiLang = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { name: "English", code: "en" },
    { name: "French", code: "fr" },
    { name: "Hindi", code: "hi" },
  ];


  const greeting = t('greeting', {
    channel : "XYZ"
  }); // interpolation
  const line1 = t('description.line1');
  const line2 = t('description.line2');

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // this is for changing the direction of the text 
  useEffect(() => {
    console.log(i18n.dir())
    document.body.dir = i18n.dir(); 
  }, [i18n, i18n.language])

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("language", languageCode);
  };

  if (!i18n.isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen bg-zinc-700 text-white font-bold text-2xl">
      <div className="btn-container flex gap-10">
        {languages.map((lng) => (
          <button
            className={`text-sm font-normal border-2 rounded-md p-4 hover:bg-zinc-800 ${
              i18n.language === lng.code ? "bg-blue-600" : "bg-transparent"
            }`}
            key={lng.name}
            onClick={() => changeLanguage(lng.code)}
          >
            {lng.name}
          </button>
        ))}
      </div>

      {/* Render description lines */}
      <div className="description mt-5 text-lg">
        <h1 className="text-2xl font-bold text-center">{greeting}</h1>
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
    </div>
  );
};

export default MultiLang;
