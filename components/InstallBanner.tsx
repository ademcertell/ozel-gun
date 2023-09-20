import { useState, useEffect } from "react";

const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeBanner();
    }, 6000); // The notification turns off automatically in "6" seconds. (6000 = 6 seconds)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showBanner && deferredPrompt && (
        <div className="bg-blue-300/10 p-5 fixed bottom-5 justify-end right-2 text-center rounded-xl">
          <div>
            <p className="text-white">
              Uygulamayı yüklemek için{" "}
              <button
                className="text-blue-200 underline underline-offset-2 hover:text-blue-100 transition-all duration-300 ease-in-out "
                onClick={handleInstall}
              >
                buraya tıklayın
              </button>{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallBanner;