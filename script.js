const CONFIG = {
  ANDROID_APK_URL: "https://expo.dev/artifacts/eas/IGl1ZILAUpWHv0JQ3A7as7gN-4eBebhcAUYXzH4e9DU.apk",
  APP_STORE_URL: "" 
};

const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

function say(message) {
  document.querySelectorAll(".dl-status").forEach((el) => { el.textContent = message; });
}

document.querySelectorAll('[data-store="android"]').forEach((btn) => {
  if (!CONFIG.ANDROID_APK_URL) {
    btn.classList.add("disabled");
    btn.setAttribute("aria-disabled", "true");
    return;
  }
  btn.href = CONFIG.ANDROID_APK_URL;
  btn.setAttribute("download", "application-rtc.apk");
  btn.addEventListener("click", (e) => {
    if (isIOS) {
      e.preventDefault();
      say("Cette version est pour Android. La version iPhone sera bientôt disponible.");
      return;
    }
    say("Le téléchargement est lancé. Si rien ne démarre, vérifiez votre dossier Téléchargements ou réessayez.");
  });
});


document.querySelectorAll('[data-store="ios"]').forEach((btn) => {
  if (!CONFIG.APP_STORE_URL) return;
  btn.href = CONFIG.APP_STORE_URL;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.classList.remove("disabled");
  btn.removeAttribute("aria-disabled");
  btn.removeAttribute("tabindex");
  const label = btn.querySelector("small");
  if (label) label.textContent = "Disponible sur l’App Store";
});

document.querySelectorAll(".app-preview img").forEach((img) => {
  img.addEventListener("error", () => img.remove());
});