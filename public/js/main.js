//event listeners.
document.addEventListener("DOMContentLoaded", () => {
  if (typeof fin != "undefined") {
    fin.desktop.main(onMain);
  } else {
    ofVersion.innerText =
      "OpenFin is not available - you are probably running in a browser.";
  }
});

//Once the DOM has loaded and the OpenFin API is ready
function onMain() {
  let navigateWindow = new fin.desktop.Window({
    url: "http://localhost:5555/navigate.html",
    name: "navigateWindow: " + Math.random() * 1000000,
    autoShow: true
  });

  // let navigateCrossWindow = new fin.desktop.Window({
  //   url: "https://theverge.com",
  //   name: "navigateCrossWindow: " + Math.random() * 1000000,
  //   autoShow: true
  // });

  let reloadWindow = new fin.desktop.Window({
    url: "http://localhost:5555/reload.html",
    name: "reloadWindow: " + Math.random() * 1000000,
    autoShow: true
  });

  let reloadCrossWindow = new fin.desktop.Window({
    url: "https://openfin.co",
    name: "reloadCrossWindow: " + Math.random() * 1000000,
    autoShow: true
  });

  let XNavUrls = [
    "https://google.com",
    "https://openfin.co",
    "https://yahoo.com",
    "https://msn.com"
  ];

  function openAndClose() {
    setTimeout(()=>{
      let openCloseWindow = new fin.desktop.Window(
        {
          url: "http://localhost:5555/openClose.html",
          name: "openClose",
          autoShow: true,
          defaultWidth: 50,
          defaultHeight: 50,
          defaultLeft: 0,
          defaultTop: 0,
          saveWindowState: false
        },
        () => {
          openCloseWindow.close(openAndClose);
        }
      );
    }, 2500);

  }

  function openAndCloseCross() {
    //open and close cross domain window
    setTimeout(()=>{
      let openCloseCrossWindow = new fin.desktop.Window(
        {
          url: "https://google.com",
          name: "openCloseCross",
          autoShow: true,
          defaultWidth: 50,
          defaultHeight: 50,
          defaultLeft: 55,
          defaultTop: 0,
          saveWindowState: false
        },
        () => {
          openCloseCrossWindow.close(openAndCloseCross);
        }
      );
    }, 2500);
  }


  openAndClose();
  openAndCloseCross();

  setInterval(() => {
    //reload window
    reloadWindow.reload(
      true,
      () => {
        console.log("Reload Window Success");
      },
      () => {
        console.error("Reload Window Error");
      }
    );

    //reload cross window
    reloadCrossWindow.reload(
      true,
      () => {
        console.log("Reload Cross Window Success");
      },
      () => {
        console.error("Reload Cross Window Error");
      }
    );

    //navigate window
    navigateWindow.navigate(
      "http://localhost:5555/navigate.html",
      () => {
        console.log("Navigate Window Success");
      },
      () => {
        console.error("Navigate Window Error");
      }
    );

    // //navigate cross window
    // navigateCrossWindow.navigate(
    //   XNavUrls[Math.floor(Math.random() * XNavUrls.length)],
    //   () => {
    //     console.log("Navigate Cross Window Success");
    //   },
    //   () => {
    //     console.error("Navigate Cross Window Error");
    //   }
    // );
  }, 2500);
}
